import Animated, {LightSpeedOutRight, Layout} from 'react-native-reanimated';
import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

export default function AnimatedStyleUpdateExample(props) {
  const [views, setViews] = useState(
    Array.from({length: 10}).map(
      (a) => '#' + Math.floor(Math.random() * 16777215).toString(16),
    ),
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      {views.map((v, i) => {
        return (
          <Animated.View
            exiting={LightSpeedOutRight}
            layout={Layout.springify()}
            style={[
              {
                flex: 1,
                backgroundColor: v,
                justifyContent: 'center',
                alignItems: 'center',
              },
              // style,
            ]}
            key={i}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: undefined,
                width,
              }}
              onPress={() => {
                setViews([...views.filter((vv) => vv !== v)]);
              }}></TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}
