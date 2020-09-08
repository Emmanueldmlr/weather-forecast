import React from 'react'
import {AntCloudOutlined} from '@ant-design/icons'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import { Layout, Tabs, Card, Col, Row, Spin,Button} from 'antd';
import {fetchWeather} from  '../utils/weatherapi'
const { Content } = Layout;
const { TabPane } = Tabs;


function DisplayResult({result, currentLocation}) {
    let i = 0
    return (
      <div className="site-card-wrapper">
        <Row>
          <Col span={14} offset={5}>
            <p style={{ fontSize: "30px", color: "blue" }}>
              Weekly Forecast For {`Longitude: ${currentLocation.longitude} And Latitude: ${currentLocation.latitude}` }
            </p>
          </Col>
        </Row>
        {result.weather === null ? (
          <p>{result.error}</p>
        ) : (
          <Row gutter={16}>
            {result.weather.map((condition) => (
              <Col key={i} span={3}>
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
        <Row>
          <Col span={6} offset={11}>
            <Link to='/search-location'>
              <Button type="primary">
              Go Back
          </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
}

export default class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            longitude:null,
            latitude:null,
            weather: null,
            error:null
        }
        this.changeLocation = this.changeLocation.bind(this)
    }
    componentDidMount(){
        const {longitude,latitude} = queryString.parse(this.props.location.search)
        this.changeLocation(longitude,latitude)
    }
    changeLocation =(longitude,latitude)=>{
          fetchWeather(latitude,longitude)
            .then((result) => {
              this.setState({
                weather:result,
                longitude:longitude,
                latitude:latitude
              });
            })
            .catch((error) => {
              this.setState({
                error,
              });
            }); 
    }
    render() {
        const {latitude,longitude} = this.state
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
              centered
            >
              <TabPane tab={'Result'} key={`${latitude}  ${longitude}`}>
                {this.state.weather ===null && this.state.error === null ? (
                  <Spin size="large" style={{ marginLeft: "500px" }} />
                ) : (
                  <DisplayResult
                    result={this.state}
                    currentLocation={this.state}
                  ></DisplayResult>
                )}
              </TabPane>
            </Tabs>
          </Content>
        );
    }
}