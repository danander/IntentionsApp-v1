import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from './create-plus-button.styles';

export default function CreatePlusButton(props) {
  return (
    <TouchableHighlight style={styles.plusButton} onPress={props.onPress}>
      <Text style={{fontSize: 18, position: 'relative', top: -1, color: 'white'}}>+</Text>
    </TouchableHighlight>
  );
}