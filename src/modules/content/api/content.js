import { fetch, common } from 'common';

// 资讯首页
export function index() {
  return fetch.get('/contentExhibitionApi/index');
}

// 文字列表
export function articleList({ acId }) {
  return fetch.get('/contentExhibitionApi/articleList', { acId });
}
