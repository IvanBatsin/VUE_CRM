import store from '../store/';

const locales = {
  'ru-RU': {
    profileTitle: 'Профиль'
  },
  'en-US': {
    profileTitle: 'Profile'
  }
};

export const localizeFilter = (key) => {
  const locale = store.getters.info.locale || 'ru-RU';
  return locales[locale][key] || `[Localize error] key - ${key} not found`;
}