import React from "react";

export default function Navigation({activeIndex = 0}) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-border shadow z-40 flex justify-center">
            <ul className="flex flex-row items-center h-16">
                <li className={`mx-6 text-lg font-semibold ${activeIndex === 0 ? 'text-accent-1 border-b-2 border-accent-1' : 'text-text-muted hover:text-accent-1'} transition-colors`}><a href="/">BLOG</a></li>
                <li className={`mx-6 text-lg font-semibold ${activeIndex === 1 ? 'text-accent-1 border-b-2 border-accent-1' : 'text-text-muted hover:text-accent-1'} transition-colors`}><a href="/gallery">GALLERY</a></li>
                <li className={`mx-6 text-lg font-semibold ${activeIndex === 2 ? 'text-accent-1 border-b-2 border-accent-1' : 'text-text-muted hover:text-accent-1'} transition-colors`}><a href="/about">ABOUT</a></li>
            </ul>
        </nav>
    )
}