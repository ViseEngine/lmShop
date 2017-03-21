import { fetch, common } from 'common';

export function login({ username, password }) {
  return fetch.get('/loginapi/login', {
    username,
    password
  });
}
