import { fetch, common } from 'common';

export function queryClasslist() {
  return fetch.get('goods/api/classlist');
}
