export function getDateNow() {
  const ts = Date.now()
  const actualDate = new Date(ts)

  const year = actualDate.getFullYear()
  const month = actualDate.getMonth() + 1 < 10 ? `0${actualDate.getMonth() + 1}` : actualDate.getMonth() + 1
  const date = actualDate.getDate() < 10 ? `0${actualDate.getDate()}` : actualDate.getDate()

  return `${year}-${month}-${date}`
}

export function getTimeNow() {
  const ts = Date.now()
  const actualDate = new Date(ts)

  const hours = actualDate.getHours() < 10 ? `0${actualDate.getHours()}` : actualDate.getHours()
  const minutes = actualDate.getMinutes() < 10 ? `0${actualDate.getMinutes()}` : actualDate.getMinutes()
  const seconds = actualDate.getSeconds() < 10 ? `0${actualDate.getSeconds()}` : actualDate.getSeconds()

  return `${hours}:${minutes}:${seconds}`
}
