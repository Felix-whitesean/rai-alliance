'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

class ImageItem {
    image_id: string | undefined;
    path: string | undefined;
    filename: string | undefined;
}

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [copied, setCopied] = useState<boolean>(false);

    async function fetchImages() {
        const res = await fetch('/api/images');
        const data = await res.json();
        setImages(data);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        fetchImages();
    };

    return (
        <div className="px-6 font-inter">
            <div className="bg-background text-foreground p-8 ">
                <div className="bg-[#D9D9D9] rounded-md p-4 flex flex-col gap-8">
                    <h2 className="text-2xl mb-4 ">Upload Image</h2>
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="bg-background p-2 self-start"/>
                    <Button onClick={handleUpload} className="self-start bg-[var(--prim-color)] hover:bg-white border hover:border-[var(--prim-color)] text-white hover:text-[var(--prim-color)] rounded-md py-2 px-6">
                        Upload
                    </Button>
                </div>

                <h3 className="mt-6 text-xl">Uploaded Images</h3>
                <div className="flex flex-row flex-wrap gap-4 ">
                    {images.filter(img => img.image_id).map((img) => (
                        <div key={img.image_id} className="border p-2 rounded shadow flex flex-col gap-4 justify-between bg-[#D9D9D9]">
                            <Image src={img?.path || "/uploads/dogimage.png"} width={300} height={330} alt={img.filename || "File name"} className="object-cover" />
                            <div className="flex flex-col self-start gap-2">
                                <Button
                                    onClick={() => {if (img.image_id) {
                                        navigator.clipboard.writeText(img.image_id.toString());
                                        setCopied(true);
                                    }}}
                                    className={`${copied ? "text-sec-color" : "text-prim-color"} text-xs mt-1 bg-gray-200 shadow px-2 py-1 rounded hover:bg-transparent` }>
                                    { copied ? "Copied !" : "Copy ID" }
                                </Button>
                                <Link  href={"/images/delete/"+img.image_id}  className="text-red-500 mt-8">Delete image</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
