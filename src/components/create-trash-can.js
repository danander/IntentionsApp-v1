import React from 'react';
import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CreateTrashCan(props) {
  return(
<TouchableOpacity onPress = {props.onPress}>
  <Ionicons name="trash" size={25} color="black" style = {styles.trashIcon}/>
</TouchableOpacity>
)
}




var styles = {
  trashIcon: {
    alignSelf: 'flex-end',
    marginTop:25,
    marginRight: 25
  }
}