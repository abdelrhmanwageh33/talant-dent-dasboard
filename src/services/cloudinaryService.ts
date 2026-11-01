/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * 
 * Requirements in .env:
 * VITE_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
 * VITE_CLOUDINARY_UPLOAD_PRESET=<your_unsigned_upload_preset>
 */

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Missing Cloudinary configuration. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error?.message || `Cloudinary upload failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data.secure_url;
}
