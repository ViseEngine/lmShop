import { fetch, common } from 'common';

// 浏览店铺记录
export function storeBrowseSaveOrUpdate({ storeId }) {
  return fetch.get('/storeapi/storeBrowseSaveOrUpdate', {
    storeId
  });
}

// 店铺首页信息
export function storedetail({ storeId }) {
  return fetch.get('/storeapi/storedetail', {
    storeId
  });
}

// 关注店铺
export function storecollection({
  favType,
  goodsId,
  storeId
}) {
  return fetch.get('/storeapi/storecollection', {
    favType,
    goodsId,
    storeId,
  });
}

// 店铺商品
// http://testbbc.leimingtech.com/storeapi/storegoods
// order	desc
// orderField	
// sign	LOm2qqgbZcdA6WItNPGBA8/u2i2QJfDAIUo/ah7PTjJVKmIFBEYxyxUxx4NLn7AU4TR9EUYCYbIXmJX28Q5H9BBQpZGa7ychptseot33AM2SX0gIWtOjHsFN6xZVH5x7yXVdRICakX0NMMs76QpwSOb28mXbANBfbJ7Ft7KWew8=
// pageSize	20
// timestamp	1490670340469
// storeId	73947166753d454d8bc7c6e65a3c7267
// pageNo	1
// goodsName
// 关注店铺
export function storegoods({
  order,
  orderField,
  pageNo,
  pageSize,
  storeId,
  goodsName
}) {
  return fetch.get('/storeapi/storegoods', {
    order,
    orderField,
    pageSize,
    storeId,
    pageNo,
    goodsName
  });
}


// 上新
// http://testbbc.leimingtech.com/storeapi/storegoods
// timestamp	1490670860810
// storeId	73947166753d454d8bc7c6e65a3c7267
// sign	Zta9nRZN8AtK6zrr6Gz0T53s31qljmTadM7/XsvAY2QfvBotmiyoctUcd+xg2AUrAQ1PNVNsnZxlsLvxWTb0Ff/Qrmr1R7aDx/P4ac24KWmYAH5QbNdBvTO9W4oe+Xc1A62YT5VU7Dd4Wq2tnms88Zi7fOeDoPGIHTL9F/8hGag=
// goodsType	1

// 优惠券
// http://testbbc.leimingtech.com/storeapi/couponlist
// storeId	73947166753d454d8bc7c6e65a3c7267
