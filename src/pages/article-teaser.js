import moment from "moment";
import React from "react";
import { Link } from "gatsby";

export default function ArticleTeaser({ article, showTripInfo = true }) {
  if (!article) return null;
  
  const publicationDate = moment(article?.publicationDate);
  const hasCoverImage = article.coverImage?.url;
  const tripColor = article.tripReference?.color?.hex || '#4F46E5';

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Cover Image */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: hasCoverImage ? `url(${article.coverImage.url}?w=600&h=300&fit=crop&crop=faces,center)` : 'none',
          backgroundColor: hasCoverImage ? 'transparent' : 'var(--tw-color-accent-1)',
        }}
      >
        {!hasCoverImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{article.title}</span>
          </div>
        )}
        
        {/* Trip Info */}
        {showTripInfo && article.tripReference && (
          <div 
            className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: tripColor }}
          >
            {article.tripReference.title}
          </div>
        )}
        
        {/* Read More Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium text-sm">
            Read Article
          </span>
        </div>
      </div>
      
      {/* Article Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          <Link to={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
            {article.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-sm text-gray-500">
          <time dateTime={article.publicationDate}>
            {publicationDate.format('MMMM D, YYYY')}
          </time>
          
          {article.location && article.location.latitude && article.location.longitude && (
            <span className="ml-3 inline-flex items-center">
              <svg 
                className="w-3.5 h-3.5 mr-1 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              Location
            </span>
          )}
        </div>
      </div>
    </div>
  );
}