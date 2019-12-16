import memberData from '../data/searchResults.json';

export default class MemberInformationService {
  static getActiveSelfInsuredMemberData(name) {
    const possibleMatches = memberData.filter(data => {
      return (
        !data.terminated_at &&
        data.primary_insured_id === null &&
        data.name === name
      );
    });

    if (possibleMatches.length > 0) {
      return possibleMatches.sort((a, b) => {
        return new Date(b.effective_date) - new Date(a.effective_date);
      })[0];
    } else {
      return {};
    }
  }
}
