import React from 'react';
import ReactDOM from 'react-dom';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../utils/aws_consts'

const userPool = new CognitoUserPool(poolData);

class IndexPage extends React.Component {
	constructor() {
		super();
		this.state = {
			 
		}
	}

	render() {
		return (
			<p>
				Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf ancestors, which would have been pack hunters with complex body language.
				<br/><br/>
				Detto questo, vuoi loggarti o registrarti?<br/><br/>
				<a href="/login" class="ui inverted green button">
					Login
				</a>
				<a href="/register" class="ui inverted blue button">
					Registrati
				</a>
			</p>
		);
	}
}
  
ReactDOM.render(
	<IndexPage />,
	document.getElementById('index-app')
);