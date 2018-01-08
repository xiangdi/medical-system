import moment from 'moment';

export const DateFormatString = 'YYYY-MM-DD';
export const TimeFormatString = 'HH:mm:ss';
export const DateTimeFormatString = 'YYYY-MM-DD HH:mm:ss';

export function parseDateTime(time, format=DateTimeFormatString){
  if (!time) {
    return ;
  }
  var ret;
  if (time - 0){
    ret = moment(time - 0);
    if (ret.isValid()) {
      return ret.format(format);
    }
    return ;
  }
  ret = moment(time);
  if (ret.isValid()){
    return ret.format(format);
  }
  return ;
}

export function parseDate(time, format=DateFormatString){
  return parseDateTime(time, format);
}

export function parseTime(time, format=TimeFormatString){
  return parseDateTime(time, format);
}


export default moment;