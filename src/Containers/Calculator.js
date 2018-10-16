import React, { Component } from 'react';

import Button from '../Components/Button/Button';

import './Calculator.css';

class Calculator extends Component {

	state = {
		displayValue: '',
		result: '',
		operator: '',
	};

	numbersHandler = (number) => {
		let displayValue = this.state.displayValue;
		displayValue += number;
		this.setState({ displayValue });
	}

	decimalDotHandler = () => {
		let displayValue = this.state.displayValue;

		if (displayValue.indexOf('.') === -1) { // if last digit is "."
			displayValue += '.';
			this.setState({
				displayValue: displayValue
			});
		} else {
			return;
		}
	}

	toggleSignHandler = () => {
		let displayValue = this.state.displayValue;
		const firstChar = displayValue.charAt(0);

		if (firstChar === '-') {
			this.setState({
				displayValue: displayValue.slice(1)
			});
		} else {
			this.setState({
				displayValue: '-' + displayValue
			});
		}
	}

	calculateNumbers = (displayValue, result, operation) => {
		result = parseFloat(result);
		displayValue = parseFloat(displayValue);

		if (operation === '+') {
			result += displayValue;
		} else if (operation === '-') {
			result -= displayValue;
		} else if (operation === '*') {
			result *= displayValue;
		} else if (operation === '/') {
			result /= displayValue;
		} else if (operation === '%') {
			result = (100 * displayValue) / result;
		}
		
		result = result.toFixed(2);

		const lastThree = result.slice(-3); // check last three digits
		if (lastThree === '.00') {
			result = result.slice(0, -3); // cut ".00" to show a without decimal places (exp. 5.00 => 5)
			result = result.toString();
		} else if (result === 'Infinity' || result === '-Infinity') {
			result = '∞';
		}

		return result;
	}

	calculator = (operation) => {
		let displayValue = this.state.displayValue;
		let result = this.state.result;
		let operator = this.state.operator;

		if ((displayValue && result) || operation === "=") {
			result = this.calculateNumbers(displayValue, result, operator);
			displayValue = "";
			operator = "";
		} else if (!result) {
			result = displayValue;
			displayValue = "";
		}

		operator = operation;

		this.setState({ displayValue, result, operator })
	}

	equallyHandler = () => {
		this.calculator();
	}

	deleteHandler = () => {
		this.setState({
			displayValue: '',
			result: '',
			operator: ''
		});
	}

	render() {
		let displayValue = this.state.displayValue;
		let result = this.state.result;
		let operator = this.state.operator;

		if (result === '') {
			result = this.state.displayValue;
		} else if (result !== '' && operator !== '' && displayValue !== '') {
			result = this.state.displayValue;
		} else {
			result = this.state.result;
		}

		return (
			<div className="calc-layout">
				<div className="calc-display">
					{result}
				</div>
				<div className="calc-functions">
					<Button
						numbersHandler={this.numbersHandler}
						equallyHandler={this.equallyHandler}
						deleteHandler={this.deleteHandler}
						toggleSignHandler={this.toggleSignHandler}
						decimalDotHandler={this.decimalDotHandler}
						operations={this.calculator} />
				</div>
			</div>
		);
	}
};

export default Calculator;