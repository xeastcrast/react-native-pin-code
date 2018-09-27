import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import SVG, { Circle } from "react-native-svg";

import { codePinStyles } from "./pin-code-style";

class PrettyPin extends Component {
	constructor(props) {
		super(props);

		const codeLength = props.number || props.code.length;

		this.state = {
			error: "",
			number: codeLength,
			code: new Array(codeLength).fill(""),
			edit: null,
			reset: false,
			value: ""
		};

		this.clean = this.clean.bind(this);
		this.focus = this.focus.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		const codeLength = newProps.number || newProps.code.length;

		if (newProps.number !== this.props.number) {
			this.setState({
				number: codeLength,
				edit: null
			});
		}
	}

	clean() {
		this.setState(prevState => {
			return {
				code: new Array(prevState.number).fill(""),
				reset: true,
				value: ''
			};
		});
		this.focus();
	}

	focus() {
		// Check to ensure that input exists. This is important in the case of autofill.
		if (this.textInputsRefs) this.textInputsRefs.focus();
	}

	handleEdit(value) {
		this.setState({ value: value }, () => {
			console.log("Number", this.state.value);
		});
		// App pass a checkPinCode function

		if (this.props.checkPinCode) {
			this.props.checkPinCode(value, (success = true) => {
				// App say it's different than code
				if (!success) {
					this.setState({
						error: this.props.error,
						code: new Array(this.state.number).fill(""),
						reset: true
					});
				} else {
					// Is Okay !!!
					this.props.success();
					this.setState(prevState => ({
						code: value,
						reset: true
					}));
				}
			});
			return;
		}

		// // no checkPinCode function
		// // But it's different than code
		if (this.props.code !== value) {
			this.setState({
				error: this.props.error,
				code: new Array(this.state.number).fill(""),
				reset: true
			});
			return;
		}
	}

	render() {
		const {
			text,
			success,
			pinStyle,
			textStyle,
			errorStyle,
			obfuscation,
			containerStyle,
			containerPinStyle,
			passwordText,
			pinColor,
			...props
		} = this.props;

		const { value, number, reset, edit } = this.state;

		pins = [];
		// for (let index = 0; index < this.state.number; index++) {
		for (let i = 0; i < number; i++) {
			if (obfuscation) {
				pins.push(
					<View
						key={i}
						style={{
							paddingHorizontal: 14,
							paddingVertical: 18,
							opacity: i + 1 > value.length ? 0 : 1
						}}
					>
						<SVG width={25} height={25} viewBox="0 0 100 100">
							<Circle cx="50" cy="50" r="50" fill={pinColor} />
						</SVG>
					</View>
				);
			} else {
				pins.push(
					<View
						key={i}
						style={{
							paddingHorizontal: 14,
							paddingVertical: 18,
							opacity: i + 1 > value.length ? 0 : 1
						}}
					>
						<Text>{value[i]}</Text>
					</View>
				);
			}
		}

		const error = this.state.error ? (
			<Text style={[codePinStyles.error, errorStyle]}>
				{this.state.error}
			</Text>
		) : null;

		return (
			<View style={[codePinStyles.container, containerStyle]}>
				<Text style={[codePinStyles.text, textStyle]}>{text}</Text>

				{error}
				<View style={{ opacity: 0, height: 0 }}>
					<TextInput
						ref={ref => (this.textInputsRefs = ref)}
						onChangeText={text => this.handleEdit(text)}
						value={value}
						maxLength={number}
						returnKeyType={"done"}
						autoCapitalize={"sentences"}
						autoCorrect={false}
						autoFocus={true}
						{...props}
					/>
				</View>

				<TouchableOpacity onPress={this.focus}>
					<View
						style={[
							codePinStyles.containerPin,
							containerPinStyle,
							{
								borderBottomColor: pinColor,
								borderBottomWidth: 4
							}
						]}
					>
						{pins}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

PrettyPin.propTypes = {
	code: PropTypes.string,
	success: PropTypes.func.isRequired,
	number: PropTypes.number,
	checkPinCode: PropTypes.func,
	autoFocusFirst: PropTypes.bool,
	obfuscation: PropTypes.bool,
	passwordText: PropTypes.string,
	pinColor: PropTypes.string,
	pinStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
	containerPinStyle: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.number
	]),
	containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
	textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
	errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

PrettyPin.defaultProps = {
	code: "",
	number: 4,
	checkPinCode: null,
	autoFocusFirst: true,
	obfuscation: false,
	passwordText: "*",
	pinColor: "#000",
	text: "Pin code",
	error: "Bad pin code.",
	pinStyle: {},
	containerPinStyle: {},
	containerStyle: {},
	textStyle: {},
	errorStyle: {}
};

export default PrettyPin;
