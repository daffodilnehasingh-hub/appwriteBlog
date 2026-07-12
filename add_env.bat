@echo off
echo Adding environment variables to Vercel...

echo https://sgp.cloud.appwrite.io/v1| npx vercel env add VITE_APPWRITE_URL production --force
echo 6a4e8d290015c3fcaa68| npx vercel env add VITE_APPWRITE_PROJECT_ID production --force
echo 6a4e8e2c0014e2d179ef| npx vercel env add VITE_APPWRITE_DATABASE_ID production --force
echo 6a4e8f6a001c379e8306| npx vercel env add VITE_APPWRITE_COLLECTION_ID production --force
echo 6a4e91bd003c7f0b99de| npx vercel env add VITE_APPWRITE_BUCKET_ID production --force
echo jerryblog| npx vercel env add VITE_APPWRITE_PROJECT_NAME production --force
echo https://sgp.cloud.appwrite.io/v1| npx vercel env add VITE_APPWRITE_ENDPOINT production --force

echo All environment variables added!
