import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks() {
        if(this.props.authenticated) {
            return (
                <div>
                    <li className="nav-item li-right">
                    <Link to="/signout" className="nav-link">
                    Sign Out
                    </Link>
                    </li>
                    <li className="nav-item li-center text-center">
                    <Link to="/feature" className="nav-link">
                    Feature
                    </Link>
                    </li>
                </div>
            );
        } else {
            return (
                <div>
                    <li className="nav-item li-right">
                        <Link to="/signin" className="nav-link">
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item li-right">
                        <Link to="/signup" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                </div>
            );
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light bg-faded">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                    My Project
                    </Link>
                    <ul className="nav navbar-nav">
                    {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}
export default connect(mapStateToProps)(Header);
