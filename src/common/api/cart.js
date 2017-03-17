import { fetch, common } from 'common';

export function getCartResult(cartList = [], isAll = true) {
  const params = {
    deviceNo: common.getDeviceNo(),
    orgId: common.getOrgId(),
    areaId: common.getAreaId(),
    app_version: common.getAppVersion(),
  }
  if (!isAll) {
    const data = cartList.map(item => {
      return {
        goodsId: item.goodsId,
        promotionId: item.promotionId,
        promotionType: item.promotionType,
        quantity: item.buyNum,
      }
    })
    params.data = JSON.stringify(data)
  }
  return fetch.get('/cart/listBriefCartByUserId', params);
}

/**
 * 添加购物车
 */
export function plusCart(goods, source = 'LIST') {
  let data = [{
    goodsId: goods.goodsId,
    promotionId: goods.promotionId,
    promotionType: goods.promotionType,
    action: 'PLUS_INCREMENT',
  }]
  const params = {
    deviceNo: common.getDeviceNo(),
    areaId: common.getAreaId(),
    orgId: common.getOrgId(),
    source: source,
    app_version: common.getAppVersion(),
    data: JSON.stringify(data)
  }
  return fetch.get('/cart/sync', params);
}

/**
 * 减少购物车商品
 */
export function minusCart(goods, source = 'LIST') {
  let data = [{
    goodsId: goods.goodsId,
    promotionId: goods.promotionId,
    promotionType: goods.promotionType,
    action: 'MINUS_INCREMENT',
  }]
  const params = {
    deviceNo: common.getDeviceNo(),
    areaId: common.getAreaId(),
    orgId: common.getOrgId(),
    source: source,
    app_version: common.getAppVersion(),
    data: JSON.stringify(data)
  }

  return fetch.get('/cart/sync', params);
}
