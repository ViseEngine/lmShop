import { fetch, common } from 'common';

// 优惠券列表
export function couponlist({ storeId }) {
  return fetch.get('/storeapi/couponlist', { storeId });
}
