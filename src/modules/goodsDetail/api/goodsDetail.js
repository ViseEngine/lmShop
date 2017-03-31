import { fetch, common } from 'common';

export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}

export function goodsdetail({ specId }) {
  return fetch.get('goods/api/goodsdetail', { specId });
}

export function goodsBrowseSaveOrUpdate({ goodsId }) {
  return fetch.get('/memberapi/GoodsBrowseSaveOrUpdate', { goodsId });
}

// 获取规格
export function getSpecByGoodsIdAndSpecIds({ goodsId, specIds }) {
  return fetch.get('/goods/api/getSpecByGoodsIdAndSpecIds', { goodsId, specIds });
}

// 收藏
export function storecollection({ favType, goodsId, storeId }) {
  return fetch.get('/storeapi/storecollection', { favType, goodsId, storeId });
}

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}

// 评价列表
export function goodsEvaluteList({
  goodsId,
  gevalScore,
  gevalImg
}) {
  return fetch.get('/goods/api/goodsEvaluteList', {
    goodsId,
    gevalScore,
    gevalImg
  });
}

// 评价列表
// http://testbbc.leimingtech.com/goods/api/goodsEvaluteList
// 全部评论
// goodsId	5dab5b13b64648cd8051083f791953ad
// gevalScore	
// timestamp	1490924869691
// sign	TbMzBV5go4Td2FK/uWNCkWxbEKG7PUSTe9qDzvpBysFVMQ2LG5FFxBjeBUwZMlUwEVFfqdD/buKJAmD8uhdcXnTRMayVcO7Vjv1JytBr+ApKpQlWP7+P3zCMBvdKk/FCXSF3LRXqXjprhsTGc+dlqLLXXcT9bkomfqQKKJD1Zpo=
// gevalImg	1

// 好评
// goodsId	5dab5b13b64648cd8051083f791953ad
// gevalScore	5
// timestamp	1490924914560
// sign	PWRLiH67v4P6s+RFqgoo7+fnru8TotHJL5UuCf4mnMcDBGbmB+8uUWYhlHX4iIRxi5pUa0NvTdCtOglcoBlHAAK5P2VjkMDyQm0BUqxuM7zo4GUZDNc4Ts/UignXXh56PobbY173y0tEaQ1kAJghA8Tcu7QKMMLZoIfomwnS4xU=
// gevalImg	1

// 中评
// goodsId	5dab5b13b64648cd8051083f791953ad
// gevalScore	3
// timestamp	1490924949522
// sign	LHubfeqXkhY+AOeisRb4WTq3bCelenDo8vxC6SsY9JVjAjD5IUiLKQ3KflUhofCPJRf/2XajGVFBktD3/BG3YY1TGuASQnCBot/Xyj/eUZbEPEowYtHrwv/NjhRqAvpbdPb7agHL5ZBpwdHe97K67QqHpv2S8PQCMza7Q7YHtN0=
// gevalImg	1

// 差评
// goodsId	5dab5b13b64648cd8051083f791953ad
// gevalScore	1
// timestamp	1490924973002
// sign	UtHKLwGjoIER81rLf8rc6ED1OmB+0H890VUUcL74QGbxnBU0WT6PlcyQB4DssLSxU1evB8rZsnIOqdNi1SrMKTqRiSF/ZbdRm6XmMcApKvJdoMvD4U5hBzPYJPxnn1ppiPJdUbESo8C52UWWtEB/xMkqQ4kqzcl3FStmg/FBh38=
// gevalImg	1

// 晒图
// goodsId	5dab5b13b64648cd8051083f791953ad
// gevalScore	
// timestamp	1490924989318
// sign	NLtj74Gt+Il71lkEgRCudqmYQTL4/lpiYEBkdXdnfl2Mi5RJ0mySDFdokBm6i4ocARDZgbxhLANy1pUgsvrhEzeumdusJ+7ZK75+4o98+YPvCgOXH1m7af90SX4l9Cg0v3cZaZvQBZ4Me9Psj8DoyNXwO5D/RpL3AwqiLgri6os=
// gevalImg	0

// 购买咨询
export function goodsConsultList({
  goodsId
}) {
  return fetch.get('/goods/api/goodsEvaluteList', {
    goodsId
  });
}

// 保存咨询
export function saveConsult({
  goodsId,
  cgoodsName,
  consultContent
}) {
  return fetch.get('/goods/api/saveConsult', {
    goodsId,
    cgoodsName,
    consultContent
  });
}
