import { useState, useRef } from 'react';
//import { decode } from 'base64-arraybuffer';
import Button from "./Button";

interface ImageUploaderProps {
  onFileSelect: (file: File, previewUrl: string) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewSrc(url);
      setFileName(file.name);
      onFileSelect(file, url);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          flex flex-col justify-center items-center
          border-2 border-dashed rounded-2xl p-8
          transition-colors duration-200
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
      >
        <h6 className="text-center text-gray-600 mb-4">
          Drag & drop your image here, or
        </h6>

        <Button
          text="Upload Image"
          onClick={triggerFileInput}
          fillContainer={false}
        />

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {fileName && (
          <p className="mt-4 text-sm text-gray-800">
            Selected file: <strong>{fileName}</strong>
          </p>
        )}

        {previewSrc && (
          <img
            src={previewSrc}
            alt="Preview"
            className="mt-4 max-w-full max-h-60 rounded-lg object-contain shadow"
          />
        )}
      </div>
    </div>
  );
}
