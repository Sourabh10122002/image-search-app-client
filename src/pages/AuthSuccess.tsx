import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
    const nav = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/status`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Network response not ok");

                const data = await res.json();

                if (data?.user) {
                    nav("/", { replace: true });
                } else {
                    nav("/login", { replace: true });
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                nav("/login", { replace: true });
            }
        };

        checkAuth();
    }, [nav]);

    return <div>Signing you in…</div>;
}