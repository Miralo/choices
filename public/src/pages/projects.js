import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import { Button, Modal } from 'semantic-ui-react'
import { CognitoUserPool, CognitoUser, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

import {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
} from '../../utils/aws_consts'

class Projects extends React.Component {
	constructor() {
		super();
		this.state = {}

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

	render() {
		return (
			<div>
				<h2 className="ui header">
					<i className="folder outline icon"></i>
					<div className="content">
						Progetti
						<div className="sub header">Consulta i tuoi progetti o creane uno nuovo</div>
					</div>
				</h2>
				<div className="ui divider"></div>
				<Modal trigger={<Button color="teal">Aggiungi nuovo progetto</Button>}>
					<Modal.Header>Select a Photo</Modal.Header>
					<Modal.Content image>
						<Modal.Description>
							<p>We've found the following gravatar image associated with your e-mail address.</p>
							<p>Is it okay to use this photo?</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>

				<div className="ui special cards" style={{marginTop: '30px'}}>
					<div className="ui card">
						<div className="content">
							<a className="header">Kristy</a>
							<div className="meta">
								<span className="date">Joined in 2013</span>
							</div>
							<div className="description">
								Kristy is an art director living in New York.
							</div>
						</div>
						<div className="extra content">
							<a>
								<i className="user icon"></i>
								22 Friends
							</a>
						</div>
					</div>
					
					<div className="ui card">
						<div className="content">
							<a className="header">Kristy</a>
							<div className="meta">
								<span className="date">Joined in 2013</span>
							</div>
							<div className="description">
								Kristy is an art director living in New York.
							</div>
						</div>
						<div className="extra content">
							<a>
								<i className="user icon"></i>
								22 Friends
							</a>
						</div>
					</div>

					<div className="ui card">
						<div className="content">
							<a className="header">Kristy</a>
							<div className="meta">
								<span className="date">Joined in 2013</span>
							</div>
							<div className="description">
								Kristy is an art director living in New York.
							</div>
						</div>
						<div className="extra content">
							<a>
								<i className="user icon"></i>
								22 Friends
							</a>
						</div>
					</div>
				</div>

				<div className="ui modal add-project">
					<i className="close icon"></i>
					<div className="header">
						Modal Title
					</div>
					<div className="image content">
						<div className="image">
							An image can appear on left or an icon
						</div>
						<div className="description">
							A description can appear on the right
						</div>
					</div>
					<div className="actions">
						<div className="ui button">Cancel</div>
						<div className="ui button">OK</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Projects />,
	document.getElementById('projects')
);