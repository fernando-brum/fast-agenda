# fast-agenda
Extensão de agenda para Google Chrome (Manifest V3).


## Estrutura do Projeto

/
├── docs/                      # Conteúdo estático para publicação no GitHub Pages
│   ├── index.html             # Página principal (popup.html renomeado)
│   ├── popup.js               # Script do popup
│   ├── popup.css              # Estilos do popup
│   └── icons/                 # Ícones usados na interface web
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
├── src/                       # Código fonte da extensão Chrome
│   ├── background/
│   │   └── service-worker.js  # Service worker para background
│   ├── content/
│   │   └── content.js         # Script de conteúdo
│   └── popup/
│       ├── popup.html         # Popup original (para extensão)
│       ├── popup.js
│       └── popup.css
├── icons/                     # Ícones originais para extensão (copiados para docs/icons)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── manifest.json              # Manifesto da extensão Chrome
├── README.md                  # Documentação do projeto
└── 
