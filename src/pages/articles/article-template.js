import React from 'react';

export default function ArticleTemplate({article}){
    console.log(article);
    return (
        <h1>{article?.title}</h1>
    )
}