let itemsComplete = [];

const joinParams = (params = {}) => {
  var k, p, v;
  p = [];
  for (k in params) {
    v = params[k];
    if (v) {
      p.push(k + '=' + encodeURIComponent(v));
    }
  }
  return p.join('&');
};

const getPocketItems = (count = 5000, offset = 0, counter = 0, since) => {
  counter++;
  let filename = './data/pocket-list-items-' + counter + '.json';
  const opts = {
    // since:	since,  // timestamp - only return items modified since the given since unix timestamp
    sort: 'newest',
    count: count,
    offset: offset,
    state: 'all',
    detailType: 'complete'
  };

  axios
    // @ts-ignore
    .get(
      'https://getpocket.com/v3/get?' +
        joinParams({
          ...opts,
          consumer_key: POCKET_CONSUMER_KEY,
          access_token: ACCESS_TOKEN
        })
    )
    .then(res => {
      let currentQueryDateTime = moment().toISOString(res.headers.date);
      console.log(`Query results from: ${currentQueryDateTime}\n`);
      let articlesSet = Object.values(res.data.list);
      let itemsSet = _.uniq(_.map(x => parseArticleObj(x), articlesSet));
      itemsComplete.unshift(...itemsSet);

      if (articlesSet.length > 1) {
        dump(itemsSet[0]);
        console.log('\n\n');
        console.log(`${counter}: loop of ${count} articles processed.`);
        console.log(`${itemsComplete.length}: total articles.\n`);
        getPocketItems(5000, offset + 5000, counter);
      } else {
        console.log('All articles collected.\n');
        console.log('Writing data file...');

        fs.writeJson('./data/items.json', itemsComplete, {spaces: 4})
          .then(() => {
            console.log('Writing data file...complete.');
          })
          .catch(err => {
            console.error(err);
          });
      }
    })
    .catch(error => {
      if (error.response) {
        // server responded with status code out of range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is instance of XMLHttpRequest in the browser
        // instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened setting up request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

const parseArticleObj = obj => {
  // return object
  return {
    item_id: obj.item_id,
    resolved_id: obj.resolved_id, // string "3447"
    resolved_url: obj.resolved_url, // string "https://mitpress.mit.edu/sicp/full-text/book/book.html"
    resolved_title: obj.resolved_title, // string ""
    given_url: obj.given_url, // string "https://mitpress.mit.edu/sicp/full-text/book/book.html"
    given_title: obj.given_title, // string "Structure and Interpretation of Computer Programs"
    time_added: moment.unix(obj.time_added).toISOString(), //
    time_updated: moment.unix(obj.time_updated).toISOString(), //
    excerpt: obj.excerpt,
    lang: obj.lang // string ""
  };
};
