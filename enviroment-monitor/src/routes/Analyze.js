import React from 'react';
import { connect } from 'dva';
import {
  DatePicker,
  Button,
  Divider,
  Form,
  Cascader
} from 'antd';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

import companyName from '../assets/data/companyName';
import province from '../assets/data/province';
import devices from '../assets/data/devices';

const FormItem = Form.Item;

class Analyze extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'analyze/queryInfo'
  //   })
  // }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  dateChange = (value) => {
    console.log(value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          area: values.province[0],
          name: values.companyName[0],
          device: values.device[0],
          data_time: '2018-05-29'
        }
        console.log('Received values of form: ', value);
      }
    });
  }
  render() {
    const { infos } = this.props;
    const analize = [
      { time: "2008", average: 3 },
      { time: "2009", average: 4 },
      { time: "2010", average: 3 },
      { time: "2011", average: 4 },
      { time: "2012", average: 3.5 },
      { time: "2013", average: 5 },
      { time: "2014", average: 4.9 },
      { time: "2015", average: 6 },
      { time: "2016", average: 7 },
      { time: "2017", average: 9 },
      { time: "2018", average: 13 }
    ];

    const scale = {
      time: {
        alias: '年份'
      },
      average: {
        alias: '电流平均值'
      }
    };
    
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{ marginTop: 20, height: 100 }}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('province', {
              rules: [{ required: true, message: '请选择省份!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={province} placeholder="选择区域" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '请选择公司名!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={companyName} placeholder="选择公司名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('device', {
              rules: [{ required: true, message: '请选择设备名!' }],
            })(
              <Cascader style={{ marginLeft: '40px' }} options={devices} placeholder="选择设备名" />
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('date', {
              rules: [{ required: true,  message: '请选择日期！'}]
            })(
              <DatePicker
                style={{ marginLeft: '40px' }}
                placeholder="选择日期"
              />
            )}
          </FormItem>
          <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
          </FormItem>
        </Form>
        <Divider />
        <Chart height={400} data={analize} scale={scale} forceFit>
          <Axis name="time" title={true} />
          <Axis name="average" title={true} />
          <Tooltip crosshairs={{type : "y"}}/>
          <Geom type="line" position="time*average" size={2} />
          <Geom type='point' position="time*average" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
        </Chart>
      </div>
    );
  }
}

Analyze = Form.create({})(Analyze);

export default connect(state => ({
  infos: state.analyze.infos
}))(Analyze);
