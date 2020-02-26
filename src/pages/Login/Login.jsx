import React from 'react';
import styles from './Login.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = props => {
    return (
        <main className={styles.Login}>
            <h1>Login</h1>
            <LoginForm />
        </main>
    );
};

export default Login;
