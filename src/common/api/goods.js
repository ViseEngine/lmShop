import { fetch, common } from 'common';

export function queryGoodsListRecommend(goodsId) {
  const params = {
    goodsId: goodsId,
    orgId: common.getOrgId(),
    areaId: common.getAreaId(),
    app_version: common.getAppVersion(),
  }

  return fetch.get('/goodsRecommend/goodsListRecommend', params);
}
