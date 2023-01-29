import React from "react"

export default function Header() {

    return (
        <div className="w-full flex-col flex items-center justify-center z-10 absolute">
            <h1 className="m-5 text-4xl sm:text-7xl font-megrim font-bold animate-fade opacity-0">OLIDIAS.CH</h1>
            <div>
                <h2 className="text-4xl sm:text-5xl font-explora animate-typewriter w-0 overflow-hidden whitespace-nowrap flex self-center h-14">Travelblog and Photography</h2>
            </div>
        </div>
    )
}