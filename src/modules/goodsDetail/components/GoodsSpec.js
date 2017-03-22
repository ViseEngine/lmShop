import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon } from 'antd-mobile';

class GoodsSpec extends React.PureComponent {
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

  onChangeSpec = (spec) => {
    const { goodsDetailInfo } = this.props;
    // 点击规格值处理
    let currentSpecs = goodsDetailInfo.goodsSpec.specGoodsSpec;
    goodsDetailInfo.goodsSpecValueAll[spec.spId].forEach(item => {
      delete currentSpecs[item.spValueId]
    })
    currentSpecs[spec.spValueId] = spec.spValueName
    // const specIds = Object.keys(currentSpecs).join();
    this.props.onChangeSpec(currentSpecs);
  }

  render() {
    const { goodsDetailInfo } = this.props;
    if (!goodsDetailInfo) {
      return null;
    }
    // 获取规格属性
    const {
      goodsSpecValueAll, // 所有的规格属性
      goodsSpec, // 当前选择的规格值  
      specName
    } = goodsDetailInfo;
    console.log(goodsSpec);
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
                      return <Tag onChange={()=>this.onChangeSpec(value)} key={index} selected={isSelected} style={{ marginLeft: '0.18rem' }}  >{value.spValueName}</Tag>
                    })
                  }
                </Flex.Item>  
              </Flex>
            </List.Item>
          })  
        }  
        <List.Item extra={
          <Stepper style={{ width: '100%', minWidth: '2rem' }} showNumber min={0} max={goodsSpec.specGoodsStorage} size="small" defaultValue={1} />
          }>数量</List.Item>
        <List.Item>库存:{goodsSpec.specGoodsStorage}</List.Item>
        
      </List>
      <CartBar></CartBar>
    </div>
  }
}

export default GoodsSpec;
