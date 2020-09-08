import React from 'react'
import {AntCloudOutlined} from '@ant-design/icons'
import { Layout, Tabs, Card, Col, Row, Spin} from 'antd';
import {fetchWeatherProperties} from  '../utils/weatherapi'
const { Content } = Layout;
const { TabPane } = Tabs;

function DisplayResult({result, currentLocation}) {
    let i = 0
    return (
      <div className="site-card-wrapper">
        <Row>
          <Col span={8} offset={8}>
            <p style={{ fontSize: "30px", color: "blue" }}>
              Weekly Forecast For {currentLocation}
            </p>
          </Col>
        </Row>
        {result.weather === null ? (
          <p>{result.error}</p>
        ) : (
          <Row gutter={16}>
            {result.weather[currentLocation].map((condition) => (
              <Col span={3}>
                <Card title={`Day ${i++}`} bordered={false}>
                  <AntCloudOutlined style={{ fontSize: "50px", color: "blue" }} />
                  <p center style={{ fontSize: "15px" }}>
                    {condition.weather[0].main}
                  </p>
                  <p  style={{ fontSize: "11px", color: "#000080" }}>
                    {condition.weather[0].description}
                  </p>
                  <p  style={{ fontSize: "11px", color: "#000080" }}>
                   Cloud: {condition.clouds}
                  </p>
                  <p  style={{ fontSize: "11px", color: "#000080" }}>
                   Humidity: {condition.humidity}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
}

export default class  Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            location: 'Ife',
            weather: {},
            error:null
        }
        this.changeLocation = this.changeLocation.bind(this)
    }
    componentDidMount(){
        this.changeLocation(this.state.location)
    }
    changeLocation = key =>{
        this.setState({
            location:key,
            error:null
        })
        if(!this.state.weather[key]) {
            fetchWeatherProperties(key)
              .then((result) => {
                this.setState(({weather}) => ({
                  weather: {
                      ...weather,
                      [key]:result
                  }
                }));
                console.log(this.state)
              })
              .catch((error) => {
                this.setState({
                  error,
                });
              });
        }
        else{
            console.log("its h");
        }
    }
    render() {
        const locations = ['Ife', 'Lagos', 'Ibadan', 'Abuja']
        return (
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Tabs
              activeKey={this.state.location}
              onChange={this.changeLocation}
              centered
            >
              {locations.map((location) => (
                <TabPane tab={location} key={location}>
                  {!this.state.weather[location] && this.state.error === null ? (
                    <Spin size="large" style={{ marginLeft: "500px" }} />
                  ) : (
                    <DisplayResult
                      result={this.state}
                      currentLocation={location}
                    ></DisplayResult>
                  )}
                </TabPane>
              ))}
            </Tabs>
          </Content>
        );
    }
}