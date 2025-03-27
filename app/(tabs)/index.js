import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import ProfileScreen from '../ProfileScreen';

// import SideMenu from './SideMenu'; // We'll create this component

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.8;

export default function Index() {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateX = useSharedValue(0);

  const gestureHandler = (event) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.ACTIVE) {
      translateX.value = translationX;
    } else if (state === State.END) {
      if (translationX > SCREEN_WIDTH * 0.5) {
        translateX.value = withTiming(MENU_WIDTH);
        setIsMenuOpen(true);
      } else {
        translateX.value = withTiming(0);
        setIsMenuOpen(false);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, MENU_WIDTH],
      [1, 0.8],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale }
      ],
      borderRadius: isMenuOpen ? 20 : 0,
    };
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      translateX.value = withTiming(0);
      setIsMenuOpen(false);
    } else {
      translateX.value = withTiming(MENU_WIDTH);
      setIsMenuOpen(true);
    }
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        {/* Side Menu */}
        <View style={[styles.menuContainer, { width: MENU_WIDTH }]}>
          <ProfileScreen />
        </View>

        {/* Main Content with Gesture Handler */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View 
            style={[
              styles.mainContainer, 
              animatedStyle, 
              { width: SCREEN_WIDTH }
            ]}
          >
            <View style={styles.topnav}>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="menu-outline" size={32} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("notificationscreen")}>
                <Ionicons name="notifications-outline" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>What's up, Charlene</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.textContainer}>
                  <Text style={styles.smalltext}>Tasks</Text>
                  <Text style={styles.smalltext}>Grocery Shopping</Text>
                  <Text style={styles.smalltext}>Next Task: Call Tom</Text>
                </View>
                <View style={styles.images}>
                  <Image source={require('../../assets/images/Polygon4.png')}/>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View style={styles.textContainer}>
                  <Text style={styles.smalltext}>Goals</Text>
                  <Text style={styles.smalltext}>Grocery Shopping</Text>
                  <Text style={styles.smalltext}>Next Task: Call Tom</Text>
                </View>
                <View style={styles.images}>
                  <Image source={require('../../assets/images/Polygon2.png')}/>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('RelationshipsScreen')}>
                <View style={styles.progressBar}>
                  <View style={styles.textContainer}>
                    <Text style={styles.smalltext}>Relationship</Text>
                    <Text style={styles.smalltext}>Call Mum</Text>
                  </View>
                  <View style={styles.images}>
                    <Image source={require('../../assets/images/Polygon3.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.progressBar}>
                <View style={styles.textContainer}>
                  <Text style={styles.smalltext}>Resolutions</Text>
                  <Text style={styles.smalltext}>Grocery Shopping</Text>
                </View>
                <View style={styles.images}>
                  <Image source={require('../../assets/images/Polygon5.png')}/>
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#1E1E1E',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center", 
    alignItems: "center", 
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "400",
    top: -75,
    left: -35,
  },
  smalltext: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 18,
  },
  topnav: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  progressBar: {
    width: 171,
    height: 226,
    justifyContent: "space-between"
  },
  progressContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    height: 460,
  },
  textContainer: {
    width: 150,
    height: 70,
  },
  images: {
    width: 171,
    height: 120,
  },
});