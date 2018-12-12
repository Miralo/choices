import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../../utils/aws_consts'

const userPool = new CognitoUserPool(poolData);

class RegisterForm extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
		}

		this.RegisterUser = this.RegisterUser.bind(this);
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

	RegisterUser(event) {

		var attributeList = [];
 
		var dataName = {
			Name : 'name',
			Value : this.state.name
		};
		var attributeName = 
		new CognitoUserAttribute(dataName);
		
		attributeList.push(attributeName);
		
		var cognitoUser;
		userPool.signUp(this.state.email, this.state.password, attributeList, null, function(err, result){
			if (err) {
				Toastr.error(err);
				console.log(err);
				return;
			}
			cognitoUser = result.user;
			Toastr.success('Complimenti ' + cognitoUser.getUsername() + ', ti sei registrato correttamente!');
		});
	}

	render() {
		return (
			<div className="ui raised very padded text container segment">
				<form className="ui form">
					<div className="field">
						<label>Nome e Cognome</label>
						<input type="text" name="name" placeholder="es: Jon Snow" value={this.state.name} onChange={this.handleChange} />
					</div>
					<div className="field">
						<label>Email</label>
						<input type="text" name="email" placeholder="es: jon.snow@nightwatch.barrier"  value={this.state.email} onChange={this.handleChange} />
					</div>
					<div className="field">
						<label>Password</label>
						<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					</div>
					<div className="field">
						<div className="ui checkbox">
							<input type="checkbox" tabIndex="0" className="hidden" />
							<label>I agree to the Terms and Conditions</label>
						</div>
					</div>
					<button className="ui green button" type="button" onClick={this.RegisterUser}>Registrati</button>
				</form>
			</div>
		);
	}
}
  
ReactDOM.render(
	<RegisterForm />,
	document.getElementById('register')
);