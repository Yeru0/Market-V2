import { writable, type Writable } from 'svelte/store';
import { PUBLIC_WEBSOCKET_ADDRESS } from '$env/static/public';

export let priceListStateSellingToOrg: Writable<boolean> = writable(false);

export let priceListWebSocket: Writable<{
	ws: WebSocket;
	id: string;
}> = writable({});
