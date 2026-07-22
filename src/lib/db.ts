import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  // Do not throw at import time in build environments without a DB configured yet.
  // The connectDB() call below will throw a clear error when actually invoked.
  console.warn("[db] DATABASE_URL is not set. Set it in your environment before running the app.");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailureAt: number | null;
  lastFailureError: Error | null;
};

// Reuse the connection across hot reloads / serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache =
  global._mongooseCache ?? { conn: null, promise: null, lastFailureAt: null, lastFailureError: null };
global._mongooseCache = cache;

// If MongoDB is unreachable (e.g. Atlas IP allow-list, network outage),
// don't make every single request/page pay the full connection timeout
// again — that compounds badly across a page with many independent data
// fetches (or a build with 100+ static pages) and makes the whole site
// feel slow even though it's correctly falling back to mock data. Instead,
// short-circuit for this cooldown window and retry fresh afterwards so a
// fixed Atlas allow-list / restarted network is picked up quickly.
const FAILURE_COOLDOWN_MS = 15_000;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!MONGODB_URI) {
    throw new Error("DATABASE_URL is not set. Cannot connect to MongoDB.");
  }

  if (
    cache.lastFailureAt &&
    Date.now() - cache.lastFailureAt < FAILURE_COOLDOWN_MS &&
    cache.lastFailureError
  ) {
    throw cache.lastFailureError;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // Fail fast (default is 30s) so API routes return a clear 503
        // instead of hanging until Nginx/PM2 times out the request.
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 20000,
        // Keep at least one connection warm so the next request doesn't
        // pay the connection-setup cost again.
        maxPoolSize: 10,
        minPoolSize: 1,
      })
      .catch((err) => {
        // Reset the cached promise on failure so the cooldown window above
        // (not a stale rejected promise) governs when the next retry happens.
        cache.promise = null;
        cache.lastFailureAt = Date.now();
        cache.lastFailureError = err instanceof Error ? err : new Error(String(err));
        console.error(
          "[db] MongoDB connection failed. Common causes: (1) the cluster's " +
            "Network Access / IP Access List in Atlas does not include this " +
            "server's public IP, (2) the username/password in DATABASE_URL " +
            "is wrong, (3) the cluster hostname changed. Original error:",
          err?.message || err
        );
        throw err;
      });
  }

  cache.conn = await cache.promise;
  cache.lastFailureAt = null;
  cache.lastFailureError = null;
  return cache.conn;
}

export default connectDB;
