import React, { Component } from 'react';

import './Button.css';

class Button extends Component{
	clickHandler(e){
		switch (this.props.button){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				this.props.numbersHandler(this.props.button);
				break;
			case 'AC':
			case '+/-':
			case '.':
				this.props.functionHandler(this.props.button);
				break;
			case '+':
			case '-':
			case '*':
			case '/':
			case '%':
			case '=':
				this.props.operationsHandler(this.props.button);
				break;
			default:
				console.log('Button.js: Something went wrong!!', e);
		}
	}

	render(){
		const buttonName = this.props.button;

		if (buttonName === 0){
			return(
				<button className="button button0" name={this.props.button} onClick={this.clickHandler.bind(this)} key={this.props.button}>
					{this.props.button}
				</button>
			);
		} else if (buttonName === 'AC' || buttonName === '+/-' || buttonName === '%'){
			return(
				<button className="button secondOperatorButton" name={this.props.button} onClick={this.clickHandler.bind(this)} key={this.props.button}>
					{this.props.button}
				</button>
			);
		} else if (buttonName >= 1 || buttonName <= 9 || buttonName === '.'){
			return(
				<button className="button" name={this.props.button} onClick={this.clickHandler.bind(this)} key={this.props.button}>
					{this.props.button}
				</button>
			);
		} else {
			return(
				<button className="button primaryOperatorButton" name={this.props.button} onClick={this.clickHandler.bind(this)} key={this.props.button}>
					{this.props.button}
				</button>
			);
		}
	}
};

export default Button;