import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function CreatePlusButton(props) {
  return (
    <TouchableHighlight style = {styles.plusButton} onPress = {props.onPress}>
      <Text style = {{fontSize: 18, position: 'relative', top: -1, color: 'white'}}>+</Text>
    </TouchableHighlight>
)
}

export default class App extends React.Component {

  state = {
    isCreating: false,
    intentions: [],
    activeCategory: false,
    activeIntention: false,
    activeTimePeriod: "daily"  };

  createIntention = (intention) => this.setState({intentions: [...this.state.intentions, intention], createIntentionTitle: ''})
  setIsCreating = (isCreating) => this.setState({isCreating})
  setActiveCategory = (activeCategory) => this.setState({activeCategory})
  

  render() {

    console.log(this.state)


    var categories = {
      daily: {
        sleep: {title: 'Sleep', intentionTitles: ['Get to bed early', 'Stop eating three hours before bed', 'Meditate before bed']},
        movement: {title: 'Movement', intentionTitles: ['Move for a half hour', 'Do 20 minutes of yoga', 'Go for a run']},
        mindfulness: {title: 'Mindfulness'},
        screenTime: {title: 'Screen Time'}, 
        productivity: {title: 'Productivity'},
        food: {title: 'Food'}
      },
      weekly: {
        rest: {title: 'Rest', intentionTitles: ['Get 8 hours of sleep every night', 'Feel rested', 'Do something relaxing every night']},
        movement: {title: 'Movement', intentionTitles: ['Move for 30 minutes every day', 'Feel energized', 'Do a different kind of movement this week']},
        mindfulness: {title: 'Mindfulness'},
        screenTime: {title: 'Screen Time'}, 
        productivity: {title: 'Productivity'},
        food: {title: 'Food'}
      }, 
      longTerm: {
        occupation: {title: 'Occupation', intentionTitles: ['Help others', 'Have a meaningful career', 'Create something of value']},
        family: {title: 'Family', intentionTitles: ['Be appreciative of my loved ones', 'Take care of my family', 'Spend time with those that I love']},
        mood: {},
        experience: {},
        health: {},
        sentiment: {}
      }
    };

    var categoryGroups = _.chunk(Object.values(categories[this.state.activeTimePeriod]), 3);

    return (
      <View>
          <View style = {styles.headerView}>
            <Text style = {styles.header} img>My intentions</Text>
          </View>

          {['daily', 'weekly', 'longTerm'].map(timePeriod => (
            <View>
            <Text style = {styles.daily}>Daily intentions</Text>

            <View style = {{flexDirection:'row'}}>
              {/* <View styles = {styles.todayView}> */}
                <Text style = {styles.today}>Today, I want to...</Text>
            {/* </View> */}
            
              <View style = {styles.plusButtonContainer}>
                <CreatePlusButton onPress = {() => this.setIsCreating(true)}>
                </CreatePlusButton>
              </View>
            </View>
            
            <View>
              {this.state.intentions.map(intention => (
                <TouchableOpacity onPress = {() => this.setState({activeIntention: intention})} key= {intention.title} style = {{paddingLeft: 75, paddingTop: 10}}>
                  <Text style = {{fontSize: 16, paddingTop: 6, paddingBottom: 6,paddingLeft: 10,paddingRight: 10, borderWidth: .5, alignSelf: 'flex-start', borderRadius: 10, borderColor: 'gray', margin: 2}}>{intention.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {this.state.activeIntention &&(
              <Modal transparent style={{position: 'absolute', height: '100%', width: '100%', flex: 1}}>
                <View style={styles.popup}>
                  <TouchableOpacity style={styles.popupBackground} onPress={() => this.setState({activeIntention: undefined})}/>
                  <View style={styles.popupWindow}>
                    {/* date */}
                    {/* button for recurring  */}
                  <Ionicons name="trash" size={25} color="black" style = {{alignSelf: 'flex-end', margin:20}}/>
                    <View style = {{flexDirection: 'row', alignSelf: 'center', paddingTop: 10}}>
                      <Text style = {{textDecorationLine: 'underline', fontSize: 16, fontStyle: 'italic', marginTop: 2}}>Today, I want to</Text>
                      <Text style = {{paddingTop: 4, paddingBottom: 4,paddingLeft: 8,paddingRight: 8, borderWidth: .5, alignSelf: 'flex-start', borderRadius: 10, borderColor: 'gray', marginLeft: 6, fontSize: 16}}>{this.state.activeIntention.title.toLowerCase() + '.'}</Text>
                    </View>
                  </View>
                </View>
              </Modal>
              )
            }

            {this.state.isCreating && (
            <Modal transparent style={{position: 'absolute', height: '100%', width: '100%', flex: 1}}>
              <View style={styles.popup}>
                <TouchableOpacity style={styles.popupBackground} onPress={() => this.setState({isCreating: false, activeCategory: undefined, createIntentionTitle: ''})}/>
                  <View style={styles.popupWindow}>
                    <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                      {this.state.activeCategory && (
                        <TouchableOpacity onPress = {() => this.setState({activeCategory:undefined})} style = {{marginTop: 35, position: 'absolute',  left:28, borderRadius: 25}}>
                          <AntDesign name="leftcircleo" size={25} color="#915c83"/>
                        </TouchableOpacity>)}
                        
                      
                    </View>
                    <TextInput style = {{ alignSelf: 'center', height: '8%', width: '68%', borderColor: 'gray', borderWidth: .2, padding: 12, marginTop: 25, marginBottom: 20, borderRadius: 10, fontSize: 16}}
                    placeholder="Today, I want to.."
                    autoFocus
                    value = {this.state.createIntentionTitle} 
                    onChangeText = {(text) => this.setState({createIntentionTitle: text})} 
                    returnKeyType = 'done'
                    onSubmitEditing = {() => this.createIntention({title: this.state.createIntentionTitle, activeTimePeriod: "daily"})}
                    />
                    
                    {this.state.activeCategory ? (
                      <View style = {{height: 150, width:'100%', alignItems: 'left', paddingLeft: 20}}>
                          {this.state.activeCategory.intentionTitles.map((intentionTitle => ( 
                            <View style = {{flexDirection: 'row', margin: 8}}>
                              <CreatePlusButton onPress = {() => this.createIntention({title: intentionTitle, activeTimePeriod: "daily"})}> </CreatePlusButton>
                              <TouchableOpacity style = {{marginLeft: 12, marginTop: 2}}>
                                <Text style = {{fontSize: 16}}>{intentionTitle}</Text>
                              </TouchableOpacity>
                            </View>
                          )))}
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
        fontSize: 18,
        paddingTop: 60,
        height: 100, 
        color: '#202020',
        // backgroundColor: 'pink'
    },

    headerView: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      backgroundColor: '#558155',
      alignItems: 'center',
      justifyContent: 'center'
    },

    daily: {
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
      marginLeft: 25
    },

    today: {
      paddingLeft: 45,
      paddingTop: 15,
      fontSize: 16,
      fontStyle: 'italic',
      textDecorationLine: 'underline',
      // backgroundColor: 'blue',
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
      // backgroundColor: 'red',
      width: 171,
      
    },

    plusButton: {
      // backgroundColor: 'black',
      width: 25,
      height: 25,
      borderRadius: 25,
      alignItems: 'center', 
      justifyContent: 'center',
      // borderWidth: 1,
      // borderColor: 'black',
      backgroundColor: '#915c83'

    },

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

    // customDaily: {
    //   placeholder: "Write here"
    // }
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

