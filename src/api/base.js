// 开发环境
const dev = {
  ksAdmin: 'http://127.0.0.1:8880/api/web',
  /* ksAdmin: 'http://apis.kaishengjwt.com/api/web', */
  imgUrl: 'http://www.kaishengjwt.com/files'
}

// 生产环境
const prod = {
  ksAdmin: 'http://apis.kaishengjwt.com/api/web',
  imgUrl: 'http://www.kaishengjwt.com/files'
}

let base = process.env.NODE_ENV === 'development' ? dev : prod

export { base }
