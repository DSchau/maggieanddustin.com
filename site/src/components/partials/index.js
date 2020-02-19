import Home from './home'
import Proposal from './proposal'
import Details from './details'

const lookup = {
  '/': Home,
  proposal: Proposal,
  details: Details,
}

export default path => {
  const existing = lookup[path]
  return existing || null
}
