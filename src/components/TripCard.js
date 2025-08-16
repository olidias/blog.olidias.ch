import React from 'react';
import ArticleTeaser from '../pages/article-teaser';

const TripCard = ({ trip }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
            {new Date(trip.startDate).toLocaleDateString('de-CH')} -
            {trip.endDate ? new Date(trip.endDate).toLocaleDateString('de-CH') : 'Ongoing'}
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
);

export default TripCard;
