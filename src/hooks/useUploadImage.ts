import { useState } from 'react';

import { AxiosError } from 'axios';

import api from '@/api/axiosInstance';

interface UploadResponse {
  secure_url: string;
  publicId: string;
}

interface UploadErrorResponse {
  message?: string;
}

const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = async (file: File, type: 'vehicle' | 'post' = 'post'): Promise<string | null> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await api.post<UploadResponse>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: event => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(percent);
          }
        },
      });

      setImageUrl(response.data.secure_url);

      return response.data.secure_url;
    } catch (err) {
      const axiosError = err as AxiosError<UploadErrorResponse>;
      const message = axiosError.response?.data?.message || axiosError.message || 'Upload failed';
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, uploadProgress, error, imageUrl };
};

export default useUploadImage;
