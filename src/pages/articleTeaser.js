import moment from "moment";
import React from "react";

export default function ArticleTeaser({article}) {
    const publicationDate = moment(article.publicationDate);
    return article ? (
        <div>
            <h2>{article.title}</h2>
            <p>{publicationDate.format('DD.MM.yyyy')}</p>
            <img src={article.coverImage.url} alt={article.coverImage.alt} height={100} width={100} />
            <button>Read Article</button>
        </div>
    ) : null
}