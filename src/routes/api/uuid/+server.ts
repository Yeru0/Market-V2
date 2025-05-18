import crypto from 'node:crypto';
import { json } from '@sveltejs/kit';

export const GET = () => {
	return json(crypto.randomUUID());
};
