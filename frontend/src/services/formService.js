import axios from 'axios'
const formCreateUrl = '/form/create'
const formListUrl = '/form/list'

class FormService {
  async createForms(params) {
    try {
      const response = await axios.post(formCreateUrl, params)
      return { data: response.data, error: null }
    } catch (error) {
      return { error: error }
    }
  }

  async listForms(params) {
    try {
      const response = await axios.post(formListUrl, params)
      return { data: response.data, error: null }
    } catch (error) {
      return { error: error }
    }
  }
}

export default FormService = new FormService()
