'use client';

import Link from 'next/link';
import Lottie from 'lottie-react';

import animationData from '@/public/animations/not-found.json';

const NotFound = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

            <div className="w-[350px] md:w-[450px]">
                <Lottie
                    animationData={animationData}
                    loop
                />
            </div>

            <h1 className="text-4xl font-bold mt-4">
                404
            </h1>

            <p className="text-gray-500 mt-2">
                Oops! The page you're looking for doesn't exist.
            </p>

            <Link
                href="/"
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                Back to Home
            </Link>

        </main>
    );
};

export default NotFound;