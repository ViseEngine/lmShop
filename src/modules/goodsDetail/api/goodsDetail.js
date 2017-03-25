import { fetch, common } from 'common';

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

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}
// http://testbbc.leimingtech.com/storeapi/receiveCoupon
// couponId	02aa7553b52741fcbca24a3680458b73
// timestamp	1490443823920
// storeId	73947166753d454d8bc7c6e65a3c7267
// sign	kDfk1oL2GmEcJLb2O5ua2UtNodn6QCAWSulWyr2fhMw3MpdxuzIbtp1sKa0nIs+ABaEWzgSPFESqPeUR4waIkqZJ/LgjiKmjgiZhTHem3S0/2wu48ReTRq/TZdGwc9vCQp6zW7hydj7xU3eZZUE7OkKuL7Y9/8gpNeP62/zBVFY=
