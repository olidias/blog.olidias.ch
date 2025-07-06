import React, { useEffect } from "react"
export default function Header() {
    const r = (
        <div className="w-full flex-col flex items-center justify-center text-text-main bg-transparent py-16">
            <h1 className="m-5 text-5xl sm:text-7xl font-sans font-bold">OLIDIAS.CH</h1>
            <div>
                <h2 className="text-xl md:text-5xl sm:text-3xl min-[330px]:text-2xl font-sans italic text-text-muted whitespace-nowrap flex self-center h-20">Travelblog and Photography</h2>
            </div>
        </div>
    );
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