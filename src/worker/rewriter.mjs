const urlPrefix = "/rynic/?uri=";

function rewriteURL(url) {
    return urlPrefix + encodeURIComponent(url);
}

function rewriteAnchor(anchor) {
  for (let attr of anchor.attrs) {
    if (attr.name == "href") attr.value = rewriteURL(attr.value);
  }
}

export function rewriteNode(node) {
  if (!node.tagName) return;

  if (node.tagName == "a") {
    rewriteAnchor(node);
  }
}
