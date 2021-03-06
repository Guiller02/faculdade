import React, {Component} from 'react';

import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Icon,
} from 'native-base';

import api from '../../../services/api';

import HeaderStudent from '../../StudentPages/Layouts/Header';

import reactotron from 'reactotron-react-native';

import Loading from '../../../helpers/loading';

import {View, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class CardExample extends Component {
  state = {
    register: '',
    loading: true,
    firstRegister: '',
    data: undefined,
  };

  loadProfile = async () => {
    const user = await api.get('/auth/isUser');

    this.setState({register: user.data.user});

    const firstRegister = this.state.register.charAt(0);

    this.setState({firstRegister: firstRegister});

    reactotron.log(firstRegister);

    this.setState({data: await api.get('/auth/profile')});

    reactotron.log(this.state.data);

    this.setState({loading: false});
  };

  removeValue = async () => {
    await AsyncStorage.removeItem('@Faculade:token');

    this.props.navigation.navigate('Sign');
  };

  componentDidMount() {
    this.loadProfile();
  }
  render() {
    if (this.state.loading === true) {
      return <Loading></Loading>;
    } else {
      if (this.state.firstRegister === 'A') {
        return (
          <Container>
            <HeaderStudent></HeaderStudent>
            <Content
              contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Card style={{flex: 1, justifyContent: 'space-around'}}>
                <CardItem>
                  <Body>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'space-between',
                      }}>
                      <Text>{this.state.data.data.name}</Text>

                      <Right>
                        <Text>{this.state.data.data.cod_student}</Text>
                      </Right>
                    </View>

                    <Text>{this.state.data.data.email}</Text>

                    <Text>
                      {'(' +
                        this.state.data.data.phoneNumber.substring(0, 2) +
                        ')' +
                        ' ' +
                        this.state.data.data.phoneNumber.substring(3, 7) +
                        '-' +
                        this.state.data.data.phoneNumber.substring(7, 13)}
                    </Text>
                  </Body>
                </CardItem>

                <CardItem style={{borderWidth: 5, borderColor: '#d1d1d1'}}>
                  <Body>
                    <Text style={{marginBottom: 4}}>
                      Sua matéria favorita:{' '}
                      {this.state.data.data.favoritCollegeSubject}
                    </Text>

                    <View>
                      <Text style={{marginBottom: 4}}>
                        Você já lançou {this.state.data.data.solutions} soluções
                      </Text>

                      <Text style={{marginBottom: 4}}>
                        Você possui {this.state.data.data.points} pontos
                      </Text>
                    </View>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'space-between',
                      }}>
                      <TouchableOpacity>
                        <Text style={{color: 'blue'}}>Alterar perfil</Text>
                      </TouchableOpacity>

                      <Right>
                        <TouchableOpacity onPress={this.removeValue}>
                          <Text style={{color: 'blue'}}>Sair da conta</Text>
                        </TouchableOpacity>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Container>
        );
      } else {
        return (
          <Container>
            <Content>
              <TouchableOpacity onPress={this.removeValue}>
                <Text style={{color: 'blue'}}>Sair da conta</Text>
              </TouchableOpacity>
            </Content>
          </Container>
        );
      }
    }
  }
}
