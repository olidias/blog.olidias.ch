import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";

export default function About() {
    return (
        <Layout className="bg-main-background w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={2} />
            <div>
                <h1>About</h1>
            </div>
        </Layout>
    )
}