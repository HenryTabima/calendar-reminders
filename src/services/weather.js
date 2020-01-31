import axios from 'axios'
import * as moment from 'moment'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

// The best practice is to get the APP_ID form a non tracked file
const APP_ID = '1e1a64ed3720bb82545e1d5db123772b'

const WEATHER_ICON_BASE_URL = 'http://openweathermap.org/img/wn/'

export async function getTemperatureByCityName (cityName) {
  const response = await axios.get(`${BASE_URL}?appid=${APP_ID}&q=${cityName}`)
  const data = response.data
  if (!data.main) throw new Error('city not found')
  const temp = data.main.temp
  return {
    c: kelvinToCelcius(temp),
    f: kelvinToFahrenheit(temp)
  }
}

export async function getWeatherByCityAndDate (cityName, date) {
  const isAfter = moment(date).isAfter(moment())
  const SELECTED_URL = isAfter ? FORECAST_URL : BASE_URL
  try {
    const url = `${SELECTED_URL}?appid=${APP_ID}&q=${cityName}`
    console.log(url)
    const response = await axios.get(url)
    const data = response.data
    return parseWeatherData(data, date, isAfter)
  } catch (err) {
    throw new Error('Weather not Found')
  }
}

const kelvinToCelcius = temp => (temp - 273.15).toFixed(1)
const kelvinToFahrenheit = temp => ((temp - 273.15) * (9 / 5) + 32).toFixed(1)

function parseWeatherData (data, date, isAfter) {
  let res = data
  if (isAfter) {
    res = data.list.filter(({ dt }) => {
      const itemDate = moment.unix(dt).format('YYYY-MM-DD')
      const reminderDate = moment(date).format('YYYY-MM-DD')
      return itemDate === reminderDate
    }).pop()
  }
  // debugger
  return {
    text: res.weather[0].description,
    icon: `${WEATHER_ICON_BASE_URL}${res.weather[0].icon}.png`
  }
}
