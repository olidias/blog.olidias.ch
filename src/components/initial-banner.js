import React from "react";

export default function HeroSection({ children }) {
    return (
        <section className="relative w-full h-[350px] flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('./assets/header-background.webp')", opacity: 0.18 }}></div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                {children}
            </div>
        </section>
    )
}