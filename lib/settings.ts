export const languages = ['en', 'uk'] as const;
export type Locale = (typeof languages)[number];
export const defaultLocale: Locale = 'en';
