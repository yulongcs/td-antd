import moment from 'moment';
import momentToString from '../../src/tools/momentToString';

describe('momentToString', () => {
  it('passes when value is undefined', () => {
    expect(momentToString(undefined)).toBeUndefined();
  });

  it('passes when value is invalid date', () => {
    expect(momentToString('222222')).toBeUndefined();
  });

  it('passes when value is valid date', () => {
    expect(momentToString('2021-06-01')).toEqual(moment('2021-06-01'));
  });

  it('passes when value is moment object', () => {
    expect(momentToString(moment('2021-06-01'))).toBe('2021-06-01');
  });
});
