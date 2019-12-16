import AsyncStorage from '@react-native-community/async-storage';

export default class BrushingDataService {
  static historyPrefix = 'beam.history.member';
  static historyIdPrefix = 'beam.id.member';

  static async getBrushingHistory(memberId) {
    let history = JSON.parse(
      await AsyncStorage.getItem(`${this.historyPrefix}${memberId}`),
    );

    history.sort((a, b) => (new Date(a.startDate) < new Date(b.startDate)) ? 1 : -1);
    return history;
  }

  static async addEntry(memberId, entry) {
    let memberHistory = JSON.parse(
      await AsyncStorage.getItem(`${this.historyPrefix}${memberId}`),
    );

    let historyId = await AsyncStorage.getItem(
      `${this.historyIdPrefix}${memberId}`,
    );

    if (!historyId) {
      historyId = '0';
    }

    entry.id = historyId;

    if (!memberHistory) {
      memberHistory = [];
    }

    memberHistory.push(entry);

    await AsyncStorage.setItem(
      `${this.historyIdPrefix}${memberId}`,
      (parseInt(historyId, 10) + 1).toString(),
    );

    await AsyncStorage.setItem(
      `${this.historyPrefix}${memberId}`,
      JSON.stringify(memberHistory),
    );

    return memberHistory;
  }

  static async removeEntry(memberId, entry) {
    let memberHistory = JSON.parse(
      await AsyncStorage.getItem(`${this.historyPrefix}${memberId}`),
    );

    if (memberHistory) {
      const removeEntry = memberHistory.filter(x => x.id === entry.id)[0];
      const index = memberHistory.indexOf(removeEntry);

      if (index > -1) {
        memberHistory.splice(index, 1);

        await AsyncStorage.setItem(
          `${this.historyPrefix}${memberId}`,
          JSON.stringify(memberHistory),
        );
      }
    }

    return memberHistory;
  }

  static async editEntry(memberId, entry) {
    let memberHistory = JSON.parse(
      await AsyncStorage.getItem(`${this.historyPrefix}${memberId}`),
    );

    if (memberHistory) {
      const removeEntry = memberHistory.filter(x => x.id === entry.id)[0];
      const index = memberHistory.indexOf(removeEntry);

      if (index > -1) {
        memberHistory[index] = entry;

        await AsyncStorage.setItem(
          `${this.historyPrefix}${memberId}`,
          JSON.stringify(memberHistory),
        );
      }
    }

    return memberHistory;
  }
}
