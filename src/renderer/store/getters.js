const getters = {
  tabs: state => state.Tabs.tabs,
  tabId: state =>
    tabId => state.Tabs.tabs.find(tab => tab.id === tabId)
}

export default getters
