import { fetch, common } from 'common';

// 订单列表
export function orderlist({
  status,
  pageNo,
  orderType
}) {
  return fetch.get('/orderapi/orderlist', {
    status,
    pageNo,
    orderType
  });
}

// 取消订单
export function cancleorder({
  ordersn
}) {
  return fetch.get('/orderapi/cancleorder', {
    ordersn
  });
}


// 订单
// orderType	1
// status	20
// , 30,
// 40

// 售后
// orderType	2
// status	20,30,40
