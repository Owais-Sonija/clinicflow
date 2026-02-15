// client/src/pages/public/NotFoundPage.tsx
// 404 Not Found page for invalid routes

import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                Page Not Found
            </h2>
            <p className="mt-2 text-gray-500">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                Go Home
            </Link>
        </div>
    );
}

export default NotFoundPage;