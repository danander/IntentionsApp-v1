import React from 'react';
import _ from 'lodash';
import {Text, View,TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import styles from './create-intention-popup.styles';
import CreatePlusButton from '../create-plus-button/create-plus-button';
import Popup from '../popup';

var categories = {
  daily: {
    sleep: {title: 'Sleep', intentionTitles: ['Get to bed early', 'Stop eating three hours before bed', 'Meditate before bed']},
    movement: {title: 'Movement', intentionTitles: ['Move for a half hour', 'Do 20 minutes of yoga', 'Go for a run']},
    mindfulness: {title: 'Mindfulness', intentionTitles: ['Meditate for 10 minutes', 'Notice how my body feels', 'Take a walk without my cell phone']},
    screenTime: {title: 'Screen Time', intentionTitles: ['Limit social media to a half hour', 'No screens past 9 PM', 'Read before bed instead']}, 
    productivity: {title: 'Productivity', intentionTitles: ['Stretch every hour for 5 minutes', 'Focus on one task at a time', 'Turn off notifications']},
    food: {title: 'Food', intentionTitles: ['Eat one meal with no distractions', 'Notice how my food tastes and feels throughout the meal', 'Get enough protein']}
  },
  weekly: {
    rest: {title: 'Rest', intentionTitles: ['Get 8 hours of sleep every night', 'Feel rested', 'Do something relaxing every night']},
    movement: {title: 'Movement', intentionTitles: ['Move for 30 minutes every day', 'Feel energized', 'Do a different kind of movement this week']},
    mindfulness: {title: 'Mindfulness', intentionTitles: ['Meditate every day for ten minutes', 'Eliminate distractions', 'Be more present with my kids']},
    screenTime: {title: 'Screen Time', intentionTitles: ['Keep screen time to a minimum', `No screens before bed`, 'Charge my phone in a different room']},
    productivity: {title: 'Productivity'},
    food: {title: 'Food'}
  }, 
  longTerm: {
    occupation: {title: 'Occupation', intentionTitles: ['Help others', 'Have a meaningful career', 'Create something of value']},
    family: {title: 'Family', intentionTitles: ['Be appreciative of my loved ones', 'Take care of my family', 'Spend time with those that I love']},
    mood: {title: 'Mood', },
    experience: {title: 'Experience',},
    health: {title: 'Health',},
    sentiment: {title: 'Sentiment',}
  }
};

export default class CreateIntentionPopup extends React.Component {
  state = {
    createIntentionTitle: ''
  }
  
  render() {
    var categoryGroups = _.chunk(Object.values(categories[this.props.timePeriodObject.key]), 3);

    return(
      <Popup onClose = {this.props.onClose}>

        {this.state.activeCategory && (
          <TouchableOpacity onPress = {() => this.setState({activeCategory:undefined})} style = {styles.backButton}>
            <AntDesign name="leftcircleo" size={25} color="#915c83"/>
          </TouchableOpacity>
        )}

        <TextInput 
          style = {styles.userInput}
          placeholder= {this.props.timePeriodObject.message}
          autoFocus
          value = {this.state.createIntentionTitle} 
          onChangeText = {(text) => this.setState({createIntentionTitle: text})} 
          returnKeyType = 'done'
          onSubmitEditing = {() => this.props.createIntention({title: this.state.createIntentionTitle, timePeriodKey: this.props.timePeriodObject.key, id: _.uniqueId('intention')})}
        />

        {this.state.activeCategory ? (
          <View style = {{paddingLeft: 20}}>
            {this.state.activeCategory.intentionTitles.map(intentionTitle => ( 
              <View style = {{flexDirection: 'row', margin: 8}}>
                <CreatePlusButton onPress = {() => this.props.createIntention({
                  title: intentionTitle, 
                  timePeriodKey: this.props.timePeriodObject.key, 
                  id: _.uniqueId('intention')
                  })}
                />
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
        )
        }
      </Popup>
    );
  }
}