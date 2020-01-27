import axios from 'axios'

let API_URL

if (process.env.NODE_ENV === 'production') {
  API_URL = process.env.API_URL
} else {
  API_URL = process.env.API_URL || 'http://localhost:3000'
}

const REMINDERS_URL = API_URL + '/reminder'

export default {
  async getAll () {
    const response = await axios.get(REMINDERS_URL)
    if (response.status !== 200) {
      throw new Error('wrong response from the server, please make sure you are connected')
    }
    return response.data
  }
}
