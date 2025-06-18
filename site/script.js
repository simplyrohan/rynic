const urlPrefix = "/?uri="

urlInput = document.getElementById("url-input");
urlSubmit = document.getElementById("submit");
tabFrame = document.getElementById("tab");

urlSubmit.addEventListener('click', () => {
    tabFrame.src = urlPrefix + encodeURIComponent(urlInput.value);
})