import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import _ from "lodash";
import Pin from "./pin";
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
      value: "",
      previousLength: 0
    };

    this.pin = [];
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

  renderPins() {
    const { obfuscation, pinColor, number } = this.props;
    const { value } = this.state;
    return value.split('').map((val, key) => (
      <View key={key}>
        <Pin
          obfuscation={obfuscation}
          ref={ref => (this.pin[key] = ref)}
          pinColor={pinColor}
          index={key}
          value={value}
          styles={codePinStyles.pin}
        />
      </View>
    ));
  }

  clean() {
    this.setState(prevState => {
      return {
        code: new Array(prevState.number).fill(""),
        reset: true,
        value: "",
        previousLength: 0
      };
    }, this.focus);

    for (let i = 0; i < this.state.number; i++) {
      // this.pin[i].hide();
      setTimeout(this.pin[i].hide, 400);
    }
  }

  focus() {
    // Check to ensure that input exists. This is important in the case of autofill.
    if (this.textInputsRefs) this.textInputsRefs.focus();
  }

  handleEdit(value) {
    if (value.length > this.state.previousLength) {
      let ref = this.pin[value.length - 1];
      ref.show();
      ref.sneak();
      if (value.length > 0) {
        this.pin[this.state.previousLength].unSneak();
      }
    } else {
      this.pin[this.state.previousLength].hide();
    }
    this.setState(
      {
        value: value,
        previousLength: value.length > 0 ? value.length - 1 : 0,
        error: false
      },
      () => {
        console.log("Value length", value.length);
        console.log("Previous length", this.state.previousLength);
      }
    );
    // // App pass a checkPinCode function

    if (this.props.checkPinCode) {
      this.props.checkPinCode(value, (success = true) => {
        // App say it's different than code
        if (!success) {
          if (this.props.fail) {
            this.props.fail();
          }
          this.setState({
            error: this.props.error,
            code: new Array(this.state.number).fill(""),
            reset: true
          });
        } else {
          // Is Okay !!!
          if (this.props.success) {
            this.props.success();
          }
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

    const error = this.state.error ? (
      <Text style={[codePinStyles.error, errorStyle]}>{this.state.error}</Text>
    ) : null;

    return (
      <View style={[codePinStyles.container, containerStyle]}>
        {!_.isEmpty(text) && (
          <Text style={[codePinStyles.text, textStyle]}>{text}</Text>
        )}
        {error}
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
            {this.renderPins()}
          </View>
        </TouchableOpacity>
        <View style={{ opacity: 0, height: 0, margin: 0, padding: 0 }}>
          <TextInput
            ref={ref => (this.textInputsRefs = ref)}
            onChangeText={text => this.handleEdit(text)}
            value={value}
            maxLength={number}
            returnKeyType={"done"}
            autoCorrect={false}
            autoFocus={true}
            {...props}
          />
        </View>
      </View>
    );
  }
}

PrettyPin.propTypes = {
  code: PropTypes.string,
  success: PropTypes.func,
  fail: PropTypes.func,
  number: PropTypes.number,
  checkPinCode: PropTypes.func,
  autoFocusFirst: PropTypes.bool,
  obfuscation: PropTypes.bool,
  passwordText: PropTypes.string,
  pinColor: PropTypes.string,
  pinStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  containerPinStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
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
  text: "",
  error: "Bad pin code.",
  pinStyle: {},
  containerPinStyle: {},
  containerStyle: {},
  textStyle: {},
  errorStyle: {}
};

export default PrettyPin;
