import React from 'react';
import {
  Form,
  Input,
  Button,
  Divider,
  Table,
  Modal
} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const ModifyModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="人员信息修改"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          maskStyle={{ opacity: 0.2 }}
        >
          <Form layout="vertical">
            <FormItem>
              {getFieldDecorator('ID', {
                initialValue: this.props.ID,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                initialValue: this.props.password,
                rules: [{ required: true, min: 6, message: '请输入最少六位密码!' }],
              })(
                <Input placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('real_name', {
                initialValue: this.props.real_name,
                rules: [{ required: true, message: '请输入真实姓名!' }],
              })(
                <Input placeholder="真实姓名" />
              )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('UserRole', {
                initialValue: this.props.UserRole,
                rules: [{ required: true, message: '请输入用户角色信息！'}]
              })(
                <Input disabled={true} placeholder="角色信息" />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class Users extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'users/queryInfo'
    })
  }

  state = {
    visible: false,
    singleData: '',
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      singleData: i
    })
    console.log('singleData>>>>>', i);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleCreate = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      const modifyInfo = {
        ID: values.ID,
        name: values.name,
        password: values.password,
        real_name: values.real_name,
      }
      console.log('modifuInfo', modifyInfo);
      this.props.dispatch({
        type: 'users/updateInfo',
        payload: modifyInfo
      })
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'users/addInfo',
          payload: values,
        })
      }
    });
  }

  handleDelete = (ID) => {
    console.log('ID+++++', ID);
    this.props.dispatch({
      type: 'users/deleteInfo',
      payload: ID
    })
  }

  render() {
    console.log('单个信息', this.state.singleData);
    const { userInfo, loading } = this.props;
    console.log('用户信息', userInfo);
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    }, {
      title: '真实姓名',
      dataIndex: 'real_name',
      key: 'real_name',
    }, {
      title: '角色信息',
      dataIndex: 'UserRole',
      key: 'UserRole',
    }, {
      render: (text, ID) => (
        <span>
          <a onClick={() => this.showModal(ID)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(ID)}>删除</a>
          <ModifyModal
            wrappedComponentRef={this.saveFormRef}
            ID={this.state.singleData.ID}
            name={this.state.singleData.name}
            password={this.state.singleData.password}
            real_name={this.state.singleData.real_name}
            UserRole={this.state.singleData.UserRole}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </span>
      ),
    }];
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 6, message: '请输入最少六位密码!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('real_name', {
              rules: [{ required: true, message: '请输入真实姓名!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="真实姓名" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('UserRole', {
              rules: [{ required: true, message: '请输入用户角色信息！'}]
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="角色信息" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '40px' }}
            >
              添加
            </Button>
          </FormItem>
        </Form>
        <Divider />
        <Table
          style={{ marginTop: 20 }}
          rowKey="ID"
          columns={columns}
          dataSource={userInfo.data}
          loading={loading}
        />
      </div>
    );
  }
}

Users = Form.create({})(Users);

export default connect(state => ({
  userInfo: state.users.userInfo,
  loading: state.loading.models.users
}))(Users);
