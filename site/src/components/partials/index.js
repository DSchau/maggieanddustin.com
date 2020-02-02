import Home from './home'
import Proposal from './proposal'
import Venue from './venue'

const lookup = {
  '/': Home,
  proposal: Proposal,
  venue: Venue,
}

export default path => {
  const existing = lookup[path]
  return existing || null
}
