import { fetch, common } from 'common';

export function subToOrder({ cartId }) {
  return fetch.get('/cartapi/subToOrder', {
    cartId
  });
}
