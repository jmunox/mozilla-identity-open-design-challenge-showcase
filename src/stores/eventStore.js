import { store } from 'react-easy-state'
import { reqGet, reqPost } from 'utils/Req'

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const _store = store({
  isLoading: false,
  items: [{ name: 'Author 1', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }, { name: 'Author 2', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }],
  async fetchScrollItems(count) {
    let limit = count*50
    _store.isLoading = true
    const { res } = await reqGet('events?_page=1&_limit='+limit)
    _store.items = res
    _store.isLoading = false
  },


})

export default _store
