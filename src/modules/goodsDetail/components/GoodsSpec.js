import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon } from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';

// import * as storeApi from 'common/api/store';

class GoodsSpec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // goodsSpecValueAll,
      // goodsSpec,
      // specName
    }
  }

  // {
  // 	"result": "1",
  // 	"msg": "成功",
  // 	"data": [{
  // 		"specId": "e43ed9c25a974f1bb9428fe5bce54868",
  // 		"num": "343",
  // 		"price": "4503.00"
  // 	}]
  // }


  renderHeader = () => {
    const { goodsDetailInfo } = this.props;

    return <div>
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute', right: 3, top: -5,
          }}
          onClick={() => this.props.onClose('cancel')}>
          <Icon type="cross" />
        </span>
      </div>
      <Flex style={{ height: '200px' }}>  
        <Flex.Item style={{flex:1}}>
          <Img src={goodsDetailInfo.goodsImage} style={{height:'200px'}}></Img>
        </Flex.Item>  
        <Flex.Item style={{flex:2}}>
          <div>{`¥${goodsDetailInfo.goodsSpec.specGoodsPrice}`}</div>
          <div>{goodsDetailInfo.goodsName}</div>
        </Flex.Item> 
      </Flex>
    </div>
  }

  render() {
    const { goodsDetailInfo } = this.props;
    if (!goodsDetailInfo) {
      return null;
    }
    // 获取规格属性
    const { goodsSpecValueAll, goodsSpec, specName } = goodsDetailInfo;
    // 当前选中的规格
    const { specGoodsSpec } = goodsSpec;

    return <div style={{ marginBottom: '1.1rem'}}>
      <List renderHeader={() => (this.renderHeader())}>
        {
          Object.keys(goodsSpecValueAll).map(key => {
            const values = goodsSpecValueAll[key]
            return <List.Item key={key}>
              <Flex direction='column' align='start'>
                <Flex.Item>{specName[key]}</Flex.Item>
                <Flex.Item>
                  {
                    values.map((value, index) => {
                      let isSelected = false;
                      if (Object.keys(specGoodsSpec).includes(value.spValueId)){
                        isSelected = true;
                      }
                      return <Tag key={index} selected={isSelected} style={{ marginLeft: '0.18rem' }}  >{value.spValueName}</Tag>
                    })
                  }
                </Flex.Item>  
              </Flex>
            </List.Item>
          })  
        }  
        <List.Item extra={<Stepper style={{ width: '100%', minWidth: '2rem' }} showNumber size="small" defaultValue={1} />}>数量</List.Item>
        <List.Item>库存:{goodsDetailInfo.goodsTotalStorage}</List.Item>
        
      </List>
      <CartBar></CartBar>
    </div>
  }
}

export default GoodsSpec;
