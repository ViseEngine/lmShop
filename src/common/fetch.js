import qs from 'qs';
import { getFullUrl, getUserId, getVerifyCode, isApp } from './common';
import fetch from 'isomorphic-fetch';
import React from 'react';
import { Modal } from 'antd-mobile';
import { common } from 'common';
// import Encrypt from 'jsencrypt';

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
  // check 通用错误码
  if (json.result == 0) {
    if (json.code == '99') {
      Modal.alert('', <div>{json.msg}</div>, [{
        text: '去登录',
        onPress: () => {
          common.gotoLoginAndBack();
        }
      }])
    }
  }
  return json;
}

export function get(requestUrl, params) {
  const baseParams = {
    timestamp: new Date().getTime()
  };

  params = {
    ...baseParams,
    ...params
  }
  let url = getFullUrl(requestUrl);
  if (params) {
    url = url + "?" + qs.stringify(params);
  }

  // var encrypt = new JSEncrypt();
  // encrypt.setPublicKey($('#pubkey').val());
  // var encrypted = encrypt.encrypt($('#input').val());

  const token = localStorage.getItem('token');
  return fetch(url, {
      headers: {
        token: token
      },
      credentials: 'include',
    }).then(checkStatus)
    .then(parseJSON);
}

export function post(requestUrl, params) {
  const baseParams = {
    timestamp: new Date().getTime()
  }

  let url = getFullUrl(requestUrl);
  const token = localStorage.getItem('token');
  params = {
    ...params,
    ...baseParams
  }
  return fetch(url, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: 'include',
    body: qs.stringify(params),
  }).then(checkStatus).then(parseJSON);
}
