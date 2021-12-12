import React from 'react';
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component';
import './signin.styles.scss'
import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    hanandleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password:''})
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'>Már van fiókom</h2>
                <span>Jelentkezzen be az email címével</span>

                <form>
                    <FormInput
                        type='email' 
                        name='email' 
                        label='Email' 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required>
                    </FormInput>
                    <FormInput 
                        type='password'
                        name='password'
                        label='Jelszó'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required>
                    </FormInput>
                    <div className='button-container'>
                        <CustomButton type='submit'>Bejelentkezés</CustomButton>
                        <CustomButton type='button' isGoogleSignin onClick={signInWithGoogle}>Google bejelentkezés</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;