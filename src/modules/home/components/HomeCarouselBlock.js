import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Carousel } from 'antd-mobile';
import './HomeCarouselBlock.less'

class HomeCarouselBlock extends Component {
  render() {
    const { data } = this.props;
    return <Carousel
      className="my-carousel" autoplay={true} infinite
      dots={false} 
    >
      {data.map((item,index) => (
        <a href={item.advUrl} key={index}><img src={`http://testbbcimage.leimingtech.com${item.resUrl}`} /></a>
      ))}
    </Carousel>
  }
}

export default withRouter(HomeCarouselBlock);
