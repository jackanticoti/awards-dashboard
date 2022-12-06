import React, { useState } from 'react';

const KEY_QUERY = `
query {
  Languages {
    code
  }
}
`;

function Page() {
  const [name, setName] = useState(null);
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: KEY_QUERY
    })
  })
    .then(r => r.json())
    .then(res => {
      console.log('>>> res', res);
      console.log('>>> res.data', res.data);
      console.log('>>> res.data.Languages', res.data.Languages);
      console.log('>>> stringed', res.data.Languages.map(lang => lang.code).join(','));
      setName(res.data.Languages.map(lang => lang.code).join(','));
    })
    .catch(err => {
      console.log('>>> err', err);
    });

  return (
    <div>
      <h1>{name ? name : 'hi'}</h1>
    </div>
  );
}

export { Page };