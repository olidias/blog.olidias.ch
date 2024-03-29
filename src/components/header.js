import React, { useEffect } from "react"
let hasAnimated = false;
export default function Header() {
    const r = (
        <div className="w-full flex-col flex items-center justify-center z-10 fixed text-gray-100 transition-opacity duration-200 disappear-on-scroll">
            <h1 className={`m-5 text-5xl sm:text-7xl font-megrim font-bold ${!hasAnimated ? 'animate-fade opacity-0' : ''}`}>OLIDIAS.CH</h1>
            <div>
                <h2 className={`text-1xl md:text-5xl sm:text-3xl min-[330px]:text-2xl font-megrim italic ${!hasAnimated ? 'animate-typewriter w-0 ' : ''} overflow-hidden whitespace-nowrap flex self-center h-20`}>Travelblog and Photography</h2>
            </div>
        </div>
    );
    hasAnimated = true;
    useEffect(() => {
        const headerElements = document.querySelectorAll('.disappear-on-scroll');
    
        document.addEventListener('scroll', event => {
            headerElements.forEach(headerElement => {
                if (window.scrollY > 150) {
                    headerElement.classList.add('opacity-0');
                } else {
                    headerElement.classList.add('opacity-1');
                    headerElement.classList.remove('opacity-0');

                }
            })
        })
    })
    return r;
}