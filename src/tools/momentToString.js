import moment from 'moment';

function momentToString(value, format = 'YYYY-MM-DD') {
  const momentValue = moment.isMoment(value) ? value.format(format) : moment(value, format);

  return momentValue === 'Invalid date' ? null : momentValue;
}

export default momentToString;
