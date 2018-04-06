import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {}

		//this.handleChange = this.handleChange.bind(this);
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
			<h2 className="ui icon header center aligned">
				<i className="small chart bar outline icon"></i>
				<div className="content">
					Dashboard
					<div className="sub header">Sei nel quartiere sbagliato, yo!</div>
				</div>
			</h2>
		);
	}
}
 
ReactDOM.render(
	<Dashboard />,
	document.getElementById('dashboard')
);