import React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react/cjs/react.production.min';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    color: '#F2A1AD',
    title: 'Dessert Recipes',
    description:
      'Hot or cold, our dessert recipes can turn an average meal into a memorable event',
    picture:
      'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season4/src/LiquidSwipe/assets/1.png?raw=true',
  },
  {
    color: '#FB3A4D',
    title: 'Healthy Foods',
    description:
      'Browse thousands of curated recipes from top chefs, each with detailled cooking instructions',
    picture:
      'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season4/src/LiquidSwipe/assets/2.png?raw=true',
  },
  {
    color: '#F2AD62',
    title: 'Easy Meal Ideas',
    description:
      'Browse our best themed recipes, cooking tips, and how-to food video & photos',
    picture:
      'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season4/src/LiquidSwipe/assets/3.png?raw=true',
  },
];

export default () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = withTiming(event.contentOffset.x, {
      duration: 750,
    });
  });
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      horizontal
      pagingEnabled
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      {slides.map((s, i) => {
        return <Slide key={s.title} index={i} slide={s} scrollX={scrollX} />;
      })}
    </Animated.ScrollView>
  );
};

const Slide = ({slide, index, scrollX}) => {
  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.75, 1.25, 0.75],
      Extrapolate.CLAMP,
    );
    const rotateZ = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [1, 0, 1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [50, 0, 50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: slide.color,
        },
      ]}>
      <Animated.Image
        style={[{height: 300, width: 300}, imageStyle]}
        source={{
          uri: slide.picture,
        }}
      />
      <Animated.View
        style={[{justifyContent: 'center', alignItems: 'center'}, textStyle]}>
        <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>
          {slide.title}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 16,
            paddingHorizontal: 16,
          }}>
          {slide.description}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};
