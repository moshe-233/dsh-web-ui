import { isLoopbackRequest } from "./loopback.js";
/**
 * Whether this request may enter any /aionui-panel route.
 * @param ctx - host context; may expose remoteWebUiPairing.
 * @param request - the incoming HTTP request.
 * @returns true for loopback, or a live paired-device cookie.
 */
export function isPanelAllowed(ctx, request) {
    if (isLoopbackRequest(request))
        return true;
    const bag = ctx;
    const fromGet = typeof bag.get === 'function' ? bag.get('remoteWebUiPairing', false) : undefined;
    const pairing = (isPairingAccess(fromGet) ? fromGet : bag.remoteWebUiPairing);
    return pairing?.isPairedDevice(request) === true;
}
function isPairingAccess(value) {
    return value !== undefined
        && value !== null
        && typeof value.isPairedDevice === 'function';
}
