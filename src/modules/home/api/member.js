import { fetch, common } from 'common';

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

export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

// 商品
// http://testbbc.leimingtech.com/memberapi/memberfavotites
// timestamp	1490782927341
// sign	qjVlnGM2cuQzjhIMit4vrgQpkdl1Knl6j8s0vkR4BwdvKHyJNvpMp2bYQs6os8ygEuQGsjoxBpxKjnn4HduWAms1ssNduMHbS4FPYObib8QvMgMY+qOhDJrnvnJbZkR1xUi3DLRUV45B39q9NkuWZUibUK9It04Y+1BMplqZTBo=
// type	1
// pageno	1
// pageSize	50

// 店铺
// http:/ / testbbc.leimingtech.com / memberapi / memberfavotites
// timestamp	1490782927341
// sign	qjVlnGM2cuQzjhIMit4vrgQpkdl1Knl6j8s0vkR4BwdvKHyJNvpMp2bYQs6os8ygEuQGsjoxBpxKjnn4HduWAms1ssNduMHbS4FPYObib8QvMgMY+qOhDJrnvnJbZkR1xUi3DLRUV45B39q9NkuWZUibUK9It04Y+1BMplqZTBo=
// type	2
// pageno	1
// pageSize	50


// http://testbbc.leimingtech.com/memberapi/centRecommendList
