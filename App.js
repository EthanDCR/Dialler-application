import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import UploadCSVScreen from './screens/UploadCSVScreen';




export default function App() {
  const buttonPress = () => {
    Alert.alert("Button was clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Welcome to the Dialer App</Text>
      <StatusBar style="auto" />

      <Button title="Upload CSV" onPress={buttonPress} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    paddingTop: 200,
  },
});
