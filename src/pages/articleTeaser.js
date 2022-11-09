import React from "react";

export default function ArticleTeaser({article}) {
    return article ? (
        <div>
            <h2>{article.title}</h2>
            <img src={article.coverImage.url} alt={article.coverImage.alt} height={100} width={100} />
            <button>Read Article</button>
        </div>
    ) : null
}