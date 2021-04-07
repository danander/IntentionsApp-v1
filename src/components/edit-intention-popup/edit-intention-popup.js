import React from 'react';
import _ from 'lodash';
import { Text, View, TextInput} from 'react-native';
import CreateTrashCan from '../create-trash-can'
import styles from './edit-intention-popup.styles';
import Popup from '../popup'

export default class EditIntentionPopup extends React.Component {
  state = {
    updatedIntentionTitle: '',
    editingIntentionTitle: false
  }
  render() {
    // console.log(this.props.activeIntentionObject)
    return(
      <Popup onClose = {this.props.onClose}>
        <CreateTrashCan onPress = {() => this.props.deleteIntention(this.props.activeIntentionObject)}/>
        <View style = {styles.myIntention}>
          <Text style = {styles.timePeriodMessage}>{this.props.activeTimePeriodObject.message}</Text>
          <TextInput 
            style = {styles.activeIntentionTitle}
            // autoFocus
            value = {!this.state.editingIntentionTitle ? this.props.activeIntentionObject.title : this.state.updatedIntentionTitle} 
            onChangeText = {(text) => this.setState({updatedIntentionTitle: text, editingIntentionTitle: true})} 
            returnKeyType = 'done'
            onSubmitEditing = {() => this.props.updateIntention({title: this.state.updatedIntentionTitle, timePeriodKey: this.props.activeTimePeriodObject.key, id: this.props.activeIntentionObject.id})}
          />
        </View>
      </Popup>
    )
  }
}
  


