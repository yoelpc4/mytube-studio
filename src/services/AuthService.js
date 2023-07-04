import client from './client.js'

export default class AuthService {
  async login(payload) {
    const { data } = await client.post('auth/login', payload)

    return data
  }

  async updateProfile(payload) {
    const { data } = await client.post('auth/update-profile', payload)

    return data
  }

  async updatePassword(payload) {
    const { data } = await client.post('auth/update-password', payload)

    return data
  }

  async getUser() {
    const { data } = await client.get('auth/user')

    return data
  }
}
