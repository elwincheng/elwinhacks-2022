import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

const {width, height} = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
			<Text>YOOOO</Text>
			<Text>hello</Text>
			<Text>{width}</Text>
			<Text>{height}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
