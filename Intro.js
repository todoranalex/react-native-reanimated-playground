import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Button} from 'react-native';
import ListRemove from './ListRemove';
import ScrollEffects from './ScrollEffects';
const Intro = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          style={{height: 24, width: 48}}
          onPress={() => {
            navigation.navigate('ListRemove');
          }}
          title={'Remove element from list with animation'}></Button>
        <Button
          style={{height: 24, width: 48}}
          onPress={() => {
            navigation.navigate('ScrollEfects');
          }}
          title={'Animate scrollview elements'}></Button>
      </View>
    </>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Intro} />
        <Stack.Screen name="ListRemove" component={ListRemove} />
        <Stack.Screen
          name="ScrollEfects"
          component={ScrollEffects}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
