import axios from 'axios'
const formCreateUrl = '/form/create'
const formListUrl = '/form/list'
const formUpdateUrl = '/form/update'
const getFormUrl = '/form/getForm'

class FormService {
  async createForms(params: any) {
    try {
      const response = await axios.post(formCreateUrl, params)
      return { data: response.data, error: null }
    } catch (error) {
      return { error: error }
    }
  }

  async listForms(params: any) {
    try {
      const response = await axios.post(formListUrl, params)
      return { data: response.data, error: null }
    } catch (error) {
      return { error: error }
    }
  }

  async updateForm(params: any) {
    try {
      const response = await axios.post(formUpdateUrl, params)
      return { data: response.data, error: null }
    } catch (error) {
      return { error: error }
    }
  }

  async getForm(formId: any) {
    try {
      const response = await axios.post(getFormUrl, { formId: formId })
      return { data: response, error: null }
    } catch (error) {
      return { error: error }
    }
  }
}

export default new FormService()
