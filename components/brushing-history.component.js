import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BrushingDataService from '../services/brushing-data.service';
import DateTimePicker from '@react-native-community/datetimepicker';
import Logo from './logo.component';

class BrushingHstoryComponent extends Component {
  static navigationOptions = {
    title: 'Brushing Entry',
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;

    this.state = {
      memberId: navigation.getParam('memberId', -1),
      entry: navigation.getParam('entry', {
        id: -1,
        startDate: new Date(),
        durationInSeconds: 0,
      }),
      mode: 'view',
      showDatePicker: false,
      datePickerMode: 'date',
    };
  }

  async remove(navigation) {
    await BrushingDataService.removeEntry(
      this.state.memberId,
      this.state.entry,
    );

    navigation('Home');
  }

  async save(navigation) {
    if (this.state.entry.id > -1) {
      await BrushingDataService.editEntry(
        this.state.memberId,
        this.state.entry,
      );
    } else {
      await BrushingDataService.addEntry(this.state.memberId, this.state.entry);
    }
    this.setState({mode: 'view'});

    navigation.navigate('Home');
  }

  brushingHistoryDateFormat(dateIn) {
    const date = new Date(dateIn);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  brushingHistoryTimeFormat(dateIn) {
    const date = new Date(dateIn);
    return `${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  setDate = (event, date) => {
    date = date || this.state.entry.startDate;
    const updatedEntry = this.state.entry;
    updatedEntry.startDate = date;

    this.setState({
      entry: updatedEntry,
      showDatePicker: Platform.OS === 'ios' ? true : false,
    });
  };

  changeDuration = duration => {
    let updatedEntry = this.state.entry;
    updatedEntry.durationInSeconds = duration;

    this.setState({entry: updatedEntry});
  };

  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Logo style={styles.logoImage}></Logo>
        <Text style={styles.headerText}>Date</Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({showDatePicker: true});
            this.setState({datePickerMode: 'date'});
          }}>
          <Text style={styles.valueText}>
            {this.brushingHistoryDateFormat(this.state.entry.startDate)}
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Time</Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({showDatePicker: true});
            this.setState({datePickerMode: 'time'});
          }}>
          <Text style={styles.valueText}>
            {this.brushingHistoryTimeFormat(this.state.entry.startDate)}
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Duration (seconds)</Text>
        <TextInput
          style={styles.durationInput}
          defaultValue={this.state.entry.durationInSeconds.toString()}
          keyboardType={'numeric'}
          onChangeText={text => this.changeDuration(text)}
        />

        <View>
          <TouchableHighlight onPress={() => this.save(navigation)}>
            <View style={styles.saveButton}>
              <Text style={styles.buttonText}>
                <Icon name="save" /> Save
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate('Home')}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelText}>
                <Icon name="ban" /> Cancel
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={new Date(this.state.entry.startDate)}
            mode={this.state.datePickerMode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
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
  headerText: {
    backgroundColor: '#00c9f0',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  valueText: {
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  durationInput: {
    textAlign: 'center',
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 15,
    paddingLeft: 20,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#daff00',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#cd0000',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
    paddingLeft: 20,
    textAlign: 'center',
  },
});

export default BrushingHstoryComponent;
