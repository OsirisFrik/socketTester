import Store from 'electron-store'

// Schemas
import tabsSchema from './store/schemas/tab'

// Controllers
import TabCtrl from './store/controllers/tab'

const store = new Store({ schema: { tabs: tabsSchema } })
const tabsCtrl = new TabCtrl(store)

export default store

export {
  tabsCtrl
}
