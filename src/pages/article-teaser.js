import moment from "moment";
import React from "react";

export default function ArticleTeaser({ article }) {
    const publicationDate = moment(article?.publicationDate);
    return article ? (
        <div
            style={{ "background-image": `url(${article.coverImage?.url})` }}
            className="w-full h-80 mt-10 shadow-xl px-10 py-5 bg-cover bg-no-repeat rounded flex flex-col items-stretch">
            <h2 className="font-bold text-lg">{article.title}</h2>
            <p>{publicationDate.format('DD.MM.yyyy')}</p>
            <a className="align-middle my-auto text-slate-300 h-9 w-28 flex justify-center rounded border-2 border-slate-300 font-semibold backdrop-blur-xl mt-auto mb-0" href={'articles/' + article.slug}>
                <div className="mt-1">
                    Read Article
                </div></a>
        </div>
    ) : null
}