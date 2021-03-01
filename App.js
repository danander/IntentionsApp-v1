import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CreatePlusButton from './src/components/create-plus-button/create-plus-button';
import CreateIntentionPopup from './src/components/create-intention-popup/create-intention-popup';
import EditIntentionPopup from './src/components/edit-intention-popup/edit-intention-popup';
import { MMKV } from 'react-native-mmkv';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


export default class App extends React.Component {

  state = {
    isCreating: false,
    intentionsArray: [],
    activeCategory: false,
    activeIntentionObject: false,
    activeTimePeriodObject: ''
     };

  createIntention = intentionObject => this.setState({intentionsArray: [...this.state.intentionsArray, intentionObject], isCreating: false})
  updateIntention = updatedIntentionObject => {this.setState({activeIntentionObject: false, intentionsArray: [...this.state.intentionsArray.filter(intentionObject => intentionObject.id !== updatedIntentionObject.id), updatedIntentionObject]})}
  deleteIntention = () => this.setState({intentionsArray: this.state.intentionsArray.filter(intentionObject => this.state.activeIntentionObject !== intentionObject), activeIntentionObject: false})
  
  
  render() {

    // console.log(this.state)
    // console.log(this.state.intentionsArray)
    console.log(this.state.activeIntentionObject)
  
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });

    var timePeriodsArray = [
      {key: 'daily', title: 'Daily', message: 'Today, I want to...'}, 
      {key: 'weekly', title: 'Weekly', message: 'This week, I want to...'}, 
      {key: 'longTerm', title: 'Long term', message: 'Long term, I want to...'}
    ];

    return (
      <View>
          <View style = {styles.headerView}>
            <Text style = {styles.header}>My intentions</Text>
          </View>

          {timePeriodsArray.map(timePeriodObject => (
            <View>
              <View style = {styles.timePeriodBox}>
                <Text style = {styles.timePeriodTitle}>{timePeriodObject.title} intentions</Text>
              </View>
            <View style = {{flexDirection:'row'}}>
              {/* <View styles = {styles.todayView}> */}
                <Text style = {styles.timePeriodMessage}>{timePeriodObject.message}</Text>
            {/* </View> */}
            
              <View style = {styles.plusButtonContainer}>
                <CreatePlusButton onPress = {() => this.setState({isCreating: true, activeTimePeriodObject: timePeriodObject})}/>
              </View>
            </View>
            
            <View>
              {/* user created intentions */}
              {this.state.intentionsArray.filter(intentionObject => timePeriodObject.key === intentionObject.timePeriodKey).map(intentionObject => (
                <TouchableOpacity onPress = {() => this.setState({activeIntentionObject: intentionObject, activeTimePeriodObject: timePeriodObject, id: _.uniqueId('intention') })} key= {intentionObject.title} style = {{paddingLeft: 75, paddingTop: 10}}>
                  <Text style = {styles.userIntentionTitle}>{intentionObject.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {this.state.activeIntentionObject &&(
              <EditIntentionPopup activeIntentionObject = {this.state.activeIntentionObject} updateIntention = {this.updateIntention} deleteIntention = {this.deleteIntention} intentionsArray = {this.state.intentionsArray} activeTimePeriodObject = {this.state.activeTimePeriodObject} onClose = {() => this.setState({activeIntentionObject: false})} />)}
            {/* to show one of the three create intention popups */}
            {this.state.isCreating && this.state.activeTimePeriodObject.key === timePeriodObject.key && (
              <CreateIntentionPopup createIntention = {this.createIntention} onClose = {() => this.setState({isCreating: false})} timePeriodObject = {timePeriodObject}/> 
         )}
        </View>
          ))}
      </View>
  );
  }
}

const styles = StyleSheet.create({

    header: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 55,
        height: 100, 
        color: '#202020',
    },

    headerView: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      backgroundColor: '#558155',
      alignItems: 'center',
      justifyContent: 'center'
    },

    // timePeriodBox: {
    //   borderRadius: 10
    // }, 

    timePeriodTitle: {
      paddingTop: 6,
      paddingBottom:6,
      paddingLeft: 10,
      paddingRight:8, 
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: 'black',
      color: 'white',
      width: 140,
      marginTop: 25,
      marginLeft: 25,

    },

    timePeriodMessage: {
      paddingLeft: 45,
      paddingTop: 15,
      fontSize: 16,
      fontStyle: 'italic',
      textDecorationLine: 'underline',
      width: 171,
      
    },

    // todayView: {
    //   borderBottomWidth: 1,
    //   borderBottomColor: 'black',
    //   backgroundColor: 'red'
    // },

    plusButtonContainer: {
      paddingLeft: 10,
      paddingTop: 12,
      width: 171,
      
    },

      userIntentionTitle: {
        fontSize: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: .5,
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderColor: 'gray',
        margin: 2
      }
})






























// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
// <View style={{
//   marginTop: 80,
//   paddingLeft: 35,
//   height: 100,
//   borderBottom: 'solid',
//   flex: 1, 

// }}>
//     <Text style = {{
//       textTransform: 'uppercase',
//       fontWeight: 'bold',
//       fontSize: 18
//     }}>
//         My intentions
//     </Text>
    
// </View>



    // <View style={styles.container}>
    //  <View style = {{width:10, height: 10, backgroundColor: 'pink'}}></View>
    //   <Text>Open up Dana.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

