import React from "react";

export default function Navigation({activeIndex = 0}) {
    return (
        <div id="navigation" className="mt-[calc(50vh-4rem)] z-10 font-megrim font-bold text-xl">
            <ul className="flex flex-row items-stretch w-full">
                <li className={`sm:mx-8 my-9 mx-4 border-b-4 border-b-transparent ${activeIndex === 0 ? 'font-extrabold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/">BLOG</a></li>
                <li className={`sm:mx-8 my-9 mx-4 border-b-4 border-b-transparent ${activeIndex === 1 ? 'font-extrabold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/gallery">GALLERY</a></li>
                <li className={`sm:mx-8 my-9 mx-4 border-b-4 border-b-transparent ${activeIndex === 2 ? 'font-extrabold' : 'hover:border-b-black hover:border-b-4'}`}><a href="/about">ABOUT</a></li>
            </ul>
        </div>
    )
}