import { writable } from "svelte/store";

export let priceListStateSellingToOrg = writable(false);

export let priceListWebSocket = writable({
    ws: new WebSocket("ws://192.168.50.81:8083/prices"),
    id: ""
});
