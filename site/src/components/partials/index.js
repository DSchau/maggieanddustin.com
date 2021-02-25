import BachelorParty from './bachelor-party'
import Home from './home'
import Proposal from './proposal'
import Details from './details'
import { zola, custom } from './rsvp/'

const lookup = {
  index: Home,
  'bachelor-party': BachelorParty,
  proposal: Proposal,
  details: Details,
  rsvp: process.env.GATSBY_RSVP_TYPE === 'custom' ? custom : zola,
}

export default path => {
  const existing = lookup[path]
  return existing || null
}
