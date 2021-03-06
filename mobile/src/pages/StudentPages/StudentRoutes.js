import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {Text, Image, View} from 'react-native';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import React from 'react';

import {Icon} from 'native-base';

import Questions from './Forum/Questions/index';

import NewQuestion from './Forum/NewQuestion/index';

import Grade from './Grade/index';

import Profile from '../UserPages/Profile/index';

import Question from './Forum/Question/index';

const forumScreen = createStackNavigator(
  {
    Forum: {
      screen: Questions,
      navigationOptions: {
        header: null,
      },
    },
    NewQuestion: {
      screen: NewQuestion,
    },
    Question: {
      screen: Question,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerLayoutPreset: 'center',
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'OpenSans',
      },

      headerStyle: {
        backgroundColor: '#7B68EE',
        textAlign: 'center',
      },

      headerTintColor: '#fff',
    },
    headerLayoutPreset: 'center',
  },
);

const GradeScreen = createStackNavigator({
  Notas: {
    screen: Grade,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileScreen = createStackNavigator({
  Perfil: {
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },
});

const Student = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Forum: {
        screen: forumScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Icon
                  type="MaterialIcons"
                  name="question-answer"
                  style={{color: '#fff'}}
                  size={25}
                />
              </View>
            );
          },
        },
      },
      Notas: {
        screen: GradeScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../../images/grade.png')}
                  style={{width: 25, height: 25, color: '#fff'}}
                  tintColor="white"
                />
              </View>
            );
          },
        },
      },
      Perfil: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: () => {
            return (
              <View style={{justifyContent: 'center'}}>
                <Icon
                  type="MaterialIcons"
                  name="person"
                  size={25}
                  style={{color: '#fff'}}
                />
              </View>
            );
          },
        },
      },
    },
    {
      initialRouteName: 'Forum',
      activeColor: '#fff',
      inactiveColor: '#D3D3D3',
      barStyle: {
        backgroundColor: '#7B68EE',
      },
    },
  ),
);

export default Student;
