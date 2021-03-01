import React from 'react';
import _ from 'lodash';
import { View, TouchableOpacity, Modal} from 'react-native';

export default class Popup extends React.Component {

  render() {
    return(
  <Modal transparent style={styles.modal}>
    <View style={styles.popup}>
      <TouchableOpacity style={styles.popupBackground} onPress={this.props.onClose}/>
      <View style={styles.popupWindow}>
        {this.props.children}
      </View>
    </View>
  </Modal>
    )
  }
}

var styles = {
  
  popup: {
  flex: 1,
  height: '100%'
  },

  popupBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1
  },

  popupWindow: {
    height: 575,
    backgroundColor: 'white',
  },
}