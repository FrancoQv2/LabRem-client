export function getDateNow() {
    let ts = Date.now()
    let date_ob = new Date(ts)

    let year = date_ob.getFullYear()
    let month = (date_ob.getMonth() + 1) < 10 ? `0${date_ob.getMonth() + 1}` : (date_ob.getMonth() + 1)
    let date = date_ob.getDate() < 10 ? `0${date_ob.getDate()}` : date_ob.getDate()

    return `${year}-${month}-${date}`
}

export function getTimeNow() {
    let ts = Date.now()
    let date_ob = new Date(ts)

    let hours = date_ob.getHours() < 10 ? `0${date_ob.getHours()}` : date_ob.getHours()
    let minutes = date_ob.getMinutes() < 10 ? `0${date_ob.getMinutes()}` : date_ob.getMinutes()
    let seconds = date_ob.getSeconds() < 10 ? `0${date_ob.getSeconds()}` : date_ob.getSeconds()

    return `${hours}:${minutes}:${seconds}`
}
