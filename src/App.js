import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from './components/sidenav'
import { Layout } from 'antd';
import HeaderBar from './components/header'
import Home from './containers/home'
import Search from './containers/search'
import SearchResult from './containers/search_result'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sidebar collapseStatus={this.state.collapsed}></Sidebar>
          <Layout className='site-layout'>
            <HeaderBar></HeaderBar>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search-location" component={Search} />
              <Route path="/search/result" component={SearchResult} />
              <Route render={() => <h1>404. Not Found</h1>} />
            </Switch>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;