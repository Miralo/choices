import React from 'react';
import ReactDOM from 'react-dom';
import * as Toastr from 'toastr';
import axios from 'axios'
//He is a Html entities decode/encode library
import he from 'he'
import { Button, Form, TextArea, Accordion, Icon } from 'semantic-ui-react'

class SectionPane extends React.Component {
	constructor() {
		super();
		this.state = {
			choices: [],
			activeIndex: 0
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getChoices = this.getChoices.bind(this);
	}

	handleClick(e, titleProps) {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index
	
		this.setState({ activeIndex: newIndex })
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}	

	async getChoices(section) {
		let _this = this;

		const response = await axios.get('/choices/get/' +section);
		
		if(response.data.length > 0) {
			this.setState({
				choices: response.data
			})
		}
	}

	componentDidMount() {
		this.getChoices(this.props.section);
	}

	render() {
		const { activeIndex } = this.state;
		let choices = this.state.choices;
		return (
			<Accordion styled>
				{choices.map((choice, index) =>
					<div>
						<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
						<Icon name='dropdown' />
						What is a dog?
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 0}>
						<p>
							A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
							{' '}welcome guest in many households across the world.
						</p>
						</Accordion.Content>
					</div>
				)}
			</Accordion>
		);
	}
}

export default SectionPane;