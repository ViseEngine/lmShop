import React, { Component, PropTypes } from 'react'
import { common } from 'common';
import { NavBar, Icon, Flex } from 'antd-mobile';
import BottomBar from 'commonComponent/BottomBar';

import './appView.less';

class App extends Component {

  static childContextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
    backAction: PropTypes.func,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      actionTitle: '',
      actionClick: () => {}
    }
    this.backHandle = this.backHandle.bind(this)
  }

  getChildContext() {
    return {
      initAction: ({ title, action }) => {
        this.setState({
          actionTitle: title,
          actionClick: action
        })
      },
      clearAction: () => {
        this.setState({
          actionTitle: "",
          actionClick: null
        })
      },
      backAction: ({ url, callback }) => {
        this.setState({
          backUrl: url,
          backCallback: callback
        })
      }
    }
  }

  componentWillMount() {

  }

  searchClick = () => {
    // this.context.router.push('/search')
  }

  backHandle() {
    let { history, location } = this.props
    if (location.pathname == '/') {
      window.location.href = common.getFullUrl('/web/index.html')
      return
    }
    if (this.state.backUrl) {
      this.context.router.push(this.state.backUrl);
    } else if (this.state.backCallback) {
      this.state.backCallback();
    } else {
      this.context.router.goBack();
    }
  }

  showBottomBar = () => {
    let { showBottomBar } = this.props.children.props.route;
    if (!!showBottomBar) {
      return <BottomBar />;
    }

    return '';
  }

  showNavBar = () => {
    let { title, showTitle, showSearch } = this.props.children.props.route
    if (!title) {
      title = '111'
    }

    if (showTitle == undefined) {
      showTitle = true
    }

    const leftContent = []

    const rightContent = [
      // <Icon key="0" type="left" style={{ marginRight: '0.2rem' }} />,
      // <Icon key="1" type="ellipsis" />
    ];

    if (showTitle) {
      return (
        <NavBar leftContent={leftContent} mode="light"
          onLeftClick={() => this.backHandle()}
          rightContent={rightContent}>
          {title}
        </NavBar>
      )
      return null
    }
  }

  render() {
    return (
      <div id="container">
        {this.showNavBar()}
        {this.props.children}
        {this.showBottomBar()}
      </div>
    )
  }
}

export default App;
