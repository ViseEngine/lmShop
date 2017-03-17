import React, { Component } from 'react';
import { Grid, List, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';


const Layout28 = () => {}

const Layout48 = () => {

}

const Layout33 = ({ goodsList }) => {
  return null;
}

class HomeFloorGoods extends React.PureComponent {

  renderHeader = (data) => {
    return data.floorName
  }

  render() {
    const { data } = this.props;
    console.log(data);
    // if(data){

    // }

    return <List renderHeader={() => this.renderHeader(data) }>
      <List.Item>
        <Flex>
          <Flex.Item>
            {/*<Img src={data}></Img>*/}
          </Flex.Item>
          <Flex.Item>2</Flex.Item>
        </Flex>
      </List.Item>
    </List>
  }
}

export default HomeFloorGoods;
