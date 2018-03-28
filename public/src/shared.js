import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Segment, Menu, Dropdown } from 'semantic-ui-react'
import { CognitoUserPool, CognitoUser, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../utils/aws_consts'

class Shared extends React.Component {
	render() {
		var user = this.props.user;
		return (
			<div>
				<Segment inverted style={{ borderRadius: '0px', marginBottom: '40px', padding: '5px 15px' }}>
					<Menu inverted pointing secondary>
						<Menu.Item name='home' href="/">Home</Menu.Item>
						<Menu.Item name='projects' href="/projects">Projects</Menu.Item>
						<Menu.Item name='contacts' href="/contacts">Contacts</Menu.Item>

						<Menu.Menu position='right'>
							<Dropdown item text={user.signInUserSession.idToken.payload.email}>
								<Dropdown.Menu>
									<Dropdown.Item>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Menu>
					</Menu>
				</Segment>
			</div>
		);
	}
}

//Check logged user
const userPool = new CognitoUserPool(poolData);
let currentUser = userPool.getCurrentUser();

if (currentUser != null) {
	currentUser.getSession(function(err, session) {
		if (err) {
			window.location.href = "/login";
		}
		if (session.isValid()) {
			ReactDOM.render(
				<Shared user={currentUser} />,
				document.getElementById('header-app')
			);
		}
	});
}