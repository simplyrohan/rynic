const urlPrefix = "/rynic/?uri=";

const urlInput = document.getElementById("url-input");
const urlSubmit = document.getElementById("submit");
const tabFrame = document.getElementById("tab");

urlSubmit.addEventListener("click", () => {
  tabFrame.src = urlPrefix + encodeURIComponent(urlInput.value);
});