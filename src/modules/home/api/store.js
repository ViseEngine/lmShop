import { fetch, common } from 'common';

export function storeBrowseSaveOrUpdate({ storeId }) {
  return fetch.get('/storeapi/storeBrowseSaveOrUpdate', {
    storeId
  });
}

export function storedetail({ storeId }) {
  return fetch.get('/storeapi/storedetail', {
    storeId
  });
}

// 关注店铺
export function storecollection({
  favType,
  goodsId,
  storeId
}) {
  return fetch.get('/storeapi/storecollection', {
    favType,
    goodsId,
    storeId,
  });
}
