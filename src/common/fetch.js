import qs from 'qs';
import { getFullUrl, getUserId, getVerifyCode, isApp } from './common';
import fetch from 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.text()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  const json = JSON.parse(response);
  return json;
}

export function get(requestUrl, params) {
  const baseParams = {
    _k: new Date().getTime()
  };

  params = {
    ...baseParams,
    ...params
  }
  let url = getFullUrl(requestUrl);
  if (params) {
    url = url + "?" + qs.stringify(params);
  }
  return fetch(url, {
      credentials: 'include',
    }).then(checkStatus)
    .then(parseJSON);
}

export function post(requestUrl, params) {
  const baseParams = {
    _k: new Date().getTime()
  }

  let url = getFullUrl(requestUrl);
  params = {
    ...params,
    ...baseParams
  }
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: 'include',
    body: qs.stringify(params),
  }).then(checkStatus).then(parseJSON);
}
