import type { APIRoute } from 'astro';
import { vcard } from '../../lib/vcard';

export const GET: APIRoute = ({ site }) => vcard('fr', site);
