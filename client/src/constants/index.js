import { Input, Select } from 'components/utils';
import { Dashboard, LogIn, Ledger, Register } from 'pages';
import Settings from 'pages/Settings';

export const LINKS = [
  { url: '/', title: 'Dashboard', protected: true },
  { url: '/ledger', title: 'Ledger', protected: true },
  { url: '/settings', title: 'Settings', protected: true },
];

export const NAV_LINKS = [
  { url: '/', title: 'Log Out', protected: true },
  { url: '/login', title: 'Log In', protected: false },
  { url: '/register', title: 'Register', protected: false },
];

export const LOADING_DELAY = 450;

export const LOADING = 'loading';

export const TAG_MAPPING = {
  select: Select,
  input: Input,
};

export const ACCESSIBLE_HEADER = 'Dashboard by J.R.';

export const ROUTES = [
  { path: '/', element: Dashboard },
  { path: '/login', element: LogIn },
  { path: '/ledger', element: Ledger },
  { path: '/register', element: Register },
  { path: '/settings', element: Settings },
];
