import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const codePinStyles = StyleSheet.create({
	container: {
		height: 150,
		width: '100%',
		backgroundColor: "#FFF",
		paddingHorizontal: 10
	},
	containerPin: {
		width: '100%',
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
