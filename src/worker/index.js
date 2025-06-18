import { handle } from "./handle.mjs";

console.log("Rynic SW registered!");

self.addEventListener("fetch", async function (event) {
  let url = new URL(event.request.url);

  if (url.pathname.startsWith("/rynic")) {
    let uri = url.searchParams.get("uri");
    console.log(`Intercepting request for '${uri}'`);

    event.respondWith(handle(uri));
  } else {
    event.respondWith(fetch(event.request.url));
  }
});
