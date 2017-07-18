import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        // do something to sign user in
        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password } } = this.props;

        return (
            <div className="container">
                <div className="center-div">
                <h3 className="form-heading">Sign In</h3>
                <hr/>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                <label>Email:</label>
                <input {...email} className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                <label>Password:</label>
                <input {...password} type="password" className="form-control"/>
                </fieldset>
                <div>
                {this.renderAlert()}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form : 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);
