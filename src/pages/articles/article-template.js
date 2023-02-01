import { graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from '../../components/layout';
import Header from '../../components/header';
import Navigation from '../../components/navigation';

export default function ArticleTemplate({ data }) {
    console.log(data);
    return (
        <Layout className="bg-main-background w-full h-full">
            <Header />
            <Navigation />
            <div>
                <h1>{data.datoCmsArticle?.title}</h1>
                <div>
                    <small>{moment(data.datoCmsArticle.publicationDate).format('DD.MM.yyyy')}</small>
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
    }   
}`

