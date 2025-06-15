import React from 'react';
import { graphql, Link } from 'gatsby';
import { Seo } from '../../components/seo';
import Layout from '../../components/layout';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import InitialBanner from '../../components/initial-banner';
import ArticleTeaser from '../../pages/article-teaser';
import TripMap from '../../components/TripMap';

export default function TripTemplate({ data: { datoCmsTrip, allArticles } }) {
  const articles = allArticles.nodes;
  
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Seo title={`${datoCmsTrip.title} - Trips`} />
      <Header />
      <InitialBanner />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Trip Header */}
        <div 
          className="relative h-64 rounded-lg overflow-hidden mb-8"
          style={{
            backgroundImage: `url(${datoCmsTrip.coverImage.url})`,
            backgroundColor: datoCmsTrip.color.hex,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white">{datoCmsTrip.title}</h1>
            <p className="text-xl text-gray-200 mt-2">
              {new Date(datoCmsTrip.startDate).toLocaleDateString()} - 
              {datoCmsTrip.endDate 
                ? new Date(datoCmsTrip.endDate).toLocaleDateString() 
                : 'Ongoing'}
            </p>
          </div>
        </div>

        {/* Trip Description */}
        {datoCmsTrip.description && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 text-lg">{datoCmsTrip.description}</p>
          </div>
        )}

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <h2 className="text-2xl font-bold p-6 pb-0 text-gray-800">Trip Map</h2>
          <p className="px-6 text-gray-600 mb-4">Explore the journey through the map below</p>
          <div className="border-t border-gray-100">
            <TripMap
              articles={articles} 
              className="h-96"
              tripColor={datoCmsTrip.color?.hex || '#4F46E5'}
            />
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Articles</h2>
            <span className="text-sm text-gray-500">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this trip
            </span>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleTeaser 
                  article={article} 
                  key={article.id} 
                  showTripInfo={false} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-4">No articles found for this trip yet.</p>
              <Link 
                to="/" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Browse all articles
              </Link>
            </div>
          )}
        </div>

        {/* Back to Trips Link */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to all trips
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query($tripId: String) {
    datoCmsTrip(tripId: { eq: $tripId }) {
      id
      title
      tripId
      description
      startDate
      endDate
      color {
        hex
      }
      coverImage {
        url
        alt
      }
    }
    allArticles: allDatoCmsArticle(
      filter: { tripReference: { tripId: { eq: $tripId } } }
      sort: { publicationDate: DESC }
    ) {
      nodes {
        id
        title
        slug
        publicationDate
        location {
          latitude
          longitude
        }
        coverImage {
          url
          alt
        }
      }
    }
  }
`;
