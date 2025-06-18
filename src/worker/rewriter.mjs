const urlPrefix = "/rynic/?uri=";

/**
 * @param {string} url
 * @param {string} window
 */
function rewriteURL(url, window) {
  if (!url.startsWith("http")) {
    let windowURL = new URL(window);
    let bare = `${windowURL.protocol}//${windowURL.hostname}/`;
    if (url.startsWith("/")) {
      url = url.substring(1);
    }
    console.log(`Rewriting ${url} -> ${bare + url}`);
    return urlPrefix + encodeURIComponent(bare + url);
  }
  console.log(`Rewriting ${url} -> ${url}`);
  return urlPrefix + encodeURIComponent(url);
}

function rewriteAttr(node, targetAttr, url) {
  for (let attr of node.attrs) {
    if (attr.name == targetAttr) attr.value = rewriteURL(attr.value, url);
  }
}

export function rewriteNode(node, url) {
  if (!node.tagName) return;

  if (node.tagName == "a") {
    rewriteAttr(node, "href", url);
  } else if (node.tagName == "link") {
    rewriteAttr(node, "href", url);
  } else if (node.tagName == "img") {
    rewriteAttr(node, "src", url);
  }
}
