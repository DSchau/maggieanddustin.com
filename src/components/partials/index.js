import BachelorParty from './bachelor-party'
import Home from './home'
import Proposal from './proposal'
import Details from './details'
import { zola } from './rsvp/'

const lookup = {
  index: Home,
  'bachelor-party': BachelorParty,
  proposal: Proposal,
  details: Details,
  rsvp: zola,
}

export default (path) => {
  const existing = lookup[path]
  return existing || null
}
