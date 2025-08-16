import React, { useMemo } from 'react';
import '../styles/index.css';
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Header from '../components/header';
import Navigation from '../components/navigation';
import ArticleTeaser from './article-teaser';
import HeroSection from '../components/initial-banner';
import TripMap from '../components/TripMap';
import { Seo } from '../components/seo';
import TripCard from '../components/TripCard';

function Index({ data: { allArticles, allTrips, about } }) {
  const articles = allArticles.nodes;
  const trips = allTrips.nodes;

  // Group articles by trip
  const articlesByTrip = useMemo(() => trips.map(trip => ({
    ...trip,
    articles: articles
      .filter(article => article.tripReference?.id === trip.id)
      .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
  })), [trips, articles]);

  // Get all articles with location for the map
  const allArticlesWithLocations = useMemo(() =>
    articles.filter(article => article.location && article.location.latitude && article.location.longitude)
    , [articles]);

  return (
    <Layout className="w-full min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection>
        <Header />
      </HeroSection>
      <section className="w-full flex flex-col items-center justify-center py-12 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-text-main">Meet Oli & Anna</h2>
        <div className="max-w-2xl text-center text-lg text-text-muted">
          <img src="/img/meet-oli-anna.webp" alt="Oli & Anna" className="rounded-xl mb-4 w-48 h-48 object-cover mx-auto" />
          <p>
            We're a couple based in Switzerland enjoying life whilst finding what the world has to offer. We enjoy reliving wonderful moments through this blog, and it's even better if you can enjoy it too!
          </p>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-text-main text-center">Follow our current travel route</h2>
          <div className="rounded-lg shadow-md overflow-hidden">
            <TripMap
              articles={allArticlesWithLocations}
              className="h-96"
            />
          </div>
        </section>

        {/* Current Trip Section */}
        {articlesByTrip.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-text-main">Current Trip</h2>
            <div className="space-y-12">
              <TripCard trip={articlesByTrip[0]} />
            </div>
          </section>
        )}

        {/* Older Trips Section */}
        {articlesByTrip.length > 1 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-text-main">Older Trips</h2>
            <div className="space-y-12">
              {articlesByTrip.slice(1).map((trip) => (
                <TripCard trip={trip} key={trip.id} />
              ))}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Index;
export const Head = () => (
  <Seo />
)

export const query = graphql`{
  allArticles: allDatoCmsArticle(sort: {publicationDate: DESC}, filter: {tripReference: {id: {ne: null}}}) {
    nodes {
      id
      title
      slug
      publicationDate
      location {
        latitude
        longitude
      }
      tripReference {
        id
        title
        color {
          hex
        }
        startDate
        endDate
      }
      coverImage {
        url
        alt
      }
    }
  }
  
  allTrips: allDatoCmsTrip(sort: {startDate: DESC}) {
    nodes {
      id
      title
      tripId
      description
      color {
        hex
      }
      coverImage {
        url
        alt
      }
      startDate
      endDate
    }
  }
  about: datoCmsAbout {
    aboutArticle
  }
}`
