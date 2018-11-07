import {getUILanguage} from './locales';

export const BLOG_URL = 'https://darkreader.org/blog/';
export const DEVTOOLS_DOCS_URL = 'https://github.com/alexanderby/darkreader#how-to-contribute';
export const GITHUB_URL = 'https://github.com/agatt1/Illumify';
export const PRIVACY_URL = 'https://shounabraham.github.io/IllumifyPrivacy/';

export function getHelpURL() {
    const helpLocales = ['be', 'cs', 'de', 'en', 'it', 'ru'];
    const locale = getUILanguage();
    const matchLocale = helpLocales.find((hl) => hl === locale) || helpLocales.find((hl) => locale.startsWith(hl)) || 'en';
    return `https://shounabraham.github.io/IllumifyHelp/`;
}

export function getBlogPostURL(postId: string) {
    return `${BLOG_URL}${postId}/`;
}
