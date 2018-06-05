import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './BasicLayout.less';
import Maps from '../routes/Maps';
import Analyze from '../routes/Analyze';
import Devices from '../routes/Devices';
import Company from '../routes/Company';
import Users from '../routes/Users';
import Query from '../routes/Query';
import Status from '../routes/Status';

const { Header, Content } = Layout;


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
            <Menu.Item key="1"><Link to="/main/map">地图</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/main/enviroment-status">环保状态</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/main/data-analyze">数据分析</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/main/data-query">数据查询</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/main/device-manage">设备管理</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/main/user-manage">用户管理</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/main/company-manage">公司管理</Link></Menu.Item>
          </Menu>
          <Switch>
            <Route path="/main/map" render={() => <Maps />} />
            <Route path="/main/enviroment-status" render={() => <Status />} />
            <Route path="/main/data-analyze" render={() => <Analyze />} />
            <Route path="/main/data-query" render={() => <Query />} />
            <Route path="/main/device-manage" render={() => <Devices />} />
            <Route path="/main/user-manage" render={() => <Users />} />
            <Route path="/main/company-manage" render={() => <Company />} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;
