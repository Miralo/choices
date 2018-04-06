import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import axios from 'axios'
//He is a Html entities decode/encode library
import he from 'he'
import { Button, Modal, Form, TextArea, Card } from 'semantic-ui-react'

//Handle projects from server
get_projects = get_projects.replace(/&quot;/g,'"');
get_projects = JSON.parse(get_projects);

class Projects extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.createProject = this.createProject.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	createProject() {
		if(this.state.title != '') {
			axios.post('/projects/add', {title: this.state.title, description: this.state.description})
			.then(function (response) {
				Toastr.success('Progetto creato con successo!');
				setTimeout(function(){ location.reload() }, 2000);
			})
			.catch(function (error) {
				Toastr.error('Errore di connessione');
			});
		}
	}

	render() {
		let proj_list = this.props.projects;

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
				<Modal trigger={<Button color="teal">Aggiungi nuovo progetto</Button>} closeIcon>
					<Modal.Header>Aggiungi nuovo progetto</Modal.Header>
					<Modal.Content image>
						<Modal.Description>
						<Form>
							<Form.Field>
								<label>Nome del Progetto</label>
								<input name="title" placeholder='Es: Morte Nera' value={this.state.title} onChange={this.handleChange} />
							</Form.Field>
							<Form.Field>
								<TextArea name="description" placeholder='Descrizione' value={this.state.description} onChange={this.handleChange} />
							</Form.Field>
							<Button color="green" type='submit' onClick={this.createProject}>Crea Progetto</Button>
						</Form>
						</Modal.Description>
					</Modal.Content>
				</Modal>

				<Card.Group style={{marginTop: '50px'}}>
					{proj_list.map((project, index) =>
						<Card
							key={project.uid}
							href={'/projects/view/' + project.uid}
							header={project.title}
							meta={'Creato: ' + project.created_at}
							description={he.decode(project.description)}
						/>
					)}
				</Card.Group>
				
			</div>
		);
	}
}

ReactDOM.render(
	<Projects projects={get_projects}/>,
	document.getElementById('projects')
);