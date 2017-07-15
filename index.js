import React, { PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import emoji from './data';
const ScrollableTabView = require('react-native-scrollable-tab-view');

const EmojiItem = ({ size, item, onPress }) => (
  <TouchableOpacity style={{ height: size, width: size }} onPress={onPress}>
    <View style={{ height: size, width: size }}>
      <Text style={{ fontSize: size / 4 * 3, paddingBottom: 2 }}>
        {item}
      </Text>
    </View>
  </TouchableOpacity>
);

const EmojiCategory = ({ headerStyle, emojiSize, name, items, onPick }) => (
  <ScrollView style={styles.category}>
    <Text style={{ ...styles.categoryName, ...headerStyle }}>{name}</Text>
    <View style={styles.categoryItems}>
      {items.map((em, idx) => (
        <EmojiItem key={idx} size={emojiSize} onPress={() => onPick(em)} item={em} />
      ))}
    </View>
  </ScrollView>
);

const EmojiPicker = ({ headerStyle, containerHeight, containerBackgroundColor, emojiSize, onPick }) => (
  <View style={{ ...styles.picker, height: containerHeight, backgroundColor: containerBackgroundColor }}>
    <ScrollableTabView
      renderTabBar={() => <View />}
      animated={true}
      prerenderingSiblingsNumber={1}
    >
      {emoji.map((category, idx) => (
        <EmojiCategory
          key={idx}
          tabLabel={idx}
          headerStyle={headerStyle}
          emojiSize={emojiSize}
          name={category.category}
          items={category.items}
          onPick={onPick}
        />
      ))}
    </ScrollableTabView>
  </View>
);

EmojiPicker.propTypes = {
  onPick: PropTypes.func,
  headerStyle: PropTypes.object,
  containerHeight: PropTypes.number.isRequired,
  containerBackgroundColor: PropTypes.string.isRequired,
  emojiSize: PropTypes.number.isRequired,
};

EmojiPicker.defaultProps = {
  containerHeight: 240,
  containerBackgroundColor: 'rgba(0, 0, 0, 0.1)',
  emojiSize: 40,
};

const styles = {
  picker: {
    flex: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  category: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 14,
    paddingTop: 2,
  },
  categoryName: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#888",
  },
  categoryItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
};

export default EmojiPicker;
