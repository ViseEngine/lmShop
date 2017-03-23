import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon } from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';

class SpecGroup extends React.PureComponent {
  render() {
    const { values, selectedValue, onChangeSpec } = this.props;
    console.log('selectedValue', selectedValue);
    return <div>
      {
        values.map((value, index) => {
          return <Tag onChange={() => onChangeSpec(value)}
            key={index} selected={selectedValue.includes(value.spValueId)}
            style={{ marginLeft: '0.18rem' }}>
            {value.spValueName}
          </Tag>
        })
      }
    </div>
  }
}

class GoodsSpec extends React.PureComponent {

  constructor(props) {
    super();
    console.log('props', props);
    this.state = {
      goodsSpecValueAll: props.goodsDetailInfo.goodsSpecValueAll,
      goodsSpec: props.goodsDetailInfo.goodsSpec,
      specName: props.goodsDetailInfo.specName,
      goodsId: props.goodsDetailInfo.goodsId,
      goodsName: props.goodsDetailInfo.goodsName,
      goodsImage: props.goodsDetailInfo.goodsImage
    }
  }

  renderHeader = () => {
    const { goodsImage, goodsSpec, goodsName } = this.state;
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
          <Img src={goodsImage} style={{height:'200px'}}></Img>
        </Flex.Item>  
        <Flex.Item style={{flex:2}}>
          <div>{`¥${goodsSpec.specGoodsPrice}`}</div>
          <div>{goodsName}</div>
        </Flex.Item> 
      </Flex>
    </div>
  }

  onChangeSpec = (spec) => {
    const { goodsSpec, goodsSpecValueAll } = this.state;
    // 当前选择的所有规则
    let currentSpecs = goodsSpec.specGoodsSpec;
    // 删除当前规则组的所有子选项
    const goodsSpecValueGroup = goodsSpecValueAll[spec.spId];
    // 只有1个规则项，不做处理
    if (goodsSpecValueGroup.length == 1) {
      // console.log(this.refs[`specGroup-${spec.spId}`]);
      const currentGroup = this.refs[`specGroup-${spec.spId}`];
      console.log(currentGroup);
      currentGroup.forceUpdate();
      return;
    } else {
      //  当前规则组 ，存在多个规则时 切换处理
      goodsSpecValueAll[spec.spId].forEach(item => {
        delete currentSpecs[item.spValueId]
      })
      // 添加当前规则到 已选择的规则
      currentSpecs[spec.spValueId] = spec.spValueName
      const specIds = Object.keys(currentSpecs).join()
      goodsDetailApi.getSpecByGoodsIdAndSpecIds({
        goodsId: goodsSpec.goodsId,
        specIds
      }).then(result => {
        if (result.result == 1) {
          const data = result.data[0]
          console.log(data);
          console.log(this.state.goodsSpec);
          // 更新组件相关数据
          // this.setState({
          //   goodsSpec: {

          //   }
          // })
          // 同步状态到外部页面
          this.props.onChangeSpec(currentSpecs, data);

          // num
          // :
          // "354"
          // price
          // :
          // "3888.00"
          // specId
          // :
          // "1f384703ebc746e38091d74911033ed0"

        }
      })
    }

  }

  onChangeNum = (num) => {
    this.props.onChangeBuyNum(num);
  }

  render() {
    console.log('GoodsSpec render');
    // const { goodsDetailInfo } = this.props;
    // if (!goodsDetailInfo) {
    //   return null;
    // }

    // 获取规格属性
    const {
      goodsSpecValueAll, // 所有的规格属性
      goodsSpec, // 当前选择的规格值  
      specName,
      goodsName,
      goodsImage,
    } = this.state;
    // 当前选中的规格
    const { specGoodsSpec } = goodsSpec;
    console.log(goodsSpec);

    return <div style={{ marginBottom: '1.1rem'}}>
      <List renderHeader={() => (this.renderHeader())}>
        {
          Object.keys(goodsSpecValueAll).map(key => {
            const values = goodsSpecValueAll[key]
            const selected = values.filter(value => {
              return Object.keys(specGoodsSpec).includes(value.spValueId)
            }).map(value => value.spValueId);
            
            return <List.Item key={key}>
              <Flex direction='column' align='start'>
                <Flex.Item>{specName[key]}</Flex.Item>
                <Flex.Item>
                  <SpecGroup ref={`specGroup-${key}`} specGoodsSpec={specGoodsSpec}
                    selectedValue={selected}  
                    values={values} onChangeSpec={this.onChangeSpec}></SpecGroup>
                </Flex.Item>  
              </Flex>
            </List.Item>
          })  
        }  
        <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber min={0}
            max={goodsSpec.specGoodsStorage}
            size="small"
            onChange={this.onChangeNum}
            defaultValue={this.props.buyCount} />
          }>数量</List.Item>
        <List.Item>库存:{goodsSpec.specGoodsStorage}</List.Item>
        
      </List>
      <CartBar></CartBar>
    </div>
  }
}

export default GoodsSpec;
