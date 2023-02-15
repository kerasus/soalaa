import moment from 'moment-jalaali'
moment.loadPersian()
class ShamsiDate {
  static getTerm (dateTime) {
    return moment(dateTime, 'YYYY-M-D hh:mm:ss').format('jMMMM jYYYY')
  }

  static getDateTime (dateTime) {
    return moment(dateTime, 'YYYY-M-D hh:mm:ss').format('hh:mm:ss jYYYY/jMM/jDD')
  }

  static getDate (date) {
    return moment(date, 'YYYY-M-D hh:mm:ss').format('jYYYY/jMM/jDD')
  }

  static getDayOfWeek (date) {
    return moment(date, 'YYYY-M-D hh:mm:ss').format('dddd')
  }

  static getTimeFromDateTime (dateTime) {
    return moment(dateTime, 'YYYY-M-D hh:mm:ss').format('hh:mm:ss')
  }

  static getTitledDateTime (dateTime) {
    return moment(dateTime, 'YYYY-M-D hh:mm:ss').format('jD jMMMM jYYYY')
  }

  static getTitledDate (dateTime) {
    return moment(dateTime, 'YYYY-M-D').format('jD jMMMM jYYYY')
  }
}

export default ShamsiDate
