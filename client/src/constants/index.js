import { Input, Select } from 'components/utils';

export const LINKS = [
  { url: '/', title: 'Dashboard', protected: true },
  { url: '/ledger', title: 'Ledger', protected: true },
  { url: '/login', title: 'Log In', protected: false },
  { url: '/register', title: 'Register', protected: false },
  { url: '/settings', title: 'Settings', protected: true },
  { url: '/', title: 'Log Out', protected: true },
];

export const LOADING_DELAY = 450;

export const LOADING = 'loading';

export const TAG_MAPPING = {
  select: Select,
  input: Input,
};
