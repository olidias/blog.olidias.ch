import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";
import { graphql } from 'gatsby';

function About({ data: { about } }) {
    return (
        <Layout className="bg-main-background w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={2} />
            <div className="">
                <div>
                    <img src={about?.aboutImg?.url} alt={about?.aboutImg?.alt} className="rounded-full w-56 shadow-lg mx-auto sm:my-4 my-8" />
                    <article className="text-lg font-light">
                        {about?.aboutArticle}
                    </article>
                </div>

            </div>
        </Layout>
    )
}
export default About;

export const query = graphql`
{
    about: datoCmsAbout {
      id
      aboutArticle
      aboutImg {
        url(imgixParams: {fit: "facearea", w: "250", h: "250"})
        alt
      }
    }
  }
`  