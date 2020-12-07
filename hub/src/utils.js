import moment from 'moment';

export function formatDate(value) {
  const readable = moment(value).format('Do MMMM YYYY');
  return readable;
}