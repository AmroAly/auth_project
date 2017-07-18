import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {
    componentWillMount() {
        const token = localStorage.getItem('token');
        // If we have  a token, consider the user to be authenticated
        if(token) {
            this.props.authenticateUser();
        }
    }
  render() {
    return (
        <div>
            <Header />
            {this.props.children}
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(App);
