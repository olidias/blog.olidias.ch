import React from 'react';
import '../styles/index.css';
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Header from '../components/header';
import Navigation from '../components/navigation';
import ArticleTeaser from './articleTeaser';

function Index({ data: { allArticles } }) {
  const articles = allArticles.nodes;

  return (
    <Layout>
      <Header />
      <Navigation />
      <main>
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