import moment from "moment";
import React from "react";

export default function ArticleTeaser({ article }) {
    const publicationDate = moment(article?.publicationDate);
    return article ? (
        <a href={'articles/' + article.slug}
            style={{'--image-url': `url('${article.coverImage?.url}')`}} 
            className="bg-[image:var(--image-url)] w-full h-80 mt-10 shadow-xl px-10 py-5 bg-cover bg-no-repeat rounded flex flex-col items-stretch bg-right">
            <h2 className="text-lg font-semibold text-slate-800">{article.title}</h2>
            <p className="text-sm italic text-slate-700">{publicationDate.format('DD.MM.yyyy')}</p>
            <div className="align-middle my-auto text-slate-300 h-9 w-28 flex justify-center rounded border-2 border-slate-300 font-semibold backdrop-blur-xl mt-auto mb-0" >
                <div className="mt-1">
                    Read Article
                </div>
            </div>
        </a>
    ) : null
}