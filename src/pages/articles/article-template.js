import { Script, graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from "../../components/layout";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import InitialBanner from "../../components/initial-banner";
import ImageGallery from "react-image-gallery";
import { Seo } from "../../components/seo";

export default function ArticleTemplate({ data, pageContext }) {
  const galleryImages = [];
  data.datoCmsArticle.articleGallery?.forEach((image) => {
    galleryImages.push({
      original: image.url,
      thumbnail: `${image.url}?h=100&w=200`,
    });
  });
  return (
    <Layout className="h-full w-full">
        <Seo title={data.datoCmsArticle.title + " - olidias.ch"}>
            <Script type="application/ld+json">
            {`
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "url": "https://blog.olidias.ch/articles/${data.datoCmsArticle?.title}",
                "name": "olidias.ch - Blog",
                "creator": {
                    "@type": "Person",
                    "givenName": "Oli",
                    "familyName": "Dias",
                    "additionalName": "Oli"
                }
            }
            `}
            </Script>
        </Seo>
      <Header />
      <InitialBanner />
      <Navigation />
      <div className="z-10 max-w-full rounded p-3 font-open-sans text-xl  text-slate-200">
        <div
          className={`mx-auto h-auto ${
            galleryImages.length === 0 ? `collapse` : ""
          }`}>
          <ImageGallery items={galleryImages} />
        </div>
        <h1 className="mb-2 mt-4 text-left text-3xl leading-tight">
          {data.datoCmsArticle?.title}
        </h1>
        <div>
          <p className="mb-3 text-left text-sm">
            {moment(data.datoCmsArticle.publicationDate).format("DD.MM.yyyy")}
          </p>
          <article className="text-lg">
            <p
              dangerouslySetInnerHTML={{
                __html: data.datoCmsArticle?.articleContent,
              }}/>
          </article>
          <div className="mt-10 flex flex-row flex-nowrap justify-between italic">
            <div
              className={`${pageContext.nextSlug ? "" : "invisible"}  w-30
                        my-auto mt-auto mb-0 flex justify-center justify-self-end align-middle text-lg text-slate-300
                        `}>
              <a href={`/articles/${pageContext.nextSlug}`} className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="mr-0.5 mt-0.5 h-6 w-6 pt-0.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                </svg>
                Previous Article
              </a>
            </div>
            <div
              className={`${pageContext.previousSlug ? "" : "hidden"}  w-30
                        my-auto mt-auto mb-0 flex justify-center justify-self-start align-middle text-lg  text-slate-300`}>
              <a href={`/articles/${pageContext.previousSlug}`}
                className="flex">
                Next Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="ml-2 mt-0.5 h-6 w-6 pt-0.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String) {
    datoCmsArticle(slug: { eq: $slug }) {
      id
      title
      slug
      publicationDate
      articleContent
      articleGallery {
        url(imgixParams: { h: "490", w: "896", fit: "crop" })
        alt
        customData
      }
    }
  }
`;
