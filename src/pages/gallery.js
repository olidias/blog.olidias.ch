import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";

export default function Gallery() {
    return (
        <Layout className="bg-main-background w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={1} />
            <div>
                <h1>Gallery</h1>
            </div>
        </Layout>
    )
}