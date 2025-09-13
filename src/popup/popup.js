document.addEventListener('DOMContentLoaded', async () => {
    const titleEl = document.getElementById('title');
    const datetimeEL = document.getElementById('datetime');
    const urlEl = document.getElementById('url');
    const notesEl = document.getElementById('notes');
    const addBtn = document.getElementById('add-event');
    const cancelBtn = document.getElementById('cancel-event');
    const eventBtn = document.getElementById('event-list');

    //Carregando a URL atual da aba
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        urlEl.value = tab.url;
    });

    //carregando um texto selecionado
    chrome.tabs.executeScript({ code: "window.getSelection().getSelection().toString();" }, selection => {
        if (selection && selection[0]) {
            notesEl.value = selection[0];
        }
    });

    //carregando os eventos existentes
    const loadEvents = async () => {
        eventList.innerHTML = '';
        const { events = [] } = await
        chrome.storage.local.get(['events']);
            events.forEach((event, index) => {
                const li = document.createElement('li');
                li.className = 'event-item';
                li.innerHTML = `
                <strong>${event.title}</strong><br>
                <a href="${event.url}" target="_blank">${event.url}</a><br>
                <small>${event.datetime}</small><br>
                <p>${event.notes}</p>
                <button data-index="${index}">X</button>
                `;
                eventList.appendChild(li);
            });
    };

    //Adicionar novo evento
    addBtn.addEventListener('click', async () => {
        const title = titleEl.value.trim();
        const url = urlEl.value.trim();
        const notes = notesEl.value.trim();
        const datetime = datetimeEl.value;

        if(!title) {
            alert("O título é obrigatório.");
            return;
        }

        if(!confirm("Adicionar este evento?")) return;
        const { events = [] } = await
        chrome.storage.local.get(['events']);
            events.push({ title, url, datetime, notes});
            await chrome.storage.local.set({ events });

            titleEl.value = '';
            datetimeEl.value = '';
            notesEl.values = '';

            await loadEvents();
    })

    //Cancelar preenchimento
    cancelBtn.addEventListener('click', () => {
        if (confirm("Cancelar preenchimento ?")) {
            titleEl.value = '';
            datetimeEl.value = '';
            notesEl.value = '';
        }  
    });

    //Deletar um evento
    eventList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            if (!confirm("Deseja realmente remover este evento?")) return;

            const { events = [] } = await
        chrome.storage.local.get(['events']);
            events.splice(index, 1);
            await chrome.storage.local.set({ events });

            await loadEvents();

        }

    });

    await loadEvents();
});