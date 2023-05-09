import moment from 'moment'

export const getPriorityColor = priority => {
  if (priority === 'high') return 'red'
  if (priority === 'medium') return 'yellow'
  if (priority === 'low') return 'green'
  return 'green'
}

export const getFormattedTitle = (title, count) => {
  return title.slice(0, count).trim() + (title.length > count ? '...' : '')
}

export const getFormattedDeadline = deadline => {
  return moment(deadline).format('DD MMM YYYY hh:mm')
}

export const getExpired = (date, completed) => new Date(date) < new Date() && !completed
