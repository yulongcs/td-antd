import moment from 'moment';

function momentToString(value, format = 'YYYY-MM-DD') {
  if (moment.isMoment(value)) {
    return value.format(format);
  }

  return moment(value, format);
}

export default momentToString;
