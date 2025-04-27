import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploaderProps {
  onFileSelect: (file: File, previewUrl: string) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    //aspect: 1
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewSrc(url);
      setFileName(file.name);
      // We'll delay calling onFileSelect until after cropping
      setIsCropping(true);
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

  const cancelCrop = () => {
    setIsCropping(false);
    setPreviewSrc(null);
    setFileName(null);
    setOriginalFile(null);
  };

  const generateCroppedImage = async () => {
    if (!imgRef.current || !completedCrop || !canvasRef.current || !originalFile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to crop size
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imgRef.current,
      completedCrop.x,
      completedCrop.y,
      completedCrop.width,
      completedCrop.height,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, originalFile.type);
    });

    // Create a new file from the blob
    const croppedFile = new File([blob], originalFile.name, {
      type: originalFile.type,
      lastModified: Date.now(),
    });

    // Create URL for preview
    const croppedUrl = URL.createObjectURL(blob);
    
    // Call the onFileSelect with the cropped file
    onFileSelect(croppedFile, croppedUrl);
    
    // Update UI state
    setPreviewSrc(croppedUrl);
    setIsCropping(false);
  };

  if (isCropping && previewSrc) {
    return (
      <div className="w-full">
        <h6 className="text-center mb-4">Drag to create a square crop</h6>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          circularCrop={false}
        >
          <img
            ref={imgRef}
            src={previewSrc}
            alt="Crop me"
            style={{ maxHeight: '400px' }}
          />
        </ReactCrop>
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex gap-4 justify-center mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full"
            onClick={cancelCrop}
          >
            Cancel
          </button>
          <button
            className="bg-[#6134eb] hover:bg-blue-700 text-white px-4 py-2 rounded-full"
            onClick={generateCroppedImage}
          >
            Apply Crop
          </button>
        </div>
      </div>
    );
  }

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

        <button
          className="bg-[#6134eb] text-white px-4 py-2 rounded-full hover:bg-blue-700"
          onClick={triggerFileInput}
        >
          Upload Image
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {fileName && !isCropping && (
          <p className="mt-4 text-sm text-gray-800">
            Selected file: <strong>{fileName}</strong>
          </p>
        )}

        {previewSrc && !isCropping && (
          <div className="mt-4">
            <img
              src={previewSrc}
              alt="Preview"
              className="max-w-full max-h-60 rounded-lg object-contain shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
}