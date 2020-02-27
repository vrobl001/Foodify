import React, { Component } from 'react';
import styles from './LoginForm.module.css';
import userService from '../../utils/userService';

class LoginForm extends Component {
    state = this.getInitialState();

    getInitialState() {
        return {
            email: '',
            password: '',
            error: ''
        };
    }

    isFormValid = () => {
        return this.state.email && this.state.password;
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (!this.isFormValid()) return;
        try {
            const { email, password } = this.state;
            await userService.login({ email, password });
            this.setState(this.getInitialState(), () => {
                this.props.handleSignupOrLogin();
                this.props.history.push('/restaurants');
            });
        } catch (error) {}
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <fieldset>
                    <legend>Login Form</legend>

                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <button disabled={!this.isFormValid()} type='submit'>
                        Login
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default LoginForm;
