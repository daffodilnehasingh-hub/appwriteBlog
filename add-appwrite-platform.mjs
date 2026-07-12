/**
 * Run this script to add Vercel domains as allowed platforms in Appwrite.
 * 
 * Usage:
 *   1. Generate an Appwrite API Key:
 *      → cloud.appwrite.io → Project: jerryblog → Settings → API Keys
 *      → Create Key with scope: "projects.write"
 * 
 *   2. Run: node add-appwrite-platform.mjs YOUR_API_KEY_HERE
 */

import { Client, Projects } from 'node-appwrite';

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error('❌ Missing API key. Usage: node add-appwrite-platform.mjs YOUR_API_KEY');
  process.exit(1);
}

const PROJECT_ID = '6a4e8d290015c3fcaa68';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Management API endpoint
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const projects = new Projects(client);

const platforms = [
  { type: 'web', name: 'Vercel Production', hostname: 'react-mega-project-lime.vercel.app' },
  { type: 'web', name: 'Vercel Old',        hostname: 'appwrite-blog-5e3a.vercel.app' },
  { type: 'web', name: 'Localhost Dev',     hostname: 'localhost' },
];

console.log('🚀 Adding platforms to Appwrite project...\n');

for (const platform of platforms) {
  try {
    const result = await projects.createPlatform(
      PROJECT_ID,
      platform.type,
      platform.name,
      platform.hostname
    );
    console.log(`✅ Added: ${platform.name} (${platform.hostname})`);
  } catch (err) {
    if (err?.message?.includes('already exists') || err?.code === 409) {
      console.log(`⚠️  Already exists: ${platform.name} (${platform.hostname})`);
    } else {
      console.error(`❌ Failed: ${platform.name} → ${err.message}`);
    }
  }
}

console.log('\n🎉 Done! Refresh your Vercel app — the CORS error should be fixed.');
