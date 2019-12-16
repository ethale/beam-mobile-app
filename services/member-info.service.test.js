import MemberInformationService from './member-info.service';

test('data function returns the expected member on search', () => {
  const memberResult = MemberInformationService.getActiveSelfInsuredMemberData(
    'Remy LeBeau',
  );

  expect(memberResult.name).toBe('Remy LeBeau');
  expect(memberResult.id).toBe(43);
  expect(memberResult.primary_insured_id).toBe(null);
  expect(memberResult.terminated_at).toBe(null);
  expect(memberResult.effective_date).toBe('2018-01-01');
});

test('data function returns an empty entity when no results found', () => {
  const memberResult = MemberInformationService.getActiveSelfInsuredMemberData(
    'First Last',
  );

  expect(memberResult).not.toBe(undefined);
});
