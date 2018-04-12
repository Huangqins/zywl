const Assets = () =>
  import ('views/assets/assets')
const AssetsManage = () =>
  import ('views/assets/assetsManage')

const assetsRoutes = [{
  path: '/assets/',
  component: Assets,
  children: [{
    path: 'assetsManage',
    component: AssetsManage
  }]
}]

export default assetsRoutes
