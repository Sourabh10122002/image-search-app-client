import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE as string;

interface HistoryItem {
    term: string;
    timestamp: string;
}

export default function HistorySidebar() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        fetch(`${API}/api/history`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((err) => console.error("Error fetching history:", err));
    }, []);

    return (
        <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Your search history
            </h4>

            {history.length === 0 ? (
                <p className="text-sm text-gray-500">No history yet.</p>
            ) : (
                <ul className="space-y-3">
                    {history.map((h, idx) => (
                        <li
                            key={idx}
                            className="border-b last:border-0 border-gray-100 pb-2"
                        >
                            <div className="font-medium text-gray-800">{h.term}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(h.timestamp).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}