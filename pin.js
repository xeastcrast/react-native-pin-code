import React from "react";
import SVG, { Circle } from "react-native-svg";
import { Text, NativeModules, LayoutAnimation, Animated } from "react-native";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Dot extends React.Component {
	state = {
		fade: new Animated.Value(0)
	};
	constructor(props) {
		super(props);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	static defaultProps = {
		obfuscation: false
	};

	show() {
		LayoutAnimation.spring();
		// console.log("Show", this.props.index);
		// LayoutAnimation.spring();
		// this.setState({ fade: 1 });
		Animated.sequence([
			Animated.spring(this.state.fade, {
				toValue: 1,
				speed: 50
			}).start()
		]);
	}

	hide() {
		LayoutAnimation.spring();
		// console.log("Hide", this.props.index);
		Animated.sequence([
			Animated.timing(this.state.fade, {
				toValue: 0,
				speed: 40
			}).start()
		]);
	}

	render() {
		const { pinColor, obfuscation, value, styles } = this.props;
		const { fade } = this.state;
		return (
			<Animated.View
				style={{
					paddingHorizontal: 8,
					paddingVertical: 10,
					transform: [{ scale: fade }]
				}}
			>
				{obfuscation ? (
					<SVG width={25} height={25} viewBox="0 0 100 100">
						<Circle cx={50} cy={50} r={50} fill={pinColor} />
					</SVG>
				) : (
					<Text style={[styles, { color: pinColor }]}>{value}</Text>
				)}
			</Animated.View>
		);
	}
}
