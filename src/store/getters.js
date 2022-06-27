// 快捷访问，子模块数据
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 访问user模块数据
  token: state => state.user.token,
  // 用户头像
  avatar: state => state.user.userInfo.staffPhoto,
  // 用户名
  name: state => state.user.userInfo.username,
  // 部门
  deptName: state => state.user.userInfo.departmentName,
  // 手机号
  iphone: state => state.user.userInfo.mobile
}
export default getters
