import React from 'react';

import './Button.css';

const button = (props) => {
	const buttonValue = ['AC', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

	const buttonRender = buttonValue.map(btn => {
		let addFunction = () => props.numbersHandler(btn);
		let buttonClass = 'button ';

		if (btn === '+' || btn === '-' || btn === '*' || btn === '/') {
			addFunction = () => props.operations(btn);
			buttonClass += 'primaryOperatorButton';
		} else if (btn === '=') {
			addFunction = () => props.equallyHandler(btn);
			buttonClass += 'primaryOperatorButton';
		} else if (btn === 'AC') {
			addFunction = () => props.deleteHandler();
			buttonClass += 'secondOperatorButton';
		} else if (btn === '+/-') {
			addFunction = () => props.toggleSignHandler();
			buttonClass += 'secondOperatorButton';
		} else if (btn === '%') {
			buttonClass += 'secondOperatorButton';
		} else if (btn === '.') {
			addFunction = () => props.decimalDotHandler();
		} else if (btn === '0') {
			buttonClass += 'button0';
		} else {
			buttonClass = 'button';
		}

		return <button key={btn} className={buttonClass} onClick={addFunction}>{btn}</button>;
	});

	return (
		<React.Fragment>
			{buttonRender}
		</React.Fragment>
	);
};

export default button;