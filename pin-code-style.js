import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const codePinStyles = StyleSheet.create({
	container: {
		height: 150,
		width: width - 30,
		backgroundColor: "#FFF"
	},
	containerPin: {
		width: width - 30,
		minHeight: 60,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 20
	},
	pin: {
    textAlign: "center",
    fontSize: 24
	},
	text: {
		textAlign: "center",
		fontSize: 20,
  },
	error: {
		textAlign: "center",
		color: "red",
		paddingTop: 10
	}
});
