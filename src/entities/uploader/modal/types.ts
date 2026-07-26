export type FileType =
  | "image"
  | "pdf"
  | "video"
  | "excel"
  | "csv"
  | "doc"
  | "docx"
  | "zip"
  | "other";

export interface Uploader {
  _id: string;
  file_type: FileType;
  uploaded_by?: string;
  user?: string;
  file_url: string;
  file_path?: string;
  uploadedAt: string;
  file_size: number;
  file_name: string;
  upload_name: string;
  file_extension: string;
  createdAt?: string;
  updatedAt?: string;
}
