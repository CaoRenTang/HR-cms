// 项目全局自定义指令
// 1.给元素添加边框
export const border = {
  inserted(dom, options) {
    console.log('指令参数', dom, options)
    dom.style.border = `10px solid ${options.value || 'red'}`
  }
}
// 2.图片加载失败，显示默认图片
export const imgError = {
  inserted(dom, options) {
    dom.onerror = () => {
      dom.src = options.value
    }
  }
}
