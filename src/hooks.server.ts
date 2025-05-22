import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://192.168.245.137:3000",
    ];

    // if (!allowedOrigins.includes(event.url.origin)) return;

    const response = await resolve(event);
    return response;
};