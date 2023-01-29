import React from "react";

export default function Navigation({activeIndex = 0}) {
    return (
        <div id="navigation" className="mt-[50vh] font-megrim font-bold">
            <ul className="flex flex-row items-stretch w-full">
                <li className={`sm:m-6 m-2 border-b-4 border-b-transparent ${activeIndex === 0 ? 'font-bold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/">BLOG</a></li>
                <li className={`sm:m-6 m-2 border-b-4 border-b-transparent ${activeIndex === 1 ? 'font-bold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/gallery">GALLERY</a></li>
                <li className={`sm:m-6 m-2 border-b-4 border-b-transparent ${activeIndex === 2 ? 'font-bold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/about">ABOUT</a></li>
            </ul>
        </div>
    )
}