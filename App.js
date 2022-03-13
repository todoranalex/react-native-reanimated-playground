import {NavigationContainer} from '@react-navigation/native';
import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import App from './Intro';

AppRegistry.registerComponent(appName, () => App);

export default App;
