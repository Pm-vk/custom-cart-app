"use client";
import { Product } from "@/app/_components/PopularProducts";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, ImageOff, ImageUpscale, Crop, GalleryHorizontalEnd, Trash2 } from "lucide-react";
import { Canvas, FabricImage } from "fabric";

type Props = {
  product: Product;
  setDesignUrl:any
};

const AITransformOptions = [
  {
    name: "BG Remove",
    icon: ImageOff,
    imageKitTr: "e-bgremove",
  },
  {
    name: "Upscale",
    icon: ImageUpscale,
    imageKitTr: "e-upscale",
  },
  {
    name: "Smart Crop",
    icon: Crop,
    imageKitTr: "fo-auto",
  },
  {
    name: "Shadow",
    icon: GalleryHorizontalEnd,
    imageKitTr: "e-shadow",
  },
];

function ProductCustomizeStudio({ product,setDesignUrl }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasInstance, setCanvasInstance] = useState<Canvas | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadedImgRef = useRef<any>(null);
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [activeTransformations, setActiveTransformations] = useState<string[]>([]);
  const currentImgUrlRef = useRef<string | null>(null);

  const getCanvasSize = () => {
    if (typeof window === "undefined") return { width: 300, height: 300 };
    if (window.innerWidth < 640) return { width: 200, height: 200 };
    if (window.innerWidth < 1024) return { width: 250, height: 250 };
    return { width: 300, height: 300 };
  };

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const size = getCanvasSize();
      const initCanvas = new Canvas(canvasRef.current, {
        width: size.width,
        height: size.height,
        backgroundColor: "transparent",
        selection: true,
        preserveObjectStacking: true,
      });
      setCanvasInstance(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  // Handle resize
  useEffect(() => {
    if (!canvasInstance) return;

    const handleResize = () => {
      const size = getCanvasSize();
      canvasInstance.setWidth(size.width);
      canvasInstance.setHeight(size.height);
      canvasInstance.renderAll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasInstance]);

  // Update image when transformations change
  useEffect(() => {
    const updateImage = async () => {
      if (!canvasInstance || !uploadedImgRef.current || !baseImageUrl) return;

      const transformationStr =
        activeTransformations.length > 0 ? `?tr=${activeTransformations.join(",")}` : "";
      const newUrl = `${baseImageUrl}${transformationStr}`;

      if (currentImgUrlRef.current === newUrl) return;

      try {
        const img = uploadedImgRef.current as FabricImage;
        await img.setSrc(newUrl);
        canvasInstance.renderAll();
        currentImgUrlRef.current = newUrl;
        setDesignUrl(newUrl); // Update design URL with transformed image
      } catch (err) {
        console.error("Transformation failed, reverting to base image:", err);
        setActiveTransformations([]); // reset transformations
        try {
          const img = uploadedImgRef.current as FabricImage;
          await img.setSrc(baseImageUrl);
          canvasInstance.renderAll();
          currentImgUrlRef.current = baseImageUrl;
        } catch (innerErr) {
          console.error("Failed to revert to base image:", innerErr);
        }
      }
    };

    updateImage();
  }, [activeTransformations, baseImageUrl, canvasInstance]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvasInstance) return;

    setIsUploading(true);
    try {
      if (uploadedImgRef.current) {
        canvasInstance.remove(uploadedImgRef.current);
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      setBaseImageUrl(url);
      currentImgUrlRef.current = url;
      setActiveTransformations([]);
      setDesignUrl(url); // Set the design URL when image is uploaded

      const img = await FabricImage.fromURL(url);
      const scale = Math.min(
        (canvasInstance.width! / img.width!) * 0.5,
        (canvasInstance.height! / img.height!) * 0.5
      );

      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: "center",
        originY: "center",
        left: canvasInstance.width! / 2,
        top: canvasInstance.height! / 2,
        hasControls: true,
        hasBorders: true,
        selectable: true,
        lockRotation: false,
      });

      uploadedImgRef.current = img;
      canvasInstance.add(img);
      canvasInstance.setActiveObject(img);
      canvasInstance.renderAll();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (!canvasInstance || !uploadedImgRef.current) return;
    canvasInstance.remove(uploadedImgRef.current);
    uploadedImgRef.current = null;
    setBaseImageUrl(null);
    setActiveTransformations([]);
    currentImgUrlRef.current = null;
    setDesignUrl(undefined); // Clear design URL when image is removed
    canvasInstance.renderAll();
  };

  const toggleTransformation = (transformation: string) => {
    setActiveTransformations((prev) =>
      prev.includes(transformation)
        ? prev.filter((t) => t !== transformation)
        : [...prev, transformation]
    );
  };

  const isTransformationActive = (transformation: string) => {
    return activeTransformations.includes(transformation);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-4xl mx-auto">
      {/* Product Preview */}
      <div className="relative w-full aspect-square max-w-[400px] mb-6">
        <Image
          src={product?.productimage?.[0]?.url}
          alt={product.title}
          fill
          className="object-contain"
          priority
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
        />

        {isUploading && (
          <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-md">
        <label className="flex flex-col items-center p-3 gap-2 border rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
          <Upload className="w-5 h-5" />
          <span className="text-sm font-medium">Upload</span>
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </label>

        {baseImageUrl && (
          <button
            onClick={handleRemoveImage}
            className="flex flex-col items-center p-3 gap-2 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-medium">Remove</span>
          </button>
        )}

        {AITransformOptions.map((item, index) => (
          <button
            onClick={() => toggleTransformation(item.imageKitTr)}
            className={`flex flex-col items-center p-3 gap-2 border rounded-lg transition-colors ${
              isTransformationActive(item.imageKitTr)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            key={index}
            disabled={!baseImageUrl}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductCustomizeStudio;
