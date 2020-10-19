import { store } from 'react-easy-state'
import { reqGet, reqPost } from 'utils/Req'

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const _store = store({
  isLoading: false,
  items: [{ name: 'Todo Item 1', date: new Date(), content: 'Random 1' }, { name: 'Todo Item 2', date: new Date(), content: 'Random 2' }],
  async fetchItems() {
    _store.isLoading = true
    const { res } = await reqGet('events?_page=1&_limit=50')
    _store.items = res
    _store.isLoading = false
  },

  createFake({ name = `New Todo Item - ${+new Date()}` } = {}) {
    _store.items.push({ name, date: new Date() })
  },

  async create({ title = `New Todo Item - ${+new Date()}` } = {}) {
    let todo = { title, done: false }
    const { error } = await reqPost('todos', todo)
    if (!error)
    _store.items.push({ title, done: false })
  },
  

  remove(index) {
    _store.items.splice(index, 1)
  }
})

export default _store
