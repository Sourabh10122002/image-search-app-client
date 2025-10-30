import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
    const nav = useNavigate();
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/auth/status`, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    nav('/', { replace: true });
                } else {
                    nav('/login', { replace: true });
                }
            })
            .catch(() => nav('/login', { replace: true }));
    }, [nav]);
    return <div>Signing you in…</div>;
}