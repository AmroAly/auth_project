import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    renderAlert() {
        if(this.props.errorMessage) {
            const errorList = (_.values(this.props.errorMessage)).map((value) => <li key={value[0]}>- {value[0]}</li>);

            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>
                    {errorList}
                </div>
            );
        }
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    render() {
        const { handleSubmit, fields: { email, name, password, passwordConfirm } } = this.props;
        return (
            <div className="container">
            <div className="center-div">
            <h3 className="form-heading">Sign Up</h3>
            <hr/>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
            <label>Email:</label>
            <input {...email} type="text" className="form-control"/>
            {email.touched && email.error &&<div className="error">{email.error}</div>}
            </fieldset>
            <fieldset className="form-group">
            <label>Name:</label>
            <input {...name} type="text" className="form-control"/>
            {name.touched && name.error &&<div className="error">{name.error}</div>}
            </fieldset>
            <fieldset className="form-group">
            <label>Password:</label>
            <input {...password} type="password" className="form-control"/>
            {password.touched && password.error &&<div className="error">{password.error}</div>}
            </fieldset>
            <fieldset className="form-group">
            <label>Password Confirmation:</label>
            <input {...passwordConfirm} type="password" className="form-control"/>
            {passwordConfirm.touched && passwordConfirm.error &&<div className="error">{passwordConfirm.error}</div>}
            </fieldset>
            <div>
            {this.renderAlert()}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign Up!</button>
            </form>
            </div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if(!formProps.email) {
        errors.email = 'Please enter an Email';
    }

    if(!formProps.name) {
        errors.name = 'Please enter your name';
    }

    if(!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'name', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
