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

// 完成订单
export function finishorder({
  ordersn
}) {
  return fetch.get('/orderapi/finishorder', {
    ordersn
  });
}


// 文件上传
export function filesUpload({
  images
}) {
  return fetch.upload('/memberapi/filesUpload', {
    images
  });
}

// 提交回复
export function saveReviews({
  gevalIsAnonymous,
  gevalScore,
  gevalContent,
  sevalDeliverycredit,
  sevalDesccredit,
  recId,
  imgUrl,
  sevalServicecredit,
  orderSn
}) {
  return fetch.post('/reviews/api/saveReviews', {
    gevalIsAnonymous,
    gevalScore,
    gevalContent,
    sevalDeliverycredit,
    sevalDesccredit,
    recId,
    imgUrl,
    sevalServicecredit,
    orderSn
  });
}

// gevalIsAnonymous 0
// gevalScore 3.5
// gevalContent 1111111
// sign Vwf1hRvs9HX477nGvq / aHBenIU5voa5BFNi8ULZeCZOpHj1YS8211KYjtDX88tLBp0BVBBhx1XJwWvhZ9vAOQBMLHwRebNYmmbBW2kIhto4fll4Pewu / H + i / 8 B36XcAIXtJCgqAsHx8do9UAQhHjRFdsbTHJScNHIzMxZxD6psA =
//   sevalDeliverycredit 3.5
// timestamp 1491211778232
// sevalDesccredit 3.5
// recId 44 cb7134f283413d88fcb7ef09bdc64f
// imgUrl / upload / img / store / goods / 1491211778335. jpg, /upload/img / store / goods / 1491211778347. jpg
// sevalServicecredit 0.0
// orderSn 20170401162802857
