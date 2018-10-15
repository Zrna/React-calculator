import React, { Component } from 'react';

import Button from '../Components/Button/Button';

import './Calculator.css';

class Calculator extends Component {
	constructor(){
		super();
		this.state = {
			displayValue: '0',
			calcVals: []
		};
  }
  
	displayValueHandler(newValue){
    let displayValue = this.state.displayValue;
    
		if (displayValue.length >= 12){ // max numbers to display is 12
			return;
		} else if (displayValue === '0' || displayValue === 'Undefined!'){
 			this.setState({
				displayValue: newValue
			});
		} else if (displayValue.charAt(0) === '-' && displayValue.charAt(1) === '0') { // allows user to add "-" while displayed value is 0
			this.setState({
				displayValue: `-${newValue}`
			});
		} else {
			this.setState({
				displayValue: displayValue + newValue
			});
		}
	}
	
	numbersHandler(number){
		const parsedNumber = number.toString();
		this.displayValueHandler(parsedNumber);
	}
  
	decimalDotHandler(){
    let displayValue = this.state.displayValue;
    
		if (displayValue.indexOf('.') === -1) { // if last digit is "."
			this.setState({
				displayValue: displayValue + '.'
			})
		} else {
			return;
		}
  }
  
	toggleSignHandler(){
    let displayValue = this.state.displayValue;
    const firstChar = displayValue.charAt(0);
    
		if (firstChar === '-'){
			this.setState({
				displayValue: displayValue.slice(1)
			});
		} else {
			this.setState({
				displayValue: '-' + displayValue
			});
		}
  }
  
	addOperationHandler(operation){
    const displayValue = this.state.displayValue;
    const currentValue = parseFloat(displayValue);
    
    const calc = {
      val: currentValue,
      sign: operation
    };

    let vals = [...this.state.calcVals];
    vals.push(calc);
    
		this.setState({
			displayValue: '0',
			calcVals: vals
		});
	}
  
	equallyHandler(operation){
    const displayValue = this.state.displayValue;
		const currentValue = parseFloat(displayValue);
		
		// in newValue later is saved value from state calcVals array
		// to get value -> newValue[i].val -> "i" in for loop (line 97)
		let newValue = [...this.state.calcVals];
    let result = 0;
    
		// add current value to array
		newValue.push({val: currentValue, sign: operation});

		// for first iteration, sets the result to the first entered number
		for (let i = 0; i < newValue.length; i++){
			if (i === 0){
				result = newValue[i].val;
			} else {
				// looking for previous iteration sign
				switch(newValue[i - 1].sign){
					case '+':
						console.log('result before operation', result);
						result += newValue[i].val;
						console.log('newValue[i].val', newValue[i].val);
						console.log('result after operation', result);
						break;
					case '-':
						result -= newValue[i].val;
						break;
					case '*':
						result *= newValue[i].val;
						break;
					case '/':
						result /= newValue[i].val;
            break;
          case '%':
						result = (result + newValue[i].val) / 100;
						break;
					default:
						console.log('Calculator.js: Something went wrong!');
				}
			}
    }
    
		// checking: isNaN, dividing with "0", decimal places
		if (isNaN(result)){
			result = 'Undefined!';
		} else if (result === Infinity || result === -Infinity){
      result = '∞';
    } else {
			result = result.toFixed(2); // round result to two decimal places
			result = result.toString();

			const lastThree = result.slice(-3); // check last three digits
			if (lastThree === '.00'){
				result = result.slice(0, -3); // cut ".00" to show result without decimal places (exp. 5.00 => 5)
				result = result.toString();
			}
    }
    
		this.setState({
			displayValue: result,
			calcVals: []
		});
  }

  deleteHandler(){
		this.setState({
			displayValue: '0',
			calcVals: []
		});
	}


	render(){
    const displayValue = this.state.displayValue;

		let numberKeys = [];
    for (let i = 9; i >= 0; i--) {
			numberKeys.push(<Button button={i} numbersHandler={this.numbersHandler.bind(this)} key={i} />);
    }
    
		return(
			<div className="calc-layout">
				<div className="calc-display">
					{displayValue}
				</div>
				<div className="calc-functions">
					<Button button="AC" functionHandler={this.deleteHandler.bind(this)} key="AC" />
					<Button button="+/-" functionHandler={this.toggleSignHandler.bind(this)} key="+/-" />
					<Button button="%" operationsHandler={this.addOperationHandler.bind(this)} key="%" />
					<Button button="/" operationsHandler={this.addOperationHandler.bind(this)} key="/" />
				</div>
				<div className="calc-numbers">
					{numberKeys}
					<Button button="." functionHandler={this.decimalDotHandler.bind(this)} key="." />
				</div>
				<div className="calc-operations">
					<Button button="*" operationsHandler={this.addOperationHandler.bind(this)} key="*" />
					<Button button="-" operationsHandler={this.addOperationHandler.bind(this)} key="-" />
					<Button button="+" operationsHandler={this.addOperationHandler.bind(this)} key="+" />
					<Button button="=" operationsHandler={this.equallyHandler.bind(this)} key="=" />
				</div>
			</div>
		);
	}
};

export default Calculator;