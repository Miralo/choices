import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import axios from 'axios'
//He is a Html entities decode/encode library
import he from 'he'
import { Button, Modal, Form, TextArea, Card, Tab } from 'semantic-ui-react'

//Handle projects from server
get_project = get_project.replace(/&quot;/g,'"');
get_project = JSON.parse(get_project);

class Project extends React.Component {
	constructor() {
		super();
		this.state = {
			section_title: '',
			sections: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.createSection = this.createSection.bind(this);
		this.getSections = this.getSections.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	createSection(project_id) {
		if(this.state.section_title != '') {
			axios.post('/sections/add', {title: this.state.section_title, project_id: project_id})
			.then(function (response) {
				Toastr.success('Sezione creato con successo!');
				setTimeout(function(){ location.reload() }, 2000);
			})
			.catch(function (error) {
				Toastr.error('Errore di connessione');
			});
		}
	}

	getSections(project_id) {
		let _this = this;
		axios.get('/sections/get/' + project_id)
		.then(function (response) {
			if(response.data.length > 0) {
				_this.setState({
					sections: response.data
				})
			}
		})
		.catch(function (error) {
			Toastr.error('Errore di connessione');
		});
	}

	componentDidMount() {
		let project_data = this.props.project[0];

		this.getSections(project_data.uid);
	}

	render() {
		let project_data = this.props.project[0];
		let panes = [];
		
		if(this.state.sections.length > 0) {
			this.state.sections.map(section => {
				let temp_pane = { menuItem: section.title, render: () => <Tab.Pane>Ciao, ti trovi nella sezione {section.title}</Tab.Pane> }
				
				panes.push(temp_pane);
			});
		}

		return (
			<div>
				<h2 className="ui header">
					<i className="folder outline icon"></i>
					<div className="content">
						{project_data.title}
						<div className="sub header">{he.decode(project_data.description)}</div>
					</div>
				</h2>
				<div className="ui divider"></div>

				<Modal trigger={<Button color="teal">Aggiungi nuova sezione</Button>} closeIcon>
					<Modal.Header>Aggiungi nuova sezione</Modal.Header>
					<Modal.Content image>
						<Modal.Description>
						<Form>
							<Form.Field>
								<label>Nome della sezione</label>
								<input name="section_title" placeholder='Es: Slider, Lista prodotti, Homepage ecc...' value={this.state.section_title} onChange={this.handleChange} />
							</Form.Field>
							<Button color="green" type='submit' onClick={() => this.createSection(project_data.uid)}>Crea Sezione</Button>
						</Form>
						</Modal.Description>
					</Modal.Content>
				</Modal>

				{panes.length > 0 &&
					<Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
				}
			</div>
		);
	}
}

ReactDOM.render(
	<Project project={get_project}/>,
	document.getElementById('project')
);