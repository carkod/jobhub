import moment from 'moment';

export function formatDate(value) {
  const readable = moment(value).format('Do MMMM YYYY');
  return readable;
}

export function checkValue(value) {
  if (value !== '' && value !== undefined && value !== null) {
    return true;
  }
  return false;
} 