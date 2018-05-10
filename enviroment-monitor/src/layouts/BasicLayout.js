import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './BasicLayout.less';
import Map from '../routes/Map';
import Analyze from '../routes/Analyze';
import Apply from '../routes/Apply';
import Configuration from '../routes/Configuration';
import LimitOrder from '../routes/LimitOrder';
import Query from '../routes/Query';
import Status from '../routes/Status';

const { Header, Content, Footer } = Layout;


class BasicLayout extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return(
      <Layout>
        <Header className={styles.header}>
          <span className={styles.title}>环保设备监测智能分析系统</span>
        </Header>
        <Content className={styles.content}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
            className={{ backgroundColor: '#08C299' }}
          >
            <Menu.Item key="1"><Link to="/map">地图</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/enviroment-status">环保状态</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/data-analyze">数据分析</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/data-query">数据查询</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/real-time-data-apply">实时数据申请</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/limit-order">限产命令</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/config-center">配置中心</Link></Menu.Item>
          </Menu>
          <Switch>
            <Route path="/map" render={() => <Map />} />
            <Route path="/enviroment-status" render={() => <Status />} />
            <Route path="/data-analyze" render={() => <Analyze />} />
            <Route path="/data-query" render={() => <Query />} />
            <Route path="/real-time-data-apply" render={() => <Apply />} />
            <Route path="/limit-order" render={() => <LimitOrder />} />
            <Route path="/config-center" render={() => <Configuration />} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copy Right ©2018 Created by Glassay
        </Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
