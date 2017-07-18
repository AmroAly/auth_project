import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }

    render() {
        if(!this.props.user) {
            return (
                <div className="center-div">
                    <h3>Loading...</h3>
                </div>
            );
        }
        const { first, second } = this.props.user;
        return (
            <div className="center-div">
                <p>
                    <strong>First Name:</strong> {first}
                </p>

                <p>
                    <strong>Last Name:</strong> {second}
                </p>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, actions)(Feature);
