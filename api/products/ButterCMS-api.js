import fetch from 'node-fetch';
 

export const getShoes = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/shoes/?auth_token=3c65d007b65df247e9e7ead5e552605b200cb84e`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };

  export const getWatch = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/watch/?auth_token=3c65d007b65df247e9e7ead5e552605b200cb84e`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };

  export const getScale = () => {
    return fetch(
      `https://api.buttercms.com/v2/pages/product/scale/?auth_token=3c65d007b65df247e9e7ead5e552605b200cb84e`
    ).then(res => res.json())
    .then(json => json.data.fields);
  };