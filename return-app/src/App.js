import Returns from './pages/Returns';
import LabelPrint from './pages/LabelPrint';
import ItemSelect from './pages/ItemSelect';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';

export class App extends Component {
  componentDidMount() {}

  render() {
    console.log('hey');
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Returns} />
          <Route
            path='/myreturns/:order'
            render={() =>
              !this.props.activeOrder ? <Redirect to='/' /> : <ItemSelect />
            }
          />
          <Route
            path='/printlabel'
            render={() =>
              !this.props.returnData ? <Redirect to='/' /> : <LabelPrint />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrder: state.activeOrder.userOrder,
  returnData: state.returnOrder.returnNo,
});

export default connect(mapStateToProps)(App);
