import fetch from 'node-fetch';


export const getShoes = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/shoes/?auth_token=8ed1487bcb8b9f809cdceb5a92b8dee33f127238`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };

  export const getWatch = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/watch?auth_token=8ed1487bcb8b9f809cdceb5a92b8dee33f127238`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };

  export const getScale = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/scale/?auth_token=8ed1487bcb8b9f809cdceb5a92b8dee33f127238`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };