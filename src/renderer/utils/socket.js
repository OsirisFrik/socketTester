import io from 'socket.io-client'
import Store from '../store'

const toast = (value) => Store.commit('TOAST', value)

class ScoketConnection {
  constructor (
    host,
    headers = [],
    querys = [],
    path = { active: false }
  ) {
    this.socket = io.connect(host, {
      path: (path.active ? path.value : null),
      query: this.formatQuerys(querys),
      extraHeaders: this.formatHeaders(headers)
    })

    this.socket.on('connect', () => toast({
      message: 'Socket connected',
      type: 'is-success'
    }))

    this.socket.on('disconnect', () => toast({
      message: 'Socket disconnected',
      type: 'is-warning'
    }))
  }

  formatQuerys (querys = []) {
    let querysFormated = {}

    for (let i = 0; i < querys.length; i++) {
      const query = querys[i]

      if (query.active) querysFormated[query.name] = query.value
    }

    return querysFormated
  }

  formatHeaders (headers = []) {
    let headersFormated = {}

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]

      if (header.active) {
        if (typeof headersFormated[header.name] !== 'undefined' && headersFormated[header.name] !== null) {
          headersFormated[header.name] += `; ${header.value}`
        } else {
          headersFormated[header.name] = header.value
        }
      }
    }

    return headersFormated
  }
}

export default ScoketConnection
