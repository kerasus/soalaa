import process from 'process'
import moment from 'moment'
import { getServerDate } from '@nodeguy/server-date'
import Assistant from '../plugins/assistant'

const Time = (function () {
  async function synchronizeTime () {
    window.serverDate = {}
    const { date, offset, uncertainty } = await getServerDate({
      fetchSample: async () => {
        const requestDate = new Date()
        const url = process.env.GET_TIME_SERVER
        const { headers, ok, statusText } = await fetch(url, {
          cache: 'no-store',
          method: 'HEAD'
        })
        console.log('{ headers, ok, statusText }', { headers, ok, statusText })

        if (!ok) {
          throw new Error(`Bad date sample from server: ${statusText}`)
        }

        return {
          requestDate,
          responseDate: new Date(),
          serverDate: new Date(headers.get('Date'))
        }
      }
    })
    window.serverDate = { date, offset, uncertainty }
    console.log(`The server's date is ${date} +/- ${uncertainty} milliseconds. offset:` + offset)
  }
  async function synchronizeTimeWithData (response) {
    window.serverDate = {}
    const { date, offset, uncertainty } = await getServerDate({
      fetchSample: async () => {
        if (response.status !== 200) {
          throw new Error(`Bad date sample from server: ${response.statusText}`)
        }
        const requestDate = new Date()
        return {
          requestDate,
          responseDate: new Date(),
          serverDate: new Date(response.headers.date)
        }
      }
    })
    window.serverDate = { date, offset, uncertainty }
    console.log(`The server's date is ${date} +/- ${uncertainty} milliseconds. offset:` + offset)
  }
  function now () {
    if (!window.serverDate?.offset) {
      window.serverDate.offset = 0
    }
    const serverDate = new Date(Date.now() + window.serverDate.offset)
    return moment(serverDate).format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  function getPassedTime (startTime, formattedTime) {
    const passedDiff = diff(now(), startTime)
    if (typeof formattedTime === 'undefined' || formattedTime === true) {
      return msToTime(passedDiff)
    }
    return passedDiff
  }

  function getRemainTime (endTime, formattedTime) {
    const remainDiff = diff(endTime, now())
    if (typeof formattedTime === 'undefined' || formattedTime === true) {
      return msToTime(remainDiff)
    }
    return remainDiff
  }

  function msToTime (s) {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z = 2) => ('00' + n).slice(-z)
    // + '.' + pad(s%1000, 3)
    return pad(s / 3.6e6 | 0) + ':' + pad((s % 3.6e6) / 6e4 | 0) + ':' + pad((s % 6e4) / 1000 | 0)
  }

  function addTime (amount, type, formattedTime, base) {
    if (formattedTime) {
      return moment(base).add(amount, type).format('YYYY-MM-DD HH:mm:ss')
    }
    return moment().add(amount, type).unix()
  }

  function diff (a, b) {
    const aDiff = moment(a)
    const bDiff = moment(b)
    return aDiff.diff(bDiff) // 86400000
  }

  function setStateOfExamCategories (categories, newState) {
    categories.list.forEach((category, index, categories) => {
      if (newState === true) {
        category.is_active = true

        return category
      }

      const prevCat = categories[index - 1]
      const lastCat = categories[categories.length - 1]
      const lastCatAcceptAtPassedTime = (!lastCat) ? -1 : getPassedTime(lastCat.accept_at, false)
      const prevCatAcceptAtRemainTime = (!prevCat) ? -1 : getRemainTime(prevCat.accept_at, false)
      const categoryAcceptAtRemainTime = (!category) ? -1 : getRemainTime(category.accept_at, false)
      const categoryAcceptAtPassedTime = (!category) ? -1 : getPassedTime(category.accept_at, false)

      if (lastCat && lastCatAcceptAtPassedTime > 0) {
        category.is_active = true
      } else if (prevCat && prevCatAcceptAtRemainTime > 0) {
        category.is_active = false
      } else if (categoryAcceptAtRemainTime > 0) {
        category.is_active = true
      } else if (categoryAcceptAtPassedTime > 0) {
        category.is_active = false
      }

      return category
    })
  }

  function getCurrentCategoryAcceptAt (categories) {
    const currentCat = categories.list.find((item) => item.is_active)
    const lastCat = categories[categories.length - 1]

    if (lastCat && getPassedTime(lastCat.accept_at, false) > 0) {
      return false
    } else if (currentCat && getRemainTime(currentCat.accept_at, false) > 0) {
      return currentCat
    }
  }

  function setStateOfQuestionsBasedOnActiveCategory (quiz, questions) {
    const currentActiveCategory = getCurrentCategoryAcceptAt(quiz.categories)
    if (!currentActiveCategory) {
      for (const questionId in questions) {
        questions[questionId].in_active_category = true
      }
      return
    }
    for (const questionId in questions) {
      questions[questionId].in_active_category = Assistant.getId(questions[questionId].sub_category.category_id) === Assistant.getId(currentActiveCategory.id)
    }
  }

  return {
    now,
    diff,
    msToTime,
    synchronizeTime,
    synchronizeTimeWithData,
    getRemainTime,
    getPassedTime,
    setStateOfExamCategories,
    getCurrentCategoryAcceptAt,
    setStateOfQuestionsBasedOnActiveCategory,
    addTime
  }
}())

export default Time
