import React from 'react';
import styles from './Signup.module.css'
import SignupForm from '../../components/SignupForm/SignupForm';

const Signup = (props) => {
    return(
        <main>
            <h1>Signup</h1>
            <SignupForm />
        </main>
    );
}

export default Signup;