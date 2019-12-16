import BrushingDataService from './brushing-data.service';
import AsyncStorage from '@react-native-community/async-storage';

test('get brushing history calls async storage with the correct key', async () => {
  await BrushingDataService.getBrushingHistory(999);

  expect(AsyncStorage.getItem).toBeCalledWith('beam.history.member999');
});

test('add brushing entry calls async storage with the correct keys and values', async () => {
  await BrushingDataService.addEntry(999, {
    startDate: new Date('2019-12-15T02:37:20.752Z'),
    durationInSeconds: 60,
  });

  expect(AsyncStorage.getItem).toBeCalledWith('beam.id.member999');
  expect(AsyncStorage.getItem).toBeCalledWith('beam.history.member999');
  expect(AsyncStorage.setItem).toBeCalledWith('beam.id.member999', '1');
  expect(AsyncStorage.setItem).toBeCalledWith('beam.history.member999', `[{\"startDate\":\"2019-12-15T02:37:20.752Z\",\"durationInSeconds\":60,\"id\":\"0\"}]`);
});

test('edit brushing entry calls async storage with the correct key and value', async () => {
  await BrushingDataService.editEntry(999, {
    id: 0,
    startDate: new Date('2019-12-15T02:37:20.752Z'),
    durationInSeconds: 120,
  });

  expect(AsyncStorage.getItem).toBeCalledWith('beam.id.member999');
  expect(AsyncStorage.getItem).toBeCalledWith('beam.history.member999');
  expect(AsyncStorage.setItem).toBeCalledWith('beam.history.member999', `[{\"startDate\":\"2019-12-15T02:37:20.752Z\",\"durationInSeconds\":60,\"id\":\"0\"}]`);
});

test('remove brushing entry calls async storage with the correct key and value', async () => {
  await BrushingDataService.removeEntry(999, {
    id: 0,
    startDate: new Date('2019-12-15T02:37:20.752Z'),
    durationInSeconds: 60,
  });

  expect(AsyncStorage.getItem).toBeCalledWith('beam.history.member999');
  expect(AsyncStorage.setItem).toBeCalledWith('beam.history.member999', `[{\"startDate\":\"2019-12-15T02:37:20.752Z\",\"durationInSeconds\":60,\"id\":\"0\"}]`);
});
