import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import axios from 'axios'
//He is a Html entities decode/encode library
import he from 'he'
import { Button, Modal, Form, TextArea, Card, Tab } from 'semantic-ui-react'
import SectionPane from '../components/section_pane'

//Handle projects from server
get_project = get_project.replace(/&quot;/g,'"');
get_project = JSON.parse(get_project);

class Project extends React.Component {
	constructor() {
		super();
		this.state = {
			section_title: '',
			sections: [],
			choice_title: '',
			choice_description: '',
			choice_committant: '',
			choice_source: '',
			choice_why: ''
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

	async getSections(project_id) {
		let _this = this;

		const response = await axios.get('/sections/get/' + project_id);
		
		if(response.data.length > 0) {
			this.setState({
				sections: response.data
			})
		}
	}

	createChoice(section_id) {
		if(this.state.choice_title != '') {
			axios.post('/choices/add', {
				title: this.state.choice_title,
				description: this.state.choice_description,
				committant: this.state.choice_committant,
				source: this.state.choice_source,
				why: this.state.choice_why,
				section_id: section_id
			})
			.then(function (response) {
				Toastr.success('Sezione creato con successo!');
				setTimeout(function(){ location.reload() }, 2000);
			})
			.catch(function (error) {
				Toastr.error('Errore di connessione');
			});
		}
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
				let temp_pane = { 
					menuItem: section.title, render: () => <Tab.Pane>

						<Modal trigger={<Button color="green">Aggiungi nuova scelta</Button>} closeIcon>
							<Modal.Header>Aggiungi nuova scelta</Modal.Header>
							<Modal.Content image>
								<Modal.Description>
								<Form>
									<Form.Field>
										<label>Titolo</label>
										<input name="choice_title" placeholder="Es: Cambiare grafica caption" value={this.state.choice_title} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<label>Committente</label>
										<input name="choice_committant" placeholder="Es: il capo" value={this.state.choice_committant} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<label>Provenienza</label>
										<input name="choice_source" placeholder="Es: Email, ultima riunione ecc.." value={this.state.choice_source} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<TextArea name="choice_why" placeholder='Motivo del cambiamento da eseguire' value={this.state.choice_why} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<TextArea name="choice_description" placeholder='Descrizione' value={this.state.choice_description} onChange={this.handleChange} />
									</Form.Field>
									<Button color="green" type='submit' onClick={() => this.createChoice(section.uid)}>Crea Scelta</Button>
								</Form>
								</Modal.Description>
							</Modal.Content>
						</Modal>

						<SectionPane section={section.uid}></SectionPane>

					</Tab.Pane>
				}
				
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

				<div style={{ marginTop: '50px' }}>
					{panes.length > 0 &&
						<Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
					}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Project project={get_project}/>,
	document.getElementById('project')
);