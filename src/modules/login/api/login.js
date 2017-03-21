import { fetch, common } from 'common';

export function login({ username, password }) {
  return fetch.get('/loginapi/login', {
    username,
    password
  });
}

export function verifyCode({ mobile }) {
  return fetch.get('/floor/api/verifyCode', {
    mobile
  });
}

export function register({ name, password, mobile }) {
  return fetch.get('/memberapi/register', {
    name,
    password,
    mobile
  });
}

// http://testbbc.leimingtech.com/memberapi/register
// name = 13645165373 & password=123456 & timestamp=1490108163713
//   & sign=fJ8UxnB0AQO0t19olT9jqfybhS21Sm1yY3t3glc2OGE6iWeohiVvKSruTAzvEKhd9jSTa % 2BO% 2F6M3wdaH% 2FjSRBppkIODvV9DNzDoZPHGexe27882gi4QlcZnfmsdapuZH1cOff4nn4M8EZZ7zY9DcsHL73PXvQFmGX2hjH% 2BclIMus% 3D& mobile=13645165373
