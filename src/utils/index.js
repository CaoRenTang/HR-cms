/**
 * 人资项目配套公用方法
 * @param {*} list
 */
/**
 * 转换树形数据
 * @param {*} list 需要转换的部门数据
 * @returns
 */
export function listToTreeData(list) {
  const treeList = []
  const map = {}
  list.forEach(item => {
    map[item.id] = item
  })
  list.forEach(item => {
    if (item.pid === '-1') return
    const parent = map[item.pid]
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    } else {
      treeList.push(item)
    }
  })
  return treeList
}

/**
 * excel导入插件方法：excel时间格式化
 * @param {*} numb excel时间格式
 * @param {*} format 转换分隔符
 * @returns 标准时间格式
 */
export function formatExcelDate(numb, format) {
  // 天数
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  console.log(time)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() + ''
  // 转换的格式符号
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}

/**
 * excel导入插件方法：key中文转英文
 * @param {*} results 需要转换的数据
 * @param {*} maps 转换数据的中英映射关系
 * @param {*} times 需要格式化的excel时间属性名
 * @returns
 */
export function transformKeys(results, maps, times = []) {
  const newArr = []
  results.forEach(item => {
    // 替换为key是英文的新对象，添加进数组
    const _item = {}
    for (const key in item) {
      const enKey = maps[key]
      if (times.includes(enKey)) {
        // 格式化excel时间
        _item[enKey] = formatExcelDate(item[key], '-')
      } else {
        _item[enKey] = item[key]
      }
    }
    newArr.push(_item)
  })
  return newArr
}

/**
 * excel导出插件方法：转换导出的表格数据为二维数组
 * @param {*} list 表格数据
 * @param {*} exportHeader 导出表头（属性名）数组
 * @returns
 */
export function transformTdata(list, exportHeader) {
  const secondArray = []
  list.forEach(item => {
    const item_array = []
    for (const enKey in item) {
      if (exportHeader.includes(enKey)) {
        item_array.push(item[enKey])
      }
    }
    secondArray.push(item_array)
  })
  return secondArray
}
