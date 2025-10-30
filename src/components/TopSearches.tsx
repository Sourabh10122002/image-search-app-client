import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE as string;

interface TopSearch {
    term: string;
    count: number;
}

export default function TopSearches() {
    const [top, setTop] = useState<TopSearch[]>([]);

    useEffect(() => {
        fetch(`${API}/api/top-searches`)
            .then((res) => res.json())
            .then((data) => setTop(data))
            .catch((err) => console.error("Error fetching top searches:", err));
    }, []);

    return (
        <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
            <strong className="text-gray-800">Top searches:</strong>

            <div className="flex flex-wrap gap-2 mt-3">
                {top.length > 0 ? (
                    top.map((t) => (
                        <span
                            key={t.term}
                            className="px-3 py-1 bg-white rounded-md shadow text-sm text-gray-700 border border-gray-200"
                        >
                            {t.term} <span className="text-gray-500">({t.count})</span>
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500 text-sm">No searches yet</span>
                )}
            </div>
        </div>
    );
}