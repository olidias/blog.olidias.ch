import React from "react";
import Layout from '../components/layout';
import InitialBanner from "../components/initial-banner";

function NotFound() {
    return (
        <Layout className="bg-main-background w-full h-full">
            <InitialBanner />
            <div className="z-10 font-open-sans">
                <div>
                    <h1 className="text-3xl text-center text-slate-200 mt-9">Ooops!</h1>
                    <article className="max-w-xl">
                        <div className="text-lg text-center text-slate-200 mt-2 whitespace-pre-wrap mx-5 sm:mx-9">
                            <p>This page could not be found. Click <a href="/">here </a>to get back home.</p>
                        </div>
                    </article>
                </div>

            </div>
        </Layout>
    )
}
export default NotFound;