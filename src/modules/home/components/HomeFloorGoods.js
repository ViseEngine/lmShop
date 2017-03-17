import React, { Component } from 'react';
import { Grid, List, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';

class HomeFloorGoods extends React.PureComponent {

  render() {
    const { data } = this.props;

    return <List renderHeader={() => data.floorName }>
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
