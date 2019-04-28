import moment from 'moment';

//converts ISO date to XX days ago string
const parseFromNow = (ISOdate) => moment(Date.parse(ISOdate)).fromNow();

export {parseFromNow}