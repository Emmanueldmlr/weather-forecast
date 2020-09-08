import React from 'react'
import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom'

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 8,
    },
};

export default class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            latitude : "",
            longitude: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value 
        })
        console.log(this.state)
    }
    
    render() {
        const{longitude,latitude} = this.state
        return (
            <React.Fragment>
                <Form
                    {...layout}
                    name="basic"
                    style={{ 'marginTop':'100px' }}
                >
                    <Form.Item
                        label="Latitude"
                        name="latitude"
                        rules={[
                            {
                                required: true,
                                message: 'Kindly Supply The latitude',
                            },
                        ]}
                    >
                        <Input name='latitude' type='number'  value={latitude} onChange={this.handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Longitude"
                        name="longitude"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type='number' name='longitude' value={longitude} onChange={this.handleChange} />
                    </Form.Item>
                    
                    <Form.Item {...tailLayout}>
                        {
                            latitude ==='' || longitude === '' ?
                                <Button type="primary"
                                    disabled
                                >
                                    Search
                                </Button>
                                :
                                <Link to={{ 
                                    pathname: '/search/result',
                                    search: `?longitude=${longitude}&latitude=${latitude}`
                                 }}>
                                    <Button type="primary"
                                    >
                                        Search
                                     </Button>
                                </Link>
                        }
                       
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}