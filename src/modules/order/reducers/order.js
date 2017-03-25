import { handleActions } from 'redux-actions';

const order = handleActions({
  ['init'](state, action) {
    const payload = action.payload
    const { addressList } = payload;
    let selectedAddress = null;
    if (addressList && addressList.length > 0) {
      selectedAddress = addressList[0]
    }
    return {
      ...state,
      ...payload,
      selectedAddress
    };
  },
  ['getPrice'](state, action) {
    const payload = action.payload
    return {
      ...state,
      priceData: payload
    };
  },
  ['addShipping'](state, action) {
    const payload = action.payload
    const { cartVoList } = state;
    cartVoList.map(shop => {
      shop.shipPrice = payload[shop.storeId]
    })
    return {
      ...state,
      shipData: payload
    };
  },
  ['changePd'](state, action) {
    const payload = action.payload
    return {
      ...state,
      ...payload
    };
  },
  ['selectPayType'](state, action) {
    const payload = action.payload
    return {
      ...state,
      paytype: payload
    };
  }
}, {
  selectedAddress: {},
  priceData: {
    conditionPrice: "0.0",
    couponPrice: "0.0",
    jfprice: 0,
    predepositAmount: "0.0",
    totalFreight: "0.0",
    totalGoodsPrice: "0.0",
    totalPrice: "0.0"
  },
  shipData: {},
  isPd: 1,
  freight: null,
  paytype: 1,
  couponId: null,
  invoiceId: null,
  addressList: [],
  cartVoList: [],
  couponCount: 0,
  couponMemberMap: {},
  memberAvailable: '0.0'
});

export default order;
