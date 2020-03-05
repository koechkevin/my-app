import {SocialLink} from './redux/reducers/user';

export const matchUrl = (socialLinks: SocialLink[], name: string): string => {
  const link = socialLinks.find((social: SocialLink) => social.name === name);
  return link?.link || '';
};