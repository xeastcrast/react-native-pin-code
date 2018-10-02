import React from "react";
import SVG, { Circle } from "react-native-svg";
import {
	Text,
	View,
	NativeModules,
	LayoutAnimation,
	Animated
} from "react-native";

// const { UIManager } = NativeModules;

// UIManager.setLayoutAnimationEnabledExperimental &&
// 	UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Dot extends React.Component {
	state = {
		fade: 0,
		sneak: false
	};
	constructor(props) {
		super(props);
		// this.show = this.show.bind(this);
		// this.hide = this.hide.bind(this);
		this.sneak = this.sneak.bind(this);
		this.unSneak = this.unSneak.bind(this);
		this.sneakTimeout = setTimeout(() => {}, 0);
	}

	static defaultProps = {
		obfuscation: false
  };
  
  componentDidMount() {
    this.sneak()
  }

	sneak() {
		this.setState(
			{
				sneak: true
			},
			() => {
				console.log("Sneaking", this.props.value);
				this.sneakTimeout = setTimeout(
					() => this.setState({ sneak: false }),
					1500
				);
			}
		);
	}

	unSneak() {
		clearTimeout(this.sneakTimeout);
		this.setState({ sneak: false });
	}

	// show() {
	// 	this.setState({ fade: 1 });
	// }

	// hide() {
	// 	// console.log("Hide", this.props.index);
	// 	this.setState({ fade: 0 }, this.unSneak);
	// }

	render() {
		const { pinColor, obfuscation, value, styles } = this.props;
		const { fade, sneak } = this.state;
		return (
			<View
				style={{
					paddingHorizontal: 8,
					paddingVertical: 10,
				}}
			>
				{obfuscation && !sneak ? (
					<SVG width={25} height={25} viewBox="0 0 100 100">
						<Circle cx={50} cy={50} r={50} fill={pinColor} />
					</SVG>
				) : (
					<Text style={[styles, { color: pinColor }]}>{value}</Text>
				)}
			</View>
		);
	}
}
