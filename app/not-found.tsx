import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4 text-center">
            <div className="text-9xl mb-4 animate-bounce">🍽️</div>
            <h1 className="text-4xl md:text-6xl font-black text-orange-600 mb-4">Oops! Empty Plate</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
                Looks like this page was too delicious and got finished! Or maybe it never existed.
            </p>
            <div className="flex gap-4">
                <Link href="/" className="btn btn-primary btn-glow px-8 py-3 rounded-full text-lg font-bold">
                    Go Home 🏠
                </Link>
                <Link href="/menu" className="btn btn-outline px-8 py-3 rounded-full text-lg font-bold bg-white">
                    View Menu 🍕
                </Link>
            </div>
            <div className="mt-12 opacity-50">
                <div className="text-sm text-gray-400">Error 404</div>
            </div>
        </div>
    );
}
