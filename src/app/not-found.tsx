'use client';

import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
    return (
        <main className="min-h-screen w-full flex flex-col bg-[#f4ede2] text-[#3b2416]">
            <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-black/5">
                <span className="text-sm font-semibold tracking-tight">Your Brand</span>
                <span className="text-xs text-black/40 tracking-widest uppercase">Error 404</span>
            </header>
            <section className="flex-1 flex flex-col justify-center px-6 md:px-12 py-16">
                <div className="max-w-6xl mx-auto w-full">
                    <p className="text-xs tracking-[0.3em] uppercase text-[#b85c38]/60 mb-6">Not Found</p>
                    <h1 className="text-[22vw] md:text-[16vw] leading-[0.85] font-black tracking-tighter text-[#3b2416]">404</h1>
                    <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-8 md:gap-16 items-end">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">This page doesn't exist.</h2>
                            <p className="text-[#3b2416]/60 leading-relaxed max-w-md">
                                The link may be broken, or the page may have been removed. Let's get you back to somewhere useful.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                            <Link href="/" className="px-7 py-3.5 bg-[#b85c38] text-white text-sm font-medium rounded-full hover:bg-[#a04e2e] transition-colors text-center">Back to Home</Link>
                            <button type="button" onClick={() => window.history.back()} className="px-7 py-3.5 border border-[#3b2416]/20 text-sm font-medium rounded-full hover:bg-[#3b2416]/5 transition-colors">Previous Page</button>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="w-full px-6 md:px-12 py-6 border-t border-black/5 flex items-center justify-between text-xs text-[#3b2416]/40">
                <span>© {new Date().getFullYear()} Your Brand</span>
                <span>Lost? Go home.</span>
            </footer>
        </main>
    );
};

export default NotFound;