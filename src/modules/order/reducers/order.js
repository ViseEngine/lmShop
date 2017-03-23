import { handleActions } from 'redux-actions';

const order = handleActions({
  ['init'](state, action) {
    const payload = action.payload
    const { addressList } = payload;
    let selectedAddress = null;
    if (addressList && addressList.length > 0) {
      selectedAddress = addressList[0]
    }

    return { ...state, ...payload, selectedAddress };
  }
}, {
  selectedAddress: {},

  addressList: [],
  cartVoList: [],
  couponCount: 0,
  couponMemberMap: {},
  memberAvailable: '0.0'
});

export default order;
