import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Divider,
  Table,
  Modal
} from 'antd';

const FormItem = Form.Item;

const ModifyModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="公司信息修改"
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
              {getFieldDecorator('divisions', {
                initialValue: this.props.divisions,
                rules: [{ required: true, message: '请输入所属区域!' }],
              })(
                <Input placeholder="所属区域" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('jd', {
                initialValue: this.props.jd,
                rules: [{ required: true, message: '请输入经度!' }],
              })(
                <Input placeholder="经度" />
              )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('wd', {
                initialValue: this.props.wd,
                rules: [{ required: true, message: '请输入纬度！'}]
              })(
                <Input placeholder="纬度" />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class Company extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'company/queryInfo'
    })
  }

  state = {
    visible: false,
    singleData: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          name: values.name,
          divisions: values.divisions,
          jd: +values.jd,
          wd: +values.wd,
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'company/addInfo',
          payload: value,
        })
      }
    });
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

  handleDelete = (ID) => {
    this.props.dispatch({
      type: 'company/deleteInfo',
      payload: ID
    })
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
        divisions: values.divisions,
        jd: +values.jd,
        wd: +values.wd,
      }
      this.props.dispatch({
        type: 'company/updateInfo',
        payload: modifyInfo
      })
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }
  render() {
    console.log('visible>', this.state.visible);
    const { companyInfo, loading } = this.props;
    console.log('companyInfo>>>>>>', companyInfo);
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '公司名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属区域',
      dataIndex: 'divisions',
      key: 'divisions',
    }, {
      title: '经度',
      dataIndex: 'jd',
      key: 'jd',
    }, {
      title: '纬度',
      dataIndex: 'wd',
      key: 'wd',
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
            divisions={this.state.singleData.divisions}
            jd={this.state.singleData.jd}
            wd={this.state.singleData.wd}
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
              rules: [{ required: true, message: '请输入公司名!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="公司名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('divisions', {
              rules: [{ required: true, message: '请输入所属区域!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="所属区域" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('jd', {
              rules: [{ required: true, message: '请输入经度!' }],
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="经度" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('wd', {
              rules: [{ required: true, message: '请输入纬度！'}]
            })(
              <Input style={{ marginLeft: '40px' }} placeholder="纬度" />
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
          dataSource={companyInfo.data}
          loading={loading}
        />
      </div>
    );
  }
}

Company = Form.create({})(Company);

export default connect(state => ({
  companyInfo: state.company.companyInfo,
  loading: state.loading.models.company
}))(Company)