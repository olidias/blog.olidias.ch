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
      {/* Intro Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-text-main">Meet Oli & Anna</h2>
        <div className="max-w-2xl text-center text-lg text-text-muted">
          <div dangerouslySetInnerHTML={{ __html: about?.aboutArticle?.split('\n')[0] }} />
        </div>
      </section>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Map Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-text-main text-center">Follow our travel route</h2>
          <div className="rounded-lg shadow-md overflow-hidden">
            <TripMap
              articles={allArticlesWithLocations}
              className="h-96"
            />
          </div>
        </section>

        {/* Trips Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-text-main">Trips</h2>
          <div className="space-y-12">
            {articlesByTrip.map((trip) => (
              <div key={trip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${trip.coverImage.url})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{trip.title}</h3>
                      <p className="text-gray-200">
                        {new Date(trip.startDate).toLocaleDateString()} -
                        {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'Ongoing'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {trip.description && (
                    <p className="text-text-muted mb-6 italic">{trip.description}</p>
                  )}
                  <h4 className="text-xl font-semibold mb-4 text-text-main">Latest Articles</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {trip.articles.slice(0, 3).map(article => (
                      <ArticleTeaser article={article} key={article.id} />
                    ))}
                  </div>
                  {trip.articles.length > 3 && (
                    <div className="mt-6 text-center">
                      <a
                        href={`/trips/${trip.tripId}`}
                        className="inline-block px-6 py-2 rounded-md text-white bg-accent-1 hover:bg-accent-2 transition-colors"
                      >
                        View all articles from this trip
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
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
