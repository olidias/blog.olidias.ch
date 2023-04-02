import React from 'react';
import '../styles/index.css';
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Header from '../components/header';
import Navigation from '../components/navigation';
import ArticleTeaser from './article-teaser';
import InitialBanner from '../components/initial-banner';

function Index({ data: { allArticles } }) {
  const articles = allArticles.nodes;

  return (
    <Layout className="w-full h-full">
      <title>olidias.ch - Travelblog and Photography</title>
      <InitialBanner />
      <Header />
      <Navigation />
      <main className="flex flex-col justify-center items-center z-10 font-didact-gothic">
        {articles.map(article => (
          <ArticleTeaser article={article} key={article.id}></ArticleTeaser>
        ))}
      </main>
    </Layout>
  );
}

export default Index;

export const query = graphql`
{
  allArticles: allDatoCmsArticle(sort: {fields: publicationDate, order:DESC}) {
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
