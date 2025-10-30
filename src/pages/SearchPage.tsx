import { useState, type FormEvent } from "react";
import TopSearches from "../components/TopSearches";
import ImageGrid from "../components/ImageGrid";
import HistorySidebar from "../components/HistorySidebar";

const API = import.meta.env.VITE_API_BASE as string;

export interface ImageItem {
    id: string;
    small: string;
    alt?: string;
}

export default function SearchPage() {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState<ImageItem[]>([]);
    const [total, setTotal] = useState(0);
    console.log(results.map<ImageItem>((img) => ({
        id: img.id,
        small: img.small,
        alt: img.alt,
    })));

    const doSearch = async (e?: FormEvent) => {
        e?.preventDefault();
        if (!term.trim()) return;

        try {
            const res = await fetch(`${API}/api/search`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ term }),
            });

            if (!res.ok) {
                alert("Search failed (are you logged in?)");
                return;
            }

            const data = await res.json();
            setResults(data.results as ImageItem[]);
            setTotal(data.total);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="flex gap-5 p-5 bg-gray-50 min-h-screen">
            <div className="flex-1">
                <TopSearches />

                <form onSubmit={doSearch} className="my-4 flex items-center gap-2">
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Search images..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                        Search
                    </button>
                </form>

                {term && (
                    <div className="mb-4 text-gray-700">
                        You searched for{" "}
                        <strong className="font-semibold text-gray-900">{term}</strong> —{" "}
                        {total} results.
                    </div>
                )}

                <ImageGrid images={results} />
            </div>

            <aside className="w-80">
                <HistorySidebar />
            </aside>
        </div>
    );
}