import { Text, ImageBackground, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "@/global.css";
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef, useState, useEffect } from 'react';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const fadeAnim = useRef(new Animated.Value(1)).current; // For content fade
  const bgFadeAnim = useRef(new Animated.Value(1)).current; // For background crossfade
  const [prevImage, setPrevImage] = useState(onboarding[0].image);

  const currentItem = onboarding[activeIndex];

  // Animate content fade (slower)
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // 0.8s fade
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  // Animate background image crossfade (slower)
  useEffect(() => {
    bgFadeAnim.setValue(0);
    setPrevImage(currentItem.image);
    Animated.timing(bgFadeAnim, {
      toValue: 1,
      duration: 800, // 0.8s fade
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  return (
    <View className="flex-1 w-full h-full">
      {/* Previous background */}
      <ImageBackground
        source={prevImage}
        className="absolute w-full h-full"
      />

      {/* Fading in next background */}
      <Animated.Image
        source={currentItem.image}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: bgFadeAnim,
        }}
        resizeMode="cover"
      />

      <SafeAreaView className="flex h-full items-center justify-between">
        <View className="flex-1 w-full">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
            activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#6EBF36] rounded-full" />}
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {onboarding.map((item) => (
              <View key={item.id} className="flex-1 w-full items-center justify-center">
                <TouchableOpacity
                  onPress={() => {
                    router.replace('/(auth)/sign-up');
                  }}
                  className="absolute top-5 right-5 z-10"
                >
                  <Text className="font-Poppins-Regular text-white">Skip</Text>
                </TouchableOpacity>

                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="flex flex-col w-full mt-10"
                >
                  <Text className="text-3xl font-bold text-center text-white mx-10">
                    {item.title}
                  </Text>
                  <Text className="text-white text-md text-center mx-10 mt-3">
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            ))}
          </Swiper>
        </View>

        <Animated.View style={{ opacity: fadeAnim }} className="w-full items-center">
          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() => {
              isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1);
            }}
            className="w-11/12 mb-10 bg-[#6EBF36]"
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;


