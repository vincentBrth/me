/**
 * Contact file (vCard 3.0) offered on the /card/ pages: adds name, title, phone, email, links and photo
 * to the visitor's address book. Built from the same settings as the email signature.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../data/site';
import { localePath, useTranslations, type Lang } from '../i18n/ui';

/** Escapes the characters that have a meaning in vCard values. */
const escape = (value: string) => value.replace(/[\\,;]/g, (c) => `\\${c}`);

/** Folds long lines (the photo above all), as the vCard format requires. */
const fold = (line: string) => line.match(/.{1,74}/g)!.join('\r\n ');

export function vcard(lang: Lang, origin: URL | undefined): Response {
  const t = useTranslations(lang);
  const [first, ...last] = site.name.split(' ');
  const photo = readFileSync(join(process.cwd(), 'public/card/me.png')).toString('base64');
  const linkedin = site.socials.find((s) => s.id === 'linkedin')!.href;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escape(last.join(' '))};${escape(first)};;;`,
    `FN:${escape(site.name)}`,
    `TITLE:${escape(t('hero.role'))}`,
    `EMAIL;TYPE=INTERNET:${site.email}`,
    ...(site.phone.show ? [`TEL;TYPE=CELL:${site.phone.href.replace('tel:', '')}`] : []),
    `URL:${new URL(localePath(lang), origin).href}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}`,
    `PHOTO;ENCODING=b;TYPE=PNG:${photo}`,
    'END:VCARD',
  ];

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
