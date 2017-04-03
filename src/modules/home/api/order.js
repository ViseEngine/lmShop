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

export function orderdetail({
  orderid
}) {
  return fetch.get('/orderapi/orderdetail', {
    orderid
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


// http://testbbc.leimingtech.com/orderapi/refundOrder
// refundAmount	158.00
// sign	aO6ElFJ/XdlU6xra9SuG0EvRQIv2wjPm4cRXW7lR92E/B50xToNCSyUSgEXeqhYGmAntazjdCsAm2GI+nmsL0s/asMEmJSRQpcEbO45JeJlFPCjftrlUAVtkke2zOSOZb4Y9sKjdLvfnK0+QOLkczqEQ0zOGY5a22iDPfkpC2dQ=
// imgUrl	/upload/img/store/goods/1491245264552.jpg
// buyerMessage	1111111
// orderGoodsId	8388de3f7a6f462b8bbff4173f644818
// orderId	b28c3b687b1541e8a4cdfcfe62671d25

// 退款申请
export function refundOrder({
  refundAmount,
  imgUrl,
  buyerMessage,
  orderGoodsId,
  orderId
}) {
  return fetch.post('/orderapi/refundOrder', {
    refundAmount,
    imgUrl,
    buyerMessage,
    orderGoodsId,
    orderId
  });
}

// 退货
// imgUrl	/upload/img/store/goods/1491245415292.jpg
// buyerMessage	11
// orderGoodsId	c81206ad33d04d9e9d13726b0456b6fd
// goodsNum	1
// orderId	9d486d55ae6c438c94da8600c3173076
export function returnOrder({
  imgUrl,
  buyerMessage,
  orderGoodsId,
  goodsNum,
  orderId
}) {
  return fetch.post('/orderapi/returnOrder', {
    imgUrl,
    buyerMessage,
    orderGoodsId,
    goodsNum,
    orderId
  });
}

// 换货
export function barterOrder({
  imgUrl,
  buyerMessage,
  orderGoodsId,
  goodsNum,
  orderId
}) {
  return fetch.post('/orderapi/barterOrder', {
    imgUrl,
    buyerMessage,
    orderGoodsId,
    goodsNum,
    orderId
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
