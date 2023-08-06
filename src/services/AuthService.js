import client from './client.js'

export default class AuthService {
  async logout() {
    await client.post('auth/logout')
  }

  async getUser() {
    const { data } = await client.get('auth/user')

    return data
  }
}
