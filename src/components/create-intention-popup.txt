import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

class CreateIntentionPopup extends React.Component {
  state = {
    createIntentionTitle: ''
  }
  render() {
    console.log(this.props.timePeriod.key)
    var categoryGroups = _.chunk(Object.values(categories[this.props.timePeriod.key]), 3);
    return(
      <Modal transparent style={{position: 'absolute', height: '100%', width: '100%', flex: 1}}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.popupBackground} onPress={this.props.onClose}/>
            <View style={styles.popupWindow}>
              <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                {this.state.activeCategory && (
                  <TouchableOpacity onPress = {() => this.setState({activeCategory:undefined})} style = {{marginTop: 35, position: 'absolute',  left:28, borderRadius: 25}}>
                    <AntDesign name="leftcircleo" size={25} color="#915c83"/>
                  </TouchableOpacity>
                )}
              </View>
              <TextInput 
                style = {{ alignSelf: 'center', height: '8%', width: '68%', borderColor: 'gray', borderWidth: .2, padding: 12, marginTop: 25, marginBottom: 20, borderRadius: 10, fontSize: 16}}
                placeholder= {this.props.timePeriod.message}
                autoFocus
                value = {this.state.createIntentionTitle} 
                onChangeText = {(text) => this.setState({createIntentionTitle: text})} 
                returnKeyType = 'done'
                onSubmitEditing = {() => this.props.createIntention({title: this.state.createIntentionTitle, timePeriodKey: this.props.timePeriod.key})}
              />
              {this.state.activeCategory ? (
                <View style = {{height: 150, width:'100%', alignItems: 'left', paddingLeft: 20}}>
                  {this.state.activeCategory.intentionTitles.map(intentionTitle => ( 
                    <View style = {{flexDirection: 'row', margin: 8}}>
                      <CreatePlusButton onPress = {() => this.props.createIntention({title: intentionTitle, timePeriodKey: this.props.timePeriod.key })}/>
                      <TouchableOpacity style = {{marginLeft: 12, marginTop: 2}}>
                        <Text style = {{fontSize: 16}}>{intentionTitle}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View> 
                    ) : (
                      categoryGroups.map((categoryGroup, index) => (
                        <View key = {index} style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                          {categoryGroup.map(category => (
                            <TouchableOpacity key = {category.title} onPress={() => this.setState({activeCategory: category})} style = {{borderWidth: 1, flex: 1, height: 50, margin: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style ={{ fontSize: 16}}>{category.title}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ))
                    )}
            </View>
        </View>
      </Modal>
    );
  }
}