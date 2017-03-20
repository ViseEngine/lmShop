import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}

export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}

export function goodsdetail({ specId }) {
  return fetch.get('goods/api/goodsdetail', { specId });
}

export function GoodsBrowseSaveOrUpdate({ goodsId }) {
  return fetch.get('/memberapi/GoodsBrowseSaveOrUpdate', { goodsId });
}


// http://testbbc.leimingtech.com/cartapi/cartList
// timestamp=1489980531977&sign=sneOVKhukncoiHQh6s1LvGp2y9ftKNTBpRR8i2PYQ777xNobddxIfofyvrk4hw5g3Iyc99KiN8J%2Fc5DPqdPAdc2ocUINXSYKHqgMdipEOdE6M4FuQgaof3l2ENYhXyHVqwNRYmLzLTLVXWW%2FLUyd1arnU1RuDCoVDl7jS1gmWd0%3D

// http://testbbc.leimingtech.com/memberapi/centRecommendList
// timestamp=1489980531981&sign=ekbEVe7rTKE7YF7KT6%2BKWBudbtKMW93ogD8Ipv4ViXR0gwhsHI0PdDCKveQ%2B%2BLGrCwcg9Ik%2BQosGWBbqZ3O%2Bbkk4Qky8aFKU0qauHoio4neRTc0QLDkLPoz9MdsHGaVfYPaTjzAdnkxcVtSoeyp6z3kycrSjoeiHM4j61XKt65g%3D

// http://testbbc.leimingtech.com/memberapi/memberDetail
// timestamp=1489980531998&sign=pquGePovz1R4g9RJE%2FISzPMeNP7QXqQQPaVhDNKaEBMcx4aT0sIhBiDtT%2F23XXjR5y4AR70K5Os6MRprp9ZobYeGyavjYPkp06LRfhxmw9%2FkDIuGRbMpzikFIc0lYUtyTauJkLlOBBFiouX2Ti4CPe4hI42Qp9f4nBgNBCxJ4cQ%3D

// http://testbbc.leimingtech.com/goods/api/goodsdetail
// timestamp=1489980537208&specId=977b1be0ff274adeb4df1821b5f2e5f4&sign=VXY0%2BEcLuitwdz%2BUtXBgv0kndwe9%2BYfaD%2BL0YGqN%2FkpcQ5Wuvab2LvEtGbOdPXZXE%2FmlqyCs32kgDdxdaTHOiyVZYrlskkVvcZ7MmQnYnJQqOUXodu2VKsit3ng4Ymj%2BoOZeDUpbWug5yI37RJvaHPgWkxE05HOGEcvf6yfYeDg%3D


// http://testbbc.leimingtech.com/memberapi/GoodsBrowseSaveOrUpdate
// goodsId=5dab5b13b64648cd8051083f791953ad&timestamp=1489980537515&sign=Tdc5UxLK1uECjww6fEoGrO5LfKSz7DQZ8R23LQFZLUGiUNKcDoeFuUSYjMu%2FAERoU3tkDwZ5gXwIpiTcgk99KVX12kqenHeXh7R4LgrnnFkXtVv%2BFfyvSLeIenaopz4I%2Fgii1vRF8zdEHoQmyuNiEvSPrGXxzjSt6jzE5jd9sw8%3D
