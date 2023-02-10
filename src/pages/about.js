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
            <div>
                <div>
                    <img src={about?.aboutImg?.url} alt={about?.aboutImg?.alt} className="rounded-full w-56 shadow-lg mx-auto sm:my-4 -w-xs hover:scale-110 transition duration-300 ease-in-out" />
                    <h1 className="text-3xl font-thin text-center mt-9">Hello there! 👋</h1>
                    <article>
                        <div className="text-lg font-light text-center mt-2 whitespace-pre-wrap mx-5 sm:mx-9">
                            <p dangerouslySetInnerHTML={{ __html: about?.aboutArticle}}></p>
                        </div>
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