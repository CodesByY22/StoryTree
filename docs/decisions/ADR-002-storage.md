# ADR 002: Storage Provider

## Decision
We will use **Cloudinary** for image storage and transformation.

## Context
StoryTree requires image storage for user avatars and potentially story covers. The original documentation mentioned both Cloudflare R2 and Cloudinary.

## Reasoning
1. **On-the-fly Transformation:** Cloudinary provides URL-based image transformations (resizing, cropping, format conversion to WebP/AVIF). This is critical for optimizing images on a content-heavy platform without needing to build our own image processing pipeline.
2. **CDN Delivery:** Cloudinary acts as a global CDN, ensuring fast delivery.
3. **Simplicity:** It's easier to implement than setting up raw object storage (like R2) + an image resizing worker.

## Alternatives Considered
- **Cloudflare R2:** While cheaper for raw storage, it lacks built-in image transformation out-of-the-box, which would require us to build and maintain a Cloudflare Worker for image resizing.
- **AWS S3:** Too complex and expensive for our current startup needs.
