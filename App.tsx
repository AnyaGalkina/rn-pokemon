import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {Main} from './src/screens/main/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <View style={styles.container}>
                    <Main/>
                    <StatusBar style="auto"/>
                </View>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
