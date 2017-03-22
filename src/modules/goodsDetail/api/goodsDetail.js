import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}

export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}

export function goodsdetail({ specId }) {
  return fetch.get('goods/api/goodsdetail', { specId });
}

export function goodsBrowseSaveOrUpdate({ goodsId }) {
  return fetch.get('/memberapi/GoodsBrowseSaveOrUpdate', { goodsId });
}

// 获取规格
export function getSpecByGoodsIdAndSpecIds({ goodsId, specIds }) {
  return fetch.get('/goods/api/getSpecByGoodsIdAndSpecIds', { goodsId, specIds });
}

// 收藏
export function storecollection({ favType, goodsId, storeId }) {
  return fetch.get('/storeapi/storecollection', { favType, goodsId, storeId });
}
