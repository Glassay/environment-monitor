import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Divider,
  Modal,
  Table
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
              {getFieldDecorator('deviceID', {
                initialValue: this.props.deviceID,
                rules: [{ required: true, message: '请输入设备ID!' }],
              })(
                <Input placeholder="设备ID" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('setupDate', {
                initialValue: this.props.setupDate,
                rules: [{ required: true, message: '请输入建立时间!' }],
              })(
                <Input placeholder="建立时间" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('deviceName', {
                initialValue: this.props.deviceName,
                rules: [{ required: true, message: '请输入设备名称!' }],
              })(
                <Input placeholder="设备名称" />
              )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('divisionID', {
                initialValue: this.props.divisionID,
                rules: [{ required: true, message: '请输入divisionID！'}]
              })(
                <Input placeholder="divisionID" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('deviceAddr', {
                initialValue: this.props.deviceAddr,
                rules: [{ required: true, message: '请输入设备地址！'}]
              })(
                <Input placeholder="设备地址" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('companyName', {
                initialValue: this.props.companyName,
                rules: [{ required: true, message: '请输入所属公司名！'}]
              })(
                <Input placeholder="所属公司" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('deviceType', {
                initialValue: this.props.deviceType,
                rules: [{ required: true, message: '请输入设备类型！'}]
              })(
                <Input placeholder="设备类型" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('lastDataTime', {
                initialValue: this.props.lastDataTime,
                rules: [{ required: true, message: '请输入lastDataTime！'}]
              })(
                <Input placeholder="lastDataTime" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('companyID', {
                initialValue: this.props.companyID,
                rules: [{ required: true, message: '请输入companyID！'}]
              })(
                <Input placeholder="companyID" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('CTRatio', {
                initialValue: this.props.CTRatio,
                rules: [{ required: true, message: '请输入CTRatio！'}]
              })(
                <Input placeholder="CTRatio" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('phaseACurrent', {
                initialValue: this.props.phaseACurrent,
                rules: [{ required: true, message: '请输入phaseACurrent！'}]
              })(
                <Input placeholder="phaseACurrent" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('phaseBCurrent', {
                initialValue: this.props.phaseBCurrent,
                rules: [{ required: true, message: '请输入phaseBCurrent！'}]
              })(
                <Input placeholder="phaseBCurrent" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('phaseCCurrent', {
                initialValue: this.props.phaseCCurrent,
                rules: [{ required: true, message: '请输入phaseCCurrent！'}]
              })(
                <Input placeholder="phaseCCurrent" />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class Devices extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'devices/queryInfo'
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
        deviceID: +values.deviceID,
        deviceName: values.deviceName,
        setupDate: values.setupDate,
        divisionID: +values.divisionID,
        deviceAddr: values.deviceAddr,
        companyName: values.companyName,
        deviceType: values.deviceType,
        lastDataTime: values.lastDataTime,
        companyID: +values.companyID,
        CTRatio: +values.CTRatio,
        phaseACurrent: +values.phaseACurrent,
        phaseBCurrent: +values.phaseBCurrent,
        phaseCCurrent: +values.phaseCCurrent
      }
      console.log('modifuInfo', modifyInfo);
      this.props.dispatch({
        type: 'devices/updateInfo',
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
        const value = {
          deviceID: +values.deviceID,
          deviceName: values.deviceName,
          setupDate: values.setupDate,
          divisionID: +values.divisionID,
          deviceAddr: values.deviceAddr,
          companyName: values.companyName,
          deviceType: values.deviceType,
          lastDataTime: values.lastDataTime,
          companyID: +values.companyID,
          CTRatio: +values.CTRatio,
          phaseACurrent: +values.phaseACurrent,
          phaseBCurrent: +values.phaseBCurrent,
          phaseCCurrent: +values.phaseCCurrent
        }
        this.props.dispatch({
          type: 'devices/addInfo',
          payload: value,
        })
      }
    });
  }

  handleDelete = (ID) => {
    console.log('ID+++++', ID);
    this.props.dispatch({
      type: 'devices/deleteInfo',
      payload: ID
    })
  }
  render() {
    const { deviceInfo, loading } = this.props;
    console.log('设备', deviceInfo);
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '设备ID',
      dataIndex: 'deviceID',
      key: 'deviceID',
    }, {
      title: '建立时间',
      dataIndex: 'setupDate',
      key: 'setupDate',
    }, {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    }, {
      title: 'divisionID',
      dataIndex: 'divisionID',
      key: 'divisionID',
    }, {
      title: '设备地址',
      dataIndex: 'deviceAddr',
      key: 'deviceAddr',
    }, {
      title: '所属公司',
      dataIndex: 'companyName',
      key: 'companyName',
    }, {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
    }, {
      title: 'lastDataTime',
      dataIndex: 'lastDataTime',
      key: 'lastDataTime',
    }, {
      title: 'companyID',
      dataIndex: 'companyID',
      key: 'companyID',
    }, {
      title: 'CTRatio',
      dataIndex: 'CTRatio',
      key: 'CTRatio',
    }, {
      title: 'phaseACurrent',
      dataIndex: 'phaseACurrent',
      key: 'phaseACurrent',
    }, {
      title: 'phaseBCurrent',
      dataIndex: 'phaseBCurrent',
      key: 'phaseBCurrent',
    }, {
      title: 'phaseCCurrent',
      dataIndex: 'phaseCCurrent',
      key: 'phaseCCurrent',
    }, {
      render: (text, ID) => (
        <span>
          <a onClick={() => this.showModal(ID)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(ID)}>删除</a>
          <ModifyModal
            wrappedComponentRef={this.saveFormRef}
            ID={this.state.singleData.ID}
            deviceID={this.state.singleData.deviceID}
            setupDate={this.state.singleData.setupDate}
            deviceName={this.state.singleData.deviceName}
            divisionID={this.state.singleData.divisionID}
            deviceAddr={this.state.singleData.deviceAddr}
            companyName={this.state.singleData.companyName}
            deviceType={this.state.singleData.deviceType}
            lastDataTime={this.state.singleData.lastDataTime}
            companyID={this.state.singleData.companyID}
            CTRatio={this.state.singleData.CTRatio}
            phaseACurrent={this.state.singleData.phaseACurrent}
            phaseBCurrent={this.state.singleData.phaseBCurrent}
            phaseCCurrent={this.state.singleData.phaseCCurrent}
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
            {getFieldDecorator('deviceID', {
              rules: [{ required: true, message: '请输入设备ID!' }],
            })(
              <Input placeholder="设备ID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('setupDate', {
              rules: [{ required: true, message: '请输入建立时间!' }],
            })(
              <Input placeholder="建立时间" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deviceName', {
              rules: [{ required: true, message: '请输入设备名称!' }],
            })(
              <Input placeholder="设备名称" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('divisionID', {
              rules: [{ required: true, message: '请输入divisionID！'}]
            })(
              <Input placeholder="divisionID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deviceAddr', {
              rules: [{ required: true, message: '请输入设备地址！'}]
            })(
              <Input placeholder="设备地址" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '请输入所属公司名！'}]
            })(
              <Input placeholder="所属公司" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('deviceType', {
              rules: [{ required: true, message: '请输入设备类型！'}]
            })(
              <Input placeholder="设备类型" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('lastDataTime', {
              rules: [{ required: true, message: '请输入lastDataTime！'}]
            })(
              <Input placeholder="lastDataTime" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyID', {
              rules: [{ required: true, message: '请输入companyID！'}]
            })(
              <Input placeholder="companyID" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('CTRatio', {
              rules: [{ required: true, message: '请输入CTRatio！'}]
            })(
              <Input placeholder="CTRatio" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phaseACurrent', {
              rules: [{ required: true, message: '请输入phaseACurrent！'}]
            })(
              <Input placeholder="phaseACurrent" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phaseBCurrent', {
              rules: [{ required: true, message: '请输入phaseBCurrent！'}]
            })(
              <Input placeholder="phaseBCurrent" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phaseCCurrent', {
              rules: [{ required: true, message: '请输入phaseCCurrent！'}]
            })(
              <Input placeholder="phaseCCurrent" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
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
          dataSource={deviceInfo.data}
          loading={loading}
        />
      </div>
    );
  }
}

Devices = Form.create({})(Devices);

export default connect(state => ({
  deviceInfo: state.devices.deviceInfo,
  loading: state.loading.models.users
}))(Devices);
