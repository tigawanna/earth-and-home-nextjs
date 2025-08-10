# Image Upload Setup Guide

## ✅ Completed Setup

### 1. Better Upload Integration
- ✅ Upload API route created at `/src/app/api/upload/route.ts`
- ✅ ImagesUploadSection component created
- ✅ Integrated into PropertyForm
- ✅ Form schema updated to include images array

### 2. Features Implemented
- ✅ Drag & drop image upload with progress
- ✅ Multiple file uploads (up to 10 images, 5MB each)
- ✅ Image preview gallery
- ✅ Featured image selection (star icon)
- ✅ Image reordering (move up/down)
- ✅ Image deletion
- ✅ Responsive grid layout
- ✅ Upload progress tracking

## 🔧 Configuration Required

### 1. Update Bucket Name
Edit `/src/app/api/upload/route.ts` and replace `'earth-and-home'` with your actual R2 bucket name:

```typescript
const router: Router = {
  client: s3Client,
  bucketName: 'your-actual-bucket-name', // Update this
  routes: {
    // ...
  }
};
```

### 2. Update Public URL
Edit `/src/components/property/form/sections/ImagesUploadSection.tsx` and update the URL construction:

```typescript
url: `https://your-bucket.r2.cloudflarestorage.com/${p.objectKey}`
```

Or better, add this to your environment variables:
- Add `NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket.r2.cloudflarestorage.com` to `.env`
- Update the code to use `process.env.NEXT_PUBLIC_R2_PUBLIC_URL`

### 3. R2 CORS Configuration
Make sure your R2 bucket has CORS configured to allow uploads from your domain:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }
]
```

## 🎯 How to Use

1. **Navigate to Property Form**: Go to `/property/add` (or wherever your property form is)
2. **Upload Images**: 
   - Drag and drop images or click to select
   - Up to 10 images, 5MB each
   - Supports JPEG, PNG, WebP, GIF
3. **Manage Images**:
   - Click star to set featured image
   - Use eye icon to preview
   - Use arrows to reorder
   - Use trash icon to delete
4. **Form Integration**: Images are automatically added to the form data as an array

## 🗂️ Form Data Structure

The images are stored in the form as:

```typescript
images: [
  {
    url: "https://bucket.r2.cloudflarestorage.com/path/to/image.jpg",
    key: "properties/temp/123456_image.jpg",
    name: "image.jpg",
    size: 1234567,
    type: "image/jpeg"
  }
  // ... more images
]
```

## 🚀 Next Steps

1. Update bucket name and URLs as mentioned above
2. Test the upload functionality
3. Consider adding:
   - Image compression before upload
   - Alt text for accessibility
   - Image metadata (camera settings, etc.)
   - Bulk delete functionality
   - Image cropping/editing tools

## 🛠️ File Structure

```
src/
├── app/api/upload/
│   └── route.ts                    # Upload API endpoint
├── components/property/form/
│   ├── PropertyForm.tsx           # Main form (updated)
│   ├── property-form-schema.ts    # Schema (updated)
│   └── sections/
│       └── ImagesUploadSection.tsx # New images section
└── components/ui/
    └── upload-dropzone-progress.tsx # Pre-installed component
```
