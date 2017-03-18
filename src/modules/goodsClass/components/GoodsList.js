import React, { Component } from 'react';
import { Flex, List, Grid } from 'antd-mobile';
import { Img } from 'commonComponent';

class GoodsList extends Component {

  onMenuChange = (item) => {
    alert(item);
  }

  render() {
    const { data } = this.props;
    const { advPosition, classCustomList } = data;
    console.log(data);

    if (!advPosition) {
      return null;
    }

    return <div>
      <div>
        <Img src={advPosition.advList[0].resUrl} style={{width:'100%',height:'2rem'}}></Img>
      </div>
      {
        classCustomList && classCustomList.map(customList => {
          const gridData = customList.classCustomList.map(item => {
            return {
              icon: item.gcPic,
              text:item.gcName
            }
          });
          return <List renderHeader={() => customList.gcName}>
            <Grid data={gridData} columnNum={3} hasLine={false} />
          </List> 
        })
      }
    </div>
  }
}

export default GoodsList;
