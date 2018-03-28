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
	constructor() {
		super();
		this.state = {}
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div>
				<Segment inverted>
					<Menu inverted pointing secondary>
						<Menu.Item name='home' href="/">Home</Menu.Item>
						<Menu.Item name='projects' href="/projects">Projects</Menu.Item>
						<Menu.Item name='contacts' href="/contacts">Contacts</Menu.Item>

						<Menu.Menu position='right'>
							<Dropdown item text='Utente'>
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
	console.log(currentUser);
	currentUser.getSession(function(err, session) {
		if (err) {
			window.location.href = "/login";
		}
		if (session.isValid()) {
			ReactDOM.render(
				<Shared />,
				document.getElementById('header-app')
			);
		}
	});
}