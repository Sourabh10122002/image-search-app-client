const API = (import.meta.env.VITE_API_BASE as string) || "http://localhost:4000";

export default function Login() {
    const oauth = (provider: "google" | "github" | "facebook") => {
        window.location.href = `${API}/auth/${provider}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Login with OAuth
                </h2>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => oauth("google")}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                    >
                        Sign in with Google
                    </button>

                    <button
                        onClick={() => oauth("github")}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition"
                    >
                        Sign in with GitHub
                    </button>

                    <button
                        onClick={() => oauth("facebook")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                        Sign in with Facebook
                    </button>
                    <p className="text-sm text-gray-600 mt-4">
                        By signing in, you agree to our{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                    <strong className="text-red-500">
                    login with GitHub (Preffered)
                    </strong>
                </div>
            </div>
                <p className="text-sm text-gray-600 mt-4">
                Google sign in is disabled for now due to <strong>paid</strong> api key and facebook does not want me to create developer account due to new device error.
                </p>
        </div>
    );
}