import axios from 'axios'
const baseUrl = '/api/posts'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newPost => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newPost, config)
  return response.data

}

const like = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, {}, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, like, remove }