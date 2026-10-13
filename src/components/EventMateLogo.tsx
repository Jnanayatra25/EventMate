import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface EventMateLogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  horizontal?: boolean;
}

export const EventMateLogo: React.FC<EventMateLogoProps> = ({
  size = 60,
  showText = true,
  horizontal = false,
}) => {
  const iconSize = size;
  const primaryOrange = '#F77036';

  return (
    <View style={[styles.container, horizontal && styles.rowContainer]}>
      {/* Vector Logo Icon */}
      <View style={{ width: iconSize, height: iconSize * 0.9 }}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 120 110"
          fill="none"
        >
          {/* Main Pin Outer Shape */}
          <Path
            d="M52 14 C35 14 22 27 22 44 C22 59 36 74 48 83 C50.5 85 53.5 85 56 83 C68 74 82 59 82 44 C82 27 69 14 52 14 Z"
            stroke={primaryOrange}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pin Inner Dot */}
          <Circle cx="52" cy="42" r="8" fill={primaryOrange} />

          {/* Smiling Swoosh Bottom Curve */}
          <Path
            d="M26 84 C40 98 75 104 96 74 C99 70 104 76 101 81 C78 114 36 108 20 90 C17 87 22 81 26 84 Z"
            fill={primaryOrange}
          />
        </Svg>
      </View>

      {/* Stylized Brand Typography */}
      {showText && (
        <View style={[styles.textWrapper, horizontal ? styles.textWrapperRow : styles.textWrapperColumn]}>
          <Text style={styles.eventText}>Event</Text>
          <View style={styles.mateBadge}>
            <Text style={styles.mateText}>Mate</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapperColumn: {
    marginTop: 6,
  },
  textWrapperRow: {
    marginLeft: 6,
  },
  eventText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F77036',
    letterSpacing: -0.5,
  },
  mateBadge: {
    backgroundColor: '#F77036',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 2,
  },
  mateText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
});
