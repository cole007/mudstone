import Concert from 'concert'

function Events() {}

Object.assign(Events.prototype, Concert)

export const events = new Events()