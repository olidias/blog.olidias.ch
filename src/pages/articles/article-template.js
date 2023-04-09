import { graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from '../../components/layout';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import InitialBanner from "../../components/initial-banner";
import ImageGallery from 'react-image-gallery';

export default function ArticleTemplate({ data }) {
    const galleryImages = [];
    data.datoCmsArticle.articleGallery?.forEach(image => {
        galleryImages.push({
            original: image.url,
            thumbnail: `${image.url}?h=100&w=200`
        })
    });
    
    return (
        <Layout className="w-full h-full">
            <Header />
            <InitialBanner />
            <Navigation />
            <div className="text-slate-200 p-3 rounded z-10 font-open-sans text-xl">
                <div className={`${data.datoCmsArticle.articleGallery.filter(g => g.customData?.isHeader).length === 0 ? 'hidden' : ''} max-w-4xl mx-auto`}>
                    <ImageGallery items={galleryImages} />
                </div>
                <h1 className="text-3xl leading-tight mb-2 text-left mt-4">{data.datoCmsArticle?.title}</h1>
                <div>
                    <p className="text-left text-sm mb-3">{moment(data.datoCmsArticle.publicationDate).format('DD.MM.yyyy')}</p>
                    <article className="text-lg">
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

