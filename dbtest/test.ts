// test.ts
// Verifies a MongoDB Atlas connection using a demo schema.
//
// Usage:
//   1. npm install mongoose dotenv
//   2. Make sure MONGODB_URI is set in .env.local (or .env)
//   3. npx tsx test.ts

import dns from 'dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Force Node's internal DNS resolver to use Google/Cloudflare DNS.
// Node uses its own resolver (c-ares) which sometimes ignores Windows'
// adapter-level DNS settings — this makes sure SRV lookups actually work.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Load env vars — tries .env.local first (Next.js convention), falls back to .env
dotenv.config({ path: '.env.local' });
dotenv.config(); // won't override already-loaded vars

// Standard (non-SRV) connection string — avoids the DNS SRV lookup entirely,
// so it works even when SRV resolution is blocked/broken on the network.
const MONGODB_URI: string =
  process.env.MONGODB_URI ||
  'mongodb://pharmacy:pharmacy@ac-2b7wzhj-shard-00-00.cqpfr4j.mongodb.net:27017,ac-2b7wzhj-shard-00-01.cqpfr4j.mongodb.net:27017,ac-2b7wzhj-shard-00-02.cqpfr4j.mongodb.net:27017/pharmacy?ssl=true&replicaSet=atlas-13u7ep-shard-0&authSource=admin&appName=Cluster0';

if (!process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not found in .env.local or .env — using fallback string.\n');
}

// ---- Demo schema ----
interface IProduct {
  name: string;
  genericName?: string;
  price: number;
  stock: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    genericName: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

async function main() {
  console.log('Connecting to MongoDB Atlas...');
  console.log('   URI host:', MONGODB_URI.split('@')[1]?.split('/')[0] || '(could not parse)');

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // fail fast instead of hanging
    });

    console.log('✅ Connected successfully!');
    console.log('   Host:', mongoose.connection.host);
    console.log('   Database:', mongoose.connection.name);

    // Insert a demo document
    const testDoc = await Product.create({
      name: 'Paracetamol 500mg',
      genericName: 'Paracetamol',
      price: 2.5,
      stock: 100,
      category: 'Pain Relief',
    });
    console.log('✅ Test document inserted:', testDoc._id.toString());

    // Read it back
    const found = await Product.findById(testDoc._id);
    console.log('✅ Test document read back:', found?.name);

    // Clean up so this script doesn't leave junk data behind
    await Product.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');

    console.log('\n🎉 Connection string is WORKING (read + write confirmed).');
  } catch (err) {
    const error = err as Error;
    console.error('\n❌ Connection FAILED.');
    console.error('   Reason:', error.message);

    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error('   → Username or password is likely wrong.');
    } else if (error.message.includes('querySrv') || error.message.includes('ECONNREFUSED')) {
      console.error('   → DNS SRV lookup failed. This is usually a local DNS issue on Windows.');
      console.error('     Try switching your DNS to 8.8.8.8 / 1.1.1.1, or run:');
      console.error('     nslookup -type=SRV _mongodb._tcp.cluster0.cqpfr4j.mongodb.net');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('   → Cluster hostname not found — double-check the host in the URI.');
    } else if (
      error.message.includes('IP') ||
      error.message.includes('whitelist') ||
      error.message.includes('timed out')
    ) {
      console.error('   → This machine\'s IP is probably not whitelisted in Atlas Network Access,');
      console.error('     or the cluster is paused.');
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();