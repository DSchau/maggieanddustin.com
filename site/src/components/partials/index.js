import BachelorParty from './bachelor-party'
import Home from './home'
import Proposal from './proposal'
import Details from './details'
import RSVP from './rsvp'

const lookup = {
  index: Home,
  'bachelor-party': BachelorParty,
  proposal: Proposal,
  details: Details,
  rsvp: RSVP,
}

export default path => {
  const existing = lookup[path]
  return existing || null
}
