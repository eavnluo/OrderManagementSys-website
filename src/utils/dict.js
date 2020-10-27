// 字典转换 code:String value:Number
export function translateDict (code, value) {
  let name = ''
  let dictList = JSON.parse(sessionStorage.getItem('dictList'))
  dictList.forEach(item => {
    if (code === item.code && value === item.value) {
      name = item.name
    }
  })
  return name
}

// 数值转换 Number 保留数字后两位
export function omitNumber (number) {
  return number ? number.toFixed(2) : 0
}
