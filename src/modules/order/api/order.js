import { fetch, common } from 'common';

export function subToOrder({ cartId }) {
  return fetch.get('/cartapi/subToOrder', {
    cartId
  });
}

export function addShipping({ cartIds, cityId }) {
  return fetch.get('/cartapi/addShipping', {
    cartIds,
    cityId
  });
}

export function getPrice({
  isPd,
  freight,
  cartIds,
  couponId,
  cityId,
}) {
  return fetch.get('/cartapi/getPrice', {
    isPd,
    freight,
    cartIds,
    couponId,
    cityId,
  });
}
