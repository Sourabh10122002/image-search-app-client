import { useState, useEffect } from "react";

interface ImageItem {
    id: string;
    small: string;
    alt?: string;
}

interface ImageGridProps {
    images?: ImageItem[];
}

export default function ImageGrid({ images = [] }: ImageGridProps) {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    console.log(images);

    useEffect(() => {
        setSelected(new Set());
    }, [images]);

    const toggle = (id: string) => {
        const s = new Set(selected);
        if (s.has(id)) s.delete(id);
        else s.add(id);
        setSelected(s);
    };

    return (
        <div>
            <div className="my-2 text-gray-700">
                Selected: <span className="font-semibold">{selected.size}</span> images
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="relative overflow-hidden rounded-lg shadow hover:shadow-md transition"
                    >
                        <img
                            src={img.small}
                            alt={img.alt || ""}
                            className="w-full h-52 object-cover"
                        />
                        <label className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-md text-sm font-medium text-gray-800">
                            <input
                                type="checkbox"
                                checked={selected.has(img.id)}
                                onChange={() => toggle(img.id)}
                                className="mr-1 accent-blue-600"
                            />
                            Select
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}