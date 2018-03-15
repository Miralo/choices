import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../utils/aws_consts'

const userPool = new CognitoUserPool(poolData);

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '', 
		}

		this.AuthUser = this.AuthUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	AuthUser(event) {

		var authenticationData = {
			Username : this.state.email,
			Password : this.state.password,
		};
		var authenticationDetails = new AuthenticationDetails(authenticationData);
		
		var userData = {
			Username : this.state.email,
			Pool : userPool
		};
		var cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				window.location.href = "/dashboard";
				Toastr.success('Complimenti ' + result.getUsername() + ', ti sei registrato correttamente!');
			},
	
			onFailure: function(err) {
				alert(err);
			},
	
		});
	}

	render() {
		return (
			<form className="ui form">
				<div className="field">
					<label>Email</label>
					<input type="text" name="email" placeholder="es: jon.snow@nightwatch.barrier"  value={this.state.email} onChange={this.handleChange} />
				</div>
				<div className="field">
					<label>Password</label>
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
				</div>
				<button className="ui green button" type="button" onClick={this.AuthUser}>Accedi</button>
			</form>
		);
	}
}
  
ReactDOM.render(
	<LoginForm />,
	document.getElementById('login')
);