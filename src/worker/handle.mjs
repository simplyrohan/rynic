import { libcurl } from "libcurl.js/bundled";

export async function rewriteRequest(res) {
    return res
}

export async function handle(uri) {
    libcurl.set_websocket(`wss://anura.pro/`);
    let res = await libcurl.fetch(uri);

    console.log("Got status code: " + res.status);

    return rewriteRequest(res);
}