import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Provider } from "react-redux"
import { store } from "./src/app/store"

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Tabbi Ops Demo</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
