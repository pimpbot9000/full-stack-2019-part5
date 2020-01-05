const posts = [
  {
    likes: 1,
    title: 'This is a full stack course',
    author: 'Tumppu Dumppu',
    url: 'bbbb',
    user: {
      username: 'pimpbot9000',
      id: '5debc040da39c52e7cfa3f16'
    },
    id: '5e0cd8b1c4ed384874e5ed95'
  },
  {
    likes: 30,
    title: 'nnnnn',
    author: 'Tumppu Dumppu',
    url: 'vvvvvv',
    user: {
      username: 'pimpbot9000',
      id: '5debc040da39c52e7cfa3f16'
    },
    id: '5e0cd8e1c4ed384874e5ed96'
  },
  {
    likes: 40,
    title: 'China is Democracy',
    author: 'Tumppu Dumppu',
    url: 'Dondal D. Drump',
    user: {
      username: 'user',
      id: '5e0f848924e5194640cc481e'
    },
    id: '5e0f851824e5194640cc481f'
  }
]

const getAll = () => {
  return Promise.resolve(posts)
}

const setToken = (token) => {

}

export default { getAll, setToken }