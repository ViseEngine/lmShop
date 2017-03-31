import { fetch, common } from 'common';

// 会员收藏信息
export function memberfavotites({
  type,
  pageno,
  pageSize
}) {
  return fetch.get('/memberapi/memberfavotites', {
    type,
    pageno,
    pageSize
  });
}

// 商品推荐
export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

// 浏览记录
export function goodsBrowseList({
  browseState, // 0为商品  1 店铺
  pageNo,
  pageSize
}) {
  return fetch.get('/memberapi/goodsBrowseList', {
    browseState,
    pageNo,
    pageSize
  });
}

// 删除浏览记录
export function delGoodsBrowse({ browseId }) {
  return fetch.get('/memberapi/delGoodsBrowse', {
    browseId
  });
}

// 积分
export function shopPointsLogList({
  pageNo,
  pageSize
}) {
  return fetch.get('/memberapi/shopPointsLogList', {
    pageNo,
    pageSize
  });
}

// 会员信息
export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}