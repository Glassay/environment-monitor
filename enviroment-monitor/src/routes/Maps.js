import React from 'react';
import { connect } from 'dva';
import { Cascader } from 'antd';
import { Map, Marker, Markers, InfoWindow } from 'react-amap';

import options from '../assets/data/provinces';
import company from '../assets/data/company';

class Maps extends React.Component {
  constructor() {
  	super();
    this.markerEvents = {};
    this.state = {
      markers: company,
    	position: { longitude: 115.464804, latitude: 38.874062},
      currentLocation: '点击地图',
      city: '保定',
      map: null,
      geocoder: '',
      visible: false,
      currentMarker: '',
      currentPosition: '',
      currentCompany: '',
      companyInfo: ''
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
    };
    this.markersEvents = {
      click: (e, index) => {
        console.log('index????', index);
        console.log('坐标>>>>>', index.F.extData.position);
        console.log('公司名称', index.F.extData.companyName);
        this.setState({
          visible: !this.state.visible,
          currentPosition: {
            longitude: index.F.extData.position.longitude,
            latitude: index.F.extData.position.latitude
          },
          currentCompany: index.F.extData.companyName
        })
      }
    }
    this.windowEvents = {
      created: (iw) => {console.log(iw)},
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'map/queryInfo'
    })
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible
    })
    console.log('visible++++', this.state.visible);
  }

  handleChange = () => {
    console.log('asdasdsa');
  }

  onChange = (value, label) => {
    const _this = this
    const AMap = window.AMap
    console.log('windowMap', AMap);
    console.log('balel>>>>>>', label[0].label);
    AMap.plugin(['AMap.Geocoder'],function(){
      const geocoder = new AMap.Geocoder({
          country:'中国',
          map: _this.state.map
      })
      geocoder.getLocation(label[0].label, function(status, result) { 
          console.log('result>>>>', result); // 拿到正向地理编码
          console.log('status>>>>', status);
          if (status === 'complete' && result.info === 'OK') {
              console.log('横坐标：', result.geocodes[0].location.lng);
              console.log('纵坐标：', result.geocodes[0].location.lat);
              _this.setState({
                  geocodes: result.geocodes[0].location,
                  position: {
                    longitude: result.geocodes[0].location.lng,
                    latitude: result.geocodes[0].location.lat
                  }
              })
          }
      });
    });
    // console.log('city>>>>>.', this.state.city);
    // console.log('position>>>>', this.state.position);
  }

  render() {
    const { maps } = this.props;
    // console.log('companies>>>>', maps);
    // console.log('编码', this.state.geocodes);
    // console.log('单个信息', this.state.currentMarker);
    // console.log('currentLocation', this.state.currentLocation);
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
    const windows = `
      <div>
        <h4>公司名称：</h4>
        <p>${this.state.currentCompany}</p>
      </div>
    `;
    const styleCenter = {
      background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px'
    }
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
            <Markers
              markers={maps}
              events={this.markersEvents}
            />
            <Marker
              position={this.state.position}
              raiseOnDrag={true}
              events={this.markerEvents}
            >
              <div style={styleCenter} />
            </Marker>
            <InfoWindow
              position={this.state.currentPosition}
              events={this.windowEvents}
              content={windows}
              isCustom={false}
              visible={this.state.visible}
            />
            {/* <div className="location">{this.state.currentLocation}</div> */}
          </Map>
          {/* <button onClick={() => this.toggleVisible()}>显示</button> */}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  maps: state.map.maps
}))(Maps);
