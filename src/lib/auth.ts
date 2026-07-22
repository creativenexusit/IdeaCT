import { betterAuth } from "better-auth";

/**
 * Better Auth configuration (Phase 1).
 *
 * NOTE: this requires a live MongoDB connection (DATABASE_URL) and an
 * AUTH_SECRET at runtime, and Better Auth's Mongo adapter to be wired to the
 * same connection used in lib/db.ts. It is left with a MongoDB URL adapter
 * placeholder here since instantiating it eagerly requires a reachable
 * database, which this sandbox does not have. Wire the adapter's `client`
 * option to your MongoDB driver client before deploying.
 */
export const auth = betterAuth({
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day of activity
  },
  // database: mongodbAdapter(mongoClient) — connect once a live Mongo client
  // is available; see README "Not yet wired" section.
});
