import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MemberInformationService from '../services/member-info.service';
import BrushingDataService from '../services/brushing-data.service';
import Logo from './logo.component';

class MemberComponent extends Component {
  static navigationOptions = {
    title: 'Member Information',
  };

  willFocusSubscription;

  state = {
    member: {},
    brushingData: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const member = MemberInformationService.getActiveSelfInsuredMemberData(
        'Remy LeBeau',
      );

      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        async () => {
          await this.setBrushingHistoryState();
        },
      );

      await this.setBrushingHistoryState();

      this.setState({
        member: member,
        loading: false,
      });
    } catch (err) {
      console.log('Error while loading member data: ', err);
    }
  }

  async setBrushingHistoryState() {
    let updateHistory = await BrushingDataService.getBrushingHistory(
      this.state.member.id,
    );
    this.setState({brushingData: updateHistory ?? []});
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  brushingHistoryDateFormat(dateIn) {
    const date = new Date(dateIn);

    return `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()} at ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, 0)}`;
  }

  async remove(entry) {
    Alert.alert(
      'Are you sure?',
      `Are you sure you would like to delete the record from ${this.brushingHistoryDateFormat(entry.startDate)}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {text: 'OK', onPress: async () => {
          await BrushingDataService.removeEntry(
            this.state.member.id,
            entry,
          );
      
          await this.setBrushingHistoryState();
        }},
      ],
      {cancelable: false},
    );
  }

  brushingDurationFormat(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor((duration % 3600) % 60);

    return `${
      hours > 0 ? `${hours}${hours === 1 ? ' hour, ' : ' hours, '}` : ''
    }${
      hours > 0 || minutes > 0
        ? `${minutes}${minutes === 1 ? ' minute, ' : ' minutes, '}`
        : ''
    }${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }

  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Logo style={styles.logoImage}></Logo>
        <Text style={styles.nameText}>{this.state.member.name}</Text>

        <View style={styles.addressSection}>
          <Text style={styles.addressHeader}>Shipping Address</Text>
          <Text style={styles.addressText}>
            {this.state.member.shipping_address}
          </Text>
          <Text style={styles.addressText}>
            {this.state.member.shipping_city},{' '}
            {this.state.member.shipping_state}{' '}
            {this.state.member.shipping_zip_code}
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => navigation.navigate('Entry', {memberId: this.state.member.id})}>
          <View style={styles.addButton}>
            <Text style={styles.buttonText}>
              <Icon name="plus" /> Add Entry
            </Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.historyTitle}>Brushing History</Text>
        <View style={styles.listArea}>
          <FlatList
            data={this.state.brushingData}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: "row", paddingTop: 10, paddingBottom: 10}}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() =>
                    navigation.navigate('Entry', {
                      memberId: this.state.member.id,
                      entry: item,
                    })
                  }>
                  <Text style={styles.brushingItem}>
                    {`${this.brushingHistoryDateFormat(
                      item.startDate,
                    )} for  ${this.brushingDurationFormat(
                      item.durationInSeconds,
                    )}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => this.remove(item)}>
                  <Text style={styles.deleteText}>
                    <Icon name="trash" />
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  logoImage: {
    width: 147,
    height: 39,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nameText: {
    backgroundColor: '#00c9f0',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#cd0000',
    justifyContent: 'center',
    textAlign: 'center',
    width: '15%',
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
  addressSection: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  addressHeader: {
    textAlign:'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#daff00',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
    paddingLeft: 20,
    textAlign: 'center',
  },
  historyTitle: {
    backgroundColor: '#00c9f0',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  listArea: {
    height: '65%',
  },
  itemContainer: {
    width: '85%'
  },
  brushingItem: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

export default MemberComponent;
