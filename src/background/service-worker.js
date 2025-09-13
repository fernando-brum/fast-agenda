chrome.runtime.onInstalled.addListener(() => {
    console.log('Fast Agenda listalado com sucesso!!!');

    chrome.storage.local.set({ installedAt: Date.now() });

    chrome.storage.local.get(['events'], (result) => {
        if (!result.events) {
            chrome.storage.local.set({ events: []});
        }
    });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'PING') {
        sendResponse({ ok: true, time: new Date().toISOString() });
    }
});