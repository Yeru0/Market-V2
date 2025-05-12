import { writable } from "svelte/store";
import { PUBLIC_WEBSOCKET_ADDRESS } from "$env/static/public";
import WebSocket from 'ws';

export let priceListStateSellingToOrg = writable(false);

export let priceListWebSocket = writable({
    ws: new WebSocket(`ws://${PUBLIC_WEBSOCKET_ADDRESS}:8083/prices`),
    id: ""
});
