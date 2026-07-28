import {
  useDeleteFileMutation,
  useGetFilesQuery,
  useUploadFileMutation,
} from "@/entities/uploader/api/uploaderApi";
import { ImagePlus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import { Uploader } from "@/entities/uploader/modal/types";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/button/Button";

interface Props {
  onSelect?: (value: string) => void;
}
const ImageUploader = ({ onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<Uploader | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();

  const {
    data,
    isLoading: isFilesLoading,
    refetch,
  } = useGetFilesQuery(undefined, {
    skip: !open,
  });

  const handleOpen = () => {
    if (!isLoading) {
      setOpen((prev) => !prev);

      if (!open) {
        setFile(null);
        setSelectedImage(null);
      }
    }
  };
  const handleSelect = () => {
    if (!selectedImage) {
      toast.error("Please select an image.");
      return;
    }

    onSelect?.(selectedImage.file_url);

    setOpen(false);
    setSelectedImage(null);
    setFile(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    setSelectedImage(null);
    setFile(acceptedFiles[0]);
  }, []);
  const handleDeleteUploadedImage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image.");
      return;
    }

    try {
      await deleteFile(selectedImage._id).unwrap();

      toast.success("Image deleted successfully.");

      setSelectedImage(null);

      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed.");
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const preview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleDelete = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_name", file.name);

      await uploadFile(formData).unwrap();

      toast.success("Image uploaded successfully.");

      await refetch();

      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Upload failed.");
    }
  };

  const footer = (
    <div className="flex w-full justify-between gap-2">
      <div>
        <Button
          size="md"
          variant="danger"
          disabled={(!file && !selectedImage) || isDeleting}
          onClick={() => {
            if (file) {
              setFile(null);
            } else {
              handleDeleteUploadedImage();
            }
          }}
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          size="md"
          disabled={!file && !selectedImage}
          onClick={handleSelect}
        >
          Select
        </Button>
        <Button size="md" disabled={!file || isLoading} onClick={handleUpload}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleOpen}
      title="Media Library"
      buttonText="Upload Image"
      buttonSize="md"
      footer={footer}
      size="xl"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />

          {!file ? (
            <div className="flex h-64 flex-col items-center justify-center p-8 text-center">
              <ImagePlus
                size={60}
                className={`mb-4 ${
                  isDragActive ? "text-blue-600" : "text-gray-400"
                }`}
              />

              <h3 className="text-lg font-semibold">
                {isDragActive
                  ? "Drop your image here"
                  : "Drag & Drop your image"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                অথবা click করে image নির্বাচন করুন
              </p>

              <p className="mt-4 text-xs text-gray-400">JPG, PNG, WEBP, GIF</p>
            </div>
          ) : (
            <div className="p-4">
              <img
                src={preview}
                alt="Preview"
                className="h-72 w-full rounded-lg border object-cover"
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="truncate font-medium">{file.name}</p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <Button size="sm" variant="danger" onClick={handleDelete}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Images */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Uploaded Images</h3>

            <span className="text-sm text-gray-500">
              {data?.data?.length ?? 0} Images
            </span>
          </div>

          {isFilesLoading ? (
            <div className="py-10 text-center">Loading...</div>
          ) : data?.data?.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(117px,1fr))] gap-3 max-h-72 overflow-y-auto">
              {data.data.map((image) => (
                <div
                  key={image._id}
                  onClick={() => {
                    setSelectedImage(image);
                    setFile(null);
                  }}
                  className={`cursor-pointer overflow-hidden rounded-lg border-2 transition

                  ${
                    selectedImage?._id === image._id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <img
                    src={image.file_url}
                    alt={image.file_name}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed py-10 text-center text-gray-500">
              No uploaded images found.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploader;
