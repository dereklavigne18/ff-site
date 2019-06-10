/**
 * Request utils
 */

const GRAPHQL_URL = 'http://localhost:3000/graphql';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  console.log(url);
  console.log(options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests the GraphQL endpoint returning a promise
 *
 * @param {string} query     The GraphQL query string
 * @param {object} variables The variables
 *
 * @return {object}          The response data
 */
export function graphql(query, variables = null) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      query: query.loc.source,
      variables,
    },
  };

  return request(GRAPHQL_URL, options);
}
