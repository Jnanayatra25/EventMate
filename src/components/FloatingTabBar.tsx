import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface FloatingTabBarProps {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: any;
  descriptors?: any;
  insets?: any;
}

export const FloatingTabBar: React.FC<FloatingTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case 'home':
        return 'home';
      case 'favorite':
        return 'heart';
      case 'add-event':
        return 'add';
      case 'events':
        return 'calendar';
      case 'profile':
        return 'person';
      default:
        return 'ellipse';
    }
  };

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) + 8 }]}>
      <View style={styles.container}>
        {state.routes.map((route: { key: string; name: string }, index: number) => {
          const isFocused = state.index === index;
          const iconName = getIconName(route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              {isFocused ? (
                <View style={styles.activeIndicatorContainer}>
                  <View style={styles.activeCircle}>
                    <Ionicons
                      name={iconName}
                      size={route.name === 'add-event' ? 32 : 26}
                      color="#F77036"
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inactiveIconWrapper}>
                  <Ionicons
                    name={iconName}
                    size={route.name === 'add-event' ? 30 : 25}
                    color="#FFFFFF"
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(22, 40, 60, 0.92)',
    borderRadius: 36,
    height: 64,
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  inactiveIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  activeIndicatorContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    position: 'absolute',
    bottom: -10,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
});
