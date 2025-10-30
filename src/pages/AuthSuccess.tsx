import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
    const nav = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                console.log('Checking auth status...');
                const response = await fetch(`${import.meta.env.VITE_API_BASE}/auth/status`, { 
                    credentials: 'include' 
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('Auth status response:', data);
                
                if (data.ok) {
                    console.log('Authentication successful, redirecting to home');
                    nav('/', { replace: true });
                } else {
                    console.log('Authentication failed, redirecting to login');
                    nav('/login', { replace: true });
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setTimeout(() => nav('/login', { replace: true }), 3000);
            }
        };

        checkAuthStatus();
    }, [nav]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="text-lg font-semibold text-red-600 mb-2">
                        Authentication Error
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                        {error}
                    </div>
                    <div className="text-sm text-gray-500">
                        Redirecting to login in a few seconds...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-lg font-semibold text-gray-700 animate-pulse">
                Signing you in…
            </div>
        </div>
    );
}