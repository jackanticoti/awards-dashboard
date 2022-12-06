import React from 'react';

// Star wars data fetch, this works

function Page() {

    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `
        query {
            allFilms {
              films {
                title
              }
            }
          }
          
        `})
    })
    .then(res => res.json())
    .then(res => console.log(res.data));

    return (
        <div>
            <h1>Hi</h1>
            <h2>Hey hey hey</h2>
        </div>
    );
}

export { Page };