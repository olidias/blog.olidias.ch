import React from "react"

export default function Header() {
    return (
        <div className="w-full flex-col flex items-center justify-center z-10 absolute">
            <h1 className="m-5 text-4xl sm:text-7xl font-megrim font-bold animate-fade 
            ">OLIDIAS.CH</h1>
            <h2 className=" text-2xl sm:text-5xl font-explora">Travelblog and Photography</h2>
        </div>
    )
}