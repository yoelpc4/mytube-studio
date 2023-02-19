import client from './client.js'

export default class ContentService {
  async getContents(params = {}) {
    const { data } = await client.get('contents', {
      params,
    })

    return data
  }

  async createContent(payload) {
    const { data } = await client.post('contents', payload, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })

    return data
  }

  async updateContent(id, payload) {
    const { data } = await client.put(`contents/${id}`, payload)

    return data
  }

  async deleteContent(id) {
     await client.delete(`contents/${id}`)
  }
}
