import { StyleSheet } from "react-native";
import { Colors } from "../../Constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    padding: 10,
    height: 100,
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  text: {
    fontSize: 18,
    fontStyle: "normal",
    color: Colors.TEXT,
    fontWeight: "normal",
  },

  touchableOpacity: {
    backgroundColor: Colors.TEXT,
  },
});

export default styles;
