import { libcurl } from "libcurl.js/bundled";
import { parse, serialize } from "parse5";

import { rewriteNode } from "./rewriter.mjs";

function modifyRecursive(node, tagName, callback) {
  for (let child of node.childNodes) {
    if (child.childNodes) modifyRecursive(child, tagName, callback);
    callback(child);
  }
}

/**
 * @param {Response} res
 */
export async function rewriteRequest(res) {
  let mime = res.headers.get("Content-Type");
  if (!mime) return res;

  if (mime.startsWith("text/html")) {
    let body = await res.text();
    let tree = parse(body);

    modifyRecursive(tree, "a", (child) => {rewriteNode(child, res.url)});

    body = serialize(tree);

    res = new Response(new Blob([body], { type: "text/html" }));
  }

  return res;
}

export async function handle(uri) {
  libcurl.set_websocket(`wss://anura.pro/`);
  let res = await libcurl.fetch(uri);

  console.log("Got status code: " + res.status);

  return rewriteRequest(res); 
}
