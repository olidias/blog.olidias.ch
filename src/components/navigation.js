import React from "react";

export default function Navigation() {
    return (
        <div id="navigation" >
            <ul className="flex flex-row items-stretch w-full">
                <li className="sm:m-6 m-2"><a href="/">BLOG</a></li>
                <li className="sm:m-6 m-2"><a href="/gallery">GALLERY</a></li>
                <li className="sm:m-6 m-2"><a href="/about">ABOUT</a></li>
            </ul>
        </div>
    )
}