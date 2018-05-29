import React from 'react';
import { Map, InfoWindow } from 'react-amap';

export default class LimitOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      value: 1,
      position: {
        longitude: 120,
        latitude: 30
      },
      offset: [0, 0],
      size: {
        width: 200,
        height: 140,
      },
      currentLocation: ''
    }
    const _this = this
    _this.mapEvents = {
      create(m) {
        console.log('map实例', m);
      },
      created: (map) => {
        const AMap = window.AMap
        console.log('map>>>>>>>', AMap);
        AMap.plugin('AMap.Geocoder',() => {
        _this.geocoder = new AMap.Geocoder({
            city: this.state.city//城市，默认：“全国”
        });
        })
      },
      click(e) {
        console.log(e.lnglat);
        // alert(`你点击的坐标为：${e.lnglat}`);
        _this.setState({
          position: e.lnglat
        })
        _this.geocoder && _this.geocoder.getAddress(e.lnglat, (status, result) => {
        console.log(result);
        	if (status === 'complete'){
          	if (result.regeocode){
              _this.setState({
                currentLocation: result.regeocode.formattedAddress || '未知地点'
              });
            } else {
              _this.setState({
                currentLocation: '未知地点'
              });
            }
          } else {
            _this.setState({
                currentLocation: '未知地点'
            });
          }
        })
      }
    }
    this.windowEvents = {
      created: (iw) => {console.log(iw)},
    }
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible
    })
    console.log('visible++++', this.state.visible);
  }
  render() {
    console.log('坐标', this.state.position);
    console.log('真实位置', this.state.currentLocation);
    const html = `
      <div>
        <h4>当前位置</h4>
        <p>${this.state.currentLocation}</p>
      </div>
    `;
    return(
      <div style={{width: '499px', height: '400px'}}>
        <Map
          amapkey={'66a0849fdd5dc5b3d2c5b40dcc067b5d'}
          events={this.mapEvents}
        >
          <InfoWindow
            position={this.state.position}
            events={this.windowEvents}
            content={html}
            isCustom={false}
            visible={this.state.visible}
          />
          <button onClick={() => this.toggleVisible()}>显示</button>
        </Map>
      </div>
    );
  }
}
