import { graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from '../../components/layout';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import 'tw-elements';
import InitialBanner from "../../components/initial-banner";

export default function ArticleTemplate({ data }) {
    console.log(data);
    return (
        <Layout className="bg-main-background w-full h-full">
            <Header />
            <InitialBanner />
            <Navigation />
            <div>
                <div id="carouselExampleIndicators" data-bs-ride="carousel" className={`carousel slide relative ${data.datoCmsArticle.articleGallery?.length <= 1 ? 'hidden': ''}`} >
                    <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                    </div>
                    <div className="carousel-inner relative w-full overflow-hidden">
                        <div className="carousel-item active float-left w-full">
                            <img
                                src={data.datoCmsArticle.articleGallery[0]?.url}
                                className="block w-full"
                                alt={data.datoCmsArticle.articleGallery[0]?.alt}
                            />
                        </div>
                        <div className="carousel-item float-left w-full">
                            <img
                                src={data.datoCmsArticle.articleGallery[2]?.url}
                                className="block w-full"
                                alt={data.datoCmsArticle.articleGallery[2]?.alt}
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <h1 className="text-xl font-medium leading-tight mb-2 text-center m-4">{data.datoCmsArticle?.title}</h1>
                <div>
                    <p className="text-center text-sm mb-3">{moment(data.datoCmsArticle.publicationDate).format('DD.MM.yyyy')}</p>
                    <article>
                        {data.datoCmsArticle?.articleContent}
                    </article>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String) {
        datoCmsArticle(slug: { eq: $slug }) {
            id
            title
            slug
            publicationDate
            articleContent
            articleGallery {
              url
              alt
            }
            }   
}`

