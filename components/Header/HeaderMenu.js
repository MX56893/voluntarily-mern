import { FormattedMessage } from 'react-intl'

export const MenuShowState = {
  ANON: 'anon', // option shows for non signed in people
  AUTH: 'auth',
  BASIC: 'basic', // option shows for signed in people
  VOLUNTEER: 'volunteer', // option shows for signed in volunteer
  BOTH: 'both', // option shows for both ask and offer
  ADMIN: 'admin' // option shows for signed in admin
}
const { ANON, AUTH, BASIC, VOLUNTEER, BOTH, ADMIN } = MenuShowState

const menuItems = [
  {
    key: 'home',
    show: [AUTH, BASIC, VOLUNTEER, BOTH, ADMIN],
    href: '/home',
    text:
  <FormattedMessage
    id='HeaderMenu.home'
    defaultMessage='Home'
  />
  },
  {
    key: 'acts_ask',
    show: [BASIC, BOTH, ADMIN],
    href: '/acts/type/ask',
    text:
  <FormattedMessage
    id='HeaderMenu.acts_ask'
    defaultMessage='Ask for help'
  />
  },
  {
    key: 'acts_offer',
    show: [VOLUNTEER, BOTH, ADMIN],
    href: '/acts/type/offer',
    text:
  <FormattedMessage
    id='HeaderMenu.acts_offer'
    defaultMessage='Offer to help'
  />
  },
  {
    key: 'habout',
    show: [AUTH, ANON],
    href: 'https://blog.voluntarily.nz',
    text:
  <FormattedMessage
    id='HeaderMenu.about'
    defaultMessage='About'
  />
  },
  {
    key: 'admin',
    text: 'Admin',
    href: '/admin',
    show: [ADMIN]
  },
  {
    key: 'orgs',
    text: 'Groups',
    href: '/orgs',
    show: [ADMIN]

  },
  {
    key: 'people',
    text: 'People',
    href: '/people',
    show: [ADMIN]
  },
  {
    key: 'help',
    show: [ANON, AUTH, BASIC, VOLUNTEER, BOTH, ADMIN],
    text: 'Support 🙋🏽‍♀️',
    href: 'https://support.voluntarily.nz/hc/en-nz'
  },
  {
    key: 'hsignin',
    show: [ANON],
    href: '/home',
    text:
  <FormattedMessage
    id='HeaderMenu.sign-in'
    defaultMessage='Sign in'
  />
  },
  {
    key: 'hsignoff',
    show: [AUTH, BASIC, VOLUNTEER, BOTH, ADMIN],
    href: '/auth/sign-off',
    text:
  <FormattedMessage
    id='HeaderMenu.sign-out'
    defaultMessage='Sign out'
  />
  }
]

export const headerMenu = (state) => menuItems.filter(l => l.show.includes(state))

export default headerMenu
