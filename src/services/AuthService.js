import client from './client.js'

export default class AuthService {
  async login(payload) {
    const { data } = await client.post('auth/login', payload)

    return data
  }

  async getUser() {
    const { data } = await client.get('auth/user')

    return data
  }
}
