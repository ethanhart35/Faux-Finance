import React, { Component } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './utils/history';

import Nav from "./components/Nav";
import HomePage from "./pages/HomePage/HomePage";
import Articles from "./pages/Articles/articles";
import Market from './pages/Market';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends Component {
  state = {
    // user: {
    //   name: "test",
    //   password: "nothanks",
    //   stockData: [
    //     {
    //       name: "appdatatest",
    //       quantity: "25",
    //       ticker: "PSM"
    //     }, {
    //       name: "appdatatest",
    //       quantity: "25",
    //       ticker: "PSM"
    //     }, {
    //       name: "appdatatest",
    //       quantity: "25",
    //       ticker: "PSM"
    //     },
    //   ]
    // }
  }

  userCallback(data) {
    this.setState({ user: data.user })
    console.log(this.state)
    // console.log(this.props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Nav />
        <Router history={history}>
          <div className="pt-5">
            <Route exact path='/' component={HomePage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/market' component={(props) => <Market user={this.state.user} />} />
            <Route exact path='/login' component={(props) => <Login callback={this.userCallback.bind(this)} />} />
            <Route exact path='/register' component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;