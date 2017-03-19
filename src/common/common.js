const domain = location.host;

export const IMAGE_DOMAIN = 'http://testbbcimage.leimingtech.com';
export const SERVER_DOMAIN = 'http://testbbc.leimingtech.com';

export function getFullUrl(requestUrl) {
  let url = location.protocol + '//' + domain;
  if (requestUrl.startsWith("/")) {
    url = url + requestUrl;
  } else {
    url = url + "/" + requestUrl;
  }

  return url;
}

export function isWechat() {
  return navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isQQ() {
  return navigator.userAgent.indexOf('QQ') > -1;
}
