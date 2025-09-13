// realizando a escuta de mensagens oriundas do popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_SELECTION') {
        sendResponse(window.getSelection().toString());
    }
});