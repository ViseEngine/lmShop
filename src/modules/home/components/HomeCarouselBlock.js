import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Carousel } from 'antd-mobile';
import { Img } from 'commonComponent';

import './HomeCarouselBlock.less'

class HomeCarouselBlock extends Component {
  render() {
    const { data } = this.props;
    return <Carousel
        className="index-banner" autoplay={true} infinite dots={false}>
          {
            [...data,...data].map((item,index) => (
              <div key={`carousel-${index}`} className="banner">
            <a href={item.advUrl}><Img src={item.resUrl} style={{width:'8.4rem',height:'2rem'}} /></a>
              </div>
            ))
          }
      </Carousel>
  }
}

export default withRouter(HomeCarouselBlock);
