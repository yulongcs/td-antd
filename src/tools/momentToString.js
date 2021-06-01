import moment from 'moment';

function momentToString(value = null, format = 'YYYY-MM-DD') {
  let isMoment;
  const momentValue = (isMoment = moment.isMoment(value)) ? value : moment(value);
  return momentValue.isValid() ? isMoment ? value.format(format) : momentValue : undefined;
}

export default momentToString;
