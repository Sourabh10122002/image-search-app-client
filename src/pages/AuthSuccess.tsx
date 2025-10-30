import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
    const nav = useNavigate();
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/auth/status`, { credentials: 'include' })
            .then(() => nav('/', { replace: true }))
            .catch(() => nav('/login'));
    }, [nav]);
    return <div>Signing you in…</div>;
}