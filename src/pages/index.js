import React from 'react';
import '../styles/index.css';
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Header from '../components/header';
import Navigation from '../components/navigation';
import ArticleTeaser from './article-teaser';
import InitialBanner from '../components/initial-banner';
import { Seo } from '../components/seo';

function Index({ data: { allArticles } }) {
  const articles = allArticles.nodes;

  return (
    <Layout className="w-full h-full">
      <InitialBanner />
      <Header />
      <Navigation />
      <main className="flex flex-col justify-center items-center z-10 font-open-sans">
        {articles.map(article => (
          <ArticleTeaser article={article} key={article.id}></ArticleTeaser>
        ))}
      </main>
    </Layout>
  );
}

export default Index;
export const Head = () => (
  <Seo />
)

export const query = graphql`{
  allArticles: allDatoCmsArticle(sort: {publicationDate: DESC}) {
    nodes {
      id
      title
      slug
      publicationDate
      coverImage {
        url
        alt
      }
    }
  }
}`
