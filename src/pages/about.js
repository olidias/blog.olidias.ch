import React from "react";
import Layout from '../components/layout';
import Navigation from "../components/navigation";
import Header from "../components/header";
import InitialBanner from "../components/initial-banner";
import { graphql } from 'gatsby';
import { Seo } from "../components/seo";

function About({ data: { about } }) {
    return (
        <Layout className="bg-main-background w-full h-full">
            <InitialBanner />
            <Header />
            <Navigation activeIndex={2} />
            <div className="z-10 font-open-sans">
                <div>
                    <img src={about?.aboutImg?.url} alt={about?.aboutImg?.alt} className="rounded-full w-56 shadow-lg mx-auto sm:my-4 -w-xs hover:scale-110 transition duration-300 ease-in-out" />
                    <h1 className="text-3xl text-center text-slate-200 mt-9">Hello there! 👋</h1>
                    <article className="max-w-xl">
                        <div className="text-lg text-center text-slate-200 mt-2 whitespace-pre-wrap mx-5 sm:mx-9">
                            <p dangerouslySetInnerHTML={{ __html: about?.aboutArticle}}></p>
                        </div>
                    </article>
                </div>

            </div>
        </Layout>
    )
}
export default About;
export const Head = () => (
    <Seo title="About - Oli Dias">
      <script type="application/ld+json">
        {`
      {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "url": "https://blog.olidias.ch/about",
          "name": "olidias.ch - About",
          "creator": {
            "@type": "Person",
            "givenName": "Oli",
            "familyName": "Dias",
            "additionalName": "Oli"
          }
        }
    `}
      </script>
    </Seo>
  );

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
