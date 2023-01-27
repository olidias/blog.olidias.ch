import React from 'react';
import '../styles/index.css';
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Header from '../components/header';
import Navigation from '../components/navigation';
import ArticleTeaser from './article-teaser';

function Index({ data: { allArticles } }) {
  const articles = allArticles.nodes;

  return (
    <div className="bg-gradient-to-b from-background-2 via-background-3 to-background-5 h-full w-full flex justify-center">
      <Layout className="bg-main-background w-full h-full">
        <Header />
        <Navigation />
        <main className="flex flex-col justify-center items-center">
          {articles.map(article => (
            <ArticleTeaser article={article} key={article.id}></ArticleTeaser>
          ))}
        </main>
      </Layout>
    </div>
  );
}

export default Index;

export const query = graphql`
{
  allArticles: allDatoCmsArticle {
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