import _ from 'lodash'

export default class {
  constructor() {
    this.handlers = []
  }

  observe(handler) {
    this.handlers.push(handler)
  }

  fire() {
    _.forEach(this.handlers, h => h())
  }
}
