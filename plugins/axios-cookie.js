import Axios from 'axios'

const options = { baseURL: 'https://v2.qspiders.com/' }

const ax = {
  create: (options, ctx) => {
    const axiosInstance = Axios.create(options)

    // credentials
    // axiosInstance.defaults.withCredentials = true

    // request interceptor
    axiosInstance.interceptors.request.use(async (req) => {
      // get the token at every request either from server or client
      // and send it as Bearer token
      var user = JSON.parse(localStorage.getItem("user"))
      if (user) {
        const token = user.token
        if (token) {
          req.headers.Authorization = `Token ${token}`
        }
      }
      return req
    })

    // response interceptor
    // axiosInstance.interceptors.response.use((res) => {
    // if you have a refresh token.....get and set it after each response
    // so that the next axios request does not expire
    //   const refreshToken = res.headers['refresh-token']
    //   if (refreshToken ) {
    //     ctx.app.$cookies.set('token', refreshToken , {
    //       path: '/',
    //       expires: ctx.app.$date.addWeeks(new Date(), 2)
    //     })
    //   }
    //   return res
    // })

    return axiosInstance
  }
}

export default (ctx, inject) => {
  inject('axios', ax.create(options, ctx))
}