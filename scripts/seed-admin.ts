/**
 * Seeds exactly one Super Admin account, per Phase 1's build task:
 * "Seed script creating exactly one Super Admin account."
 *
 * Usage:
 *   DATABASE_URL=... SEED_ADMIN_EMAIL=admin@ideact.com SEED_ADMIN_PASSWORD='Str0ng!Pass' \
 *     npx tsx scripts/seed-admin.ts
 *
 * Safe to re-run: if a Super Admin already exists, it exits without
 * creating a duplicate rather than silently adding a second one, matching
 * the spec's "no public self-registration" / controlled-access model.
 */
import mongoose from "mongoose";
import { hash } from "bcryptjs";
import User from "../src/models/User";

async function main() {
  const uri = process.env.DATABASE_URL;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const fullName = process.env.SEED_ADMIN_NAME || "Super Admin";

  if (!uri) throw new Error("DATABASE_URL is required.");
  if (!email || !password) {
    throw new Error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required.");
  }

  const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  if (!passwordPolicy.test(password)) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be 8+ characters with uppercase, lowercase, a number, and a special character."
    );
  }

  await mongoose.connect(uri);

  const existingSuperAdmin = await User.findOne({ role: "Super Admin", isDeleted: { $ne: true } });
  if (existingSuperAdmin) {
    console.log(`A Super Admin already exists (${existingSuperAdmin.email}). Nothing to do.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await hash(password, 12);

  await User.create({
    fullName,
    email,
    password: passwordHash,
    role: "Super Admin",
    accountStatus: "Active",
  });

  console.log(`Super Admin created: ${email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
