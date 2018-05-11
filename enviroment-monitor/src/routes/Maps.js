import React from 'react';
import { Map } from 'react-amap';

export default class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
      LngLat: ''
    }
  }
  handleChange = () => {
    console.log('asdasdsa');
    // this.setState({
    //   LngLat: 'beijing'
    // })
    // console.log(this.state.LngLat);
  }
  render() {
    const plugins = [
      'Scale',
      {
        name: 'ToolBar',
        options: {
          visible: true,
          onCreated(ins) {
            console.log(ins);
          },
        }
      }
    ]
    return(
      <div style={{ width: '80%', height: 700, margin: 'auto' }}>
        <Map
          amapkey="66a0849fdd5dc5b3d2c5b40dcc067b5d"
          plugins={plugins}
        />
      </div>
    );
  }
}
