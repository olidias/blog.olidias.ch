import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";

export default function Gallery() {
    return (
        <Layout className="w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={1} />
            <div className="z-10">
                <h1>Gallery</h1>
            </div>
        </Layout>
    )
}