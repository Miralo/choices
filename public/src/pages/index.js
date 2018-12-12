import React from 'react';
import ReactDOM from 'react-dom';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../../utils/aws_consts'

const userPool = new CognitoUserPool(poolData);
let currentUser = userPool.getCurrentUser();

if (currentUser != null) {
	currentUser.getSession(function(err, session) {
		if (err) {
			alert(err);
			return;
		}
		if (session.isValid()) {
			window.location.href = base_url + "dashboard";
		}
	});
}

class IndexPage extends React.Component {
	render() {
		return (
			<div className="ui raised very padded text container segment">
				Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf ancestors, which would have been pack hunters with complex body language.
				<br/><br/>
				Detto questo, vuoi loggarti o registrarti?<br/><br/>
				<a href="login" className="ui inverted green button">
					Login
				</a>
				<a href="register" className="ui inverted blue button">
					Registrati
				</a>
			</div>
		);
	}
}
  
ReactDOM.render(
	<IndexPage />,
	document.getElementById('index-app')
);