import { uploaderAPI } from '../config/apiService';

export const api ={
      // Image Uploader
  uploader: (body) => {
    return uploaderAPI.post("/dt5fjvwg6/image/upload", body);
  },
}