// test-db.js
import pkg from "pg";
const { Client } = pkg;

const connectionString =
  "postgresql://postgres:****@db.jqkzfmqzdtjmjecgspud.supabase.co:5432/postgres?sslmode=require";

const client = new Client({
  connectionString,
});

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected to database!");
    const res = await client.query("SELECT NOW()");
    console.log("Server time:", res.rows[0]);
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await client.end();
  }
}

testConnection();
