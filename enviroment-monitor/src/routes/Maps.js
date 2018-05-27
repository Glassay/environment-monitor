import React from 'react';
import { Cascader } from 'antd';
import { Map, Marker } from 'react-amap';

import options from '../assets/data/provinces';

export default class Maps extends React.Component {
  constructor() {
    // super();
  	super();
    this.markerEvents = {};
    this.state = {
    	position: {longitude: 120, latitude: 30},
      currentLocation: '点击地图',
      city: '保定',
      map: null,
    }
    const _this = this;
    this.map = null;
    this.marker = null;
    this.geocoder = null;
    this.mapEvents = {
      created: (map) => {
        const AMap = window.AMap
        console.log('map>>>>>>>', AMap);
        AMap.plugin('AMap.Geocoder',() => {
        _this.geocoder = new AMap.Geocoder({
            city: this.state.city//城市，默认：“全国”
        });
        })
      },
    	click(e){
      	const lnglat = e.lnglat;
      	_this.setState({
        	position: lnglat,
          currentLocation: 'loading...'
        });
        console.log('position>>>>', _this.state.position);
        _this.geocoder && _this.geocoder.getAddress(lnglat, (status, result) => {
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
    };
  }
  // searchAddress = (address) => {
  //   const AMap = window.AMap;
  //   AMap.plugin(['AMap.placeSearch'], function() {
  //     const placeSearch = new AMap.placeSearch({
  //       city: this.state.city,
  //     })
  //     placeSearch.search(address)
  //   })
  // }
  handleChange = () => {
    console.log('asdasdsa');
  }
  onChange = (value, selectedOptions) => {
    // const _this = this;
    // const AMap = window.AMap;
    // AMap.plugin(['AMap.placeSearch'], function() {
    //   const placeSearch = new AMap.placeSearch({
    //     city: selectedOptions,
    //     map: _this.state.map
    //   })
    //   placeSearch.search(this.state.city);
    // })
    // this.setState({
    //   city: selectedOptions[0].label
    // });
    console.log('city>>>>>.', this.state.city);
    console.log('position>>>>', this.state.position);
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
      <div style={{ position: 'relative'}}>
        <Cascader
          options={options}
          onChange={this.onChange}
          placeholder="请选择地区"
          style={{
            position: 'absolute',
            top: 20,
            left: 150,
            zIndex: 1,
          }}
        />
        <div style={{ width: '80%', height: 700, margin: 'auto' }}>
          <Map
            amapkey="66a0849fdd5dc5b3d2c5b40dcc067b5d"
            plugins={plugins}
            events={this.mapEvents}
            center={this.state.position}
          >
            <Marker position={this.state.position} raiseOnDrag={true} events={this.markerEvents} />
            <div className="location">{this.state.currentLocation}</div>
          </Map>
        </div>
      </div>
    );
  }
}
