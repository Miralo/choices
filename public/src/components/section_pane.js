import React from 'react';
import axios from 'axios'
//He is a Html entities decode/encode library
import he from 'he'
import { Accordion, Icon, List } from 'semantic-ui-react'

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

		const response = await axios.get(base_url + '/choices/get/' +section);
		
		this.setState({
			choices: response.data
		})
	}

	componentDidMount() {
		this.getChoices(this.props.section);
	}

	componentDidUpdate() {
		this.getChoices(this.props.section);
	}

	render() {
		const { activeIndex } = this.state;
		let choices = this.state.choices;
		let content = null;

		if(choices.length > 0) {
			content = <Accordion styled style={{ width: '100%', marginTop: '30px' }}>
				{choices.map((choice, index) =>
					<div key={index}>
						<Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
							<Icon name='dropdown' />
							{choice.title}
						</Accordion.Title>
						<Accordion.Content active={activeIndex === index}>
							<List horizontal>
								<List.Item>
									<Icon fitted name='user secret' />
									{choice.committant}
								</List.Item>
								<List.Item>
									<Icon fitted name='folder' />
									{choice.source}
								</List.Item>
								<List.Item>
									<Icon fitted name='question' />
									{choice.why}
								</List.Item>
							</List>
							
							<p style={{ marginTop: '10px' }}>
								{choice.description}
							</p>
						</Accordion.Content>
					</div>
				)}
			</Accordion>
		}

		return (
			<div className="choices-accordion">{content}</div>
		);
	}
}

export default SectionPane;