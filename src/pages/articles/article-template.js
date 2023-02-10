import { graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from '../../components/layout';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import InitialBanner from "../../components/initial-banner";
import Carousel from "nuka-carousel/lib/carousel";

export default function ArticleTemplate({ data }) {
    console.log(data);
    return (
        <Layout className="bg-main-background w-full h-full">
            <Header />
            <InitialBanner />
            <Navigation />
            <div>
                <div className={`${data.datoCmsArticle.articleGallery.filter(g => g.customData?.isHeader).length === 0 ? 'hidden' : ''} max-w-4xl mx-auto`}>
                    <Carousel adaptiveHeight={false} defaultControlsConfig={{
                        nextButtonText: '❯',
                        prevButtonText: '❮',
                        pagingDotsStyle: { margin: '1rem' }
                    }} className="rounded-sm shadow-lg">
                        {data.datoCmsArticle.articleGallery?.filter(g => g.customData?.isHeader).map(g => <img src={g.url} alt={g.alt} />)}
                    </Carousel>
                </div>

                <h1 className="text-xl font-medium leading-tight mb-2 text-center m-4">{data.datoCmsArticle?.title}</h1>
                <div>
                    <p className="text-center text-sm mb-3">{moment(data.datoCmsArticle.publicationDate).format('DD.MM.yyyy')}</p>
                    <article>
                        <p dangerouslySetInnerHTML={{ __html: data.datoCmsArticle?.articleContent }} />
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
                url(imgixParams: {h: "490", w: "896", fit: "crop"})
                alt
                customData
            }
            }   
}`

