import { handle } from "./handle.mjs";

console.log("Rynic SW registered!");

self.addEventListener("fetch", async function (event) {
  let url = new URL(event.request.url);
  let ref = new URL(event.request.referrer);

  let uri;
  if (url.searchParams.get("uri")) {
    uri = url.searchParams.get("uri");
  } else if (ref.searchParams.get("uri")) {
    console.log("relative");
    let hostURL = new URL(ref.searchParams.get("uri"));

    let relURL = "/" + url.pathname.split("/").slice(2).join("/");

    uri = `${hostURL.protocol}//${hostURL.hostname}${hostURL.pathname
      .split("/")
      .slice(0, -1)
      .join("/")}${relURL}`;
  }

  if (!uri) event.respondWith(handle(event.request.url));
  else {
    console.log(`Intercepting request for '${uri}'`);
    event.respondWith(handle(uri));
  }
});
