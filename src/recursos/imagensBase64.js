// Imagens em formato base64 para uso imediato no app
// Estas são imagens simples de exemplo - substitua por imagens reais

// Ovo comum (emoji em base64)
export const ovoComum = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDEyOCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTQ0IiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjY0Ij7wn6WaPC90ZXh0Pgo8L3N2Zz4K';

// Ovo raro (brilhante)
export const ovoRaro = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDEyOCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTQ0IiBmaWxsPSJsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM0RjQ2RTUgMCUsICM3QzNBRUQgMTAwJSkiIG9wYWNpdHk9IjAuMSIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2NCI+8J+lmjwvdGV4dD4KPHN2ZyB4PSI1MCUiIHk9IjMwJSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2LC0xNikiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+Cjx0ZXh0IGZvbnQtc2l6ZT0iMjQiPuKcqDwvdGV4dD4KPC9zdmc+Cjwvc3ZnPgo=';

// Ovo épico
export const ovoEpico = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDEyOCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTQ0IiBmaWxsPSJsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM4QjAwRkYgMCUsICNBMzAwRkYgMTAwJSkiIG9wYWNpdHk9IjAuMiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2NCI+8J+lmjwvdGV4dD4KPC9zdmc+Cg==';

// Ovo lendário
export const ovoLendario = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDEyOCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTQ0IiBmaWxsPSJsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNGRkQ3MDAgMCUsICNGRkE1MDAgMTAwJSkiIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2NCI+8J+lmjwvdGV4dD4KPC9zdmc+Cg==';

// Bichinhos em formato emoji/unicode para demonstração
export const bichinhoEmojis = {
  // Comuns
  'gatinho': '🐱',
  'cachorrinho': '🐶',
  'passarinho': '🐦',
  'coelhinho': '🐰',
  'hamster': '🐹',
  
  // Raros
  'unicornio': '🦄',
  'phoenix': '🔥',
  'dragao': '🐉',
  'fada': '🧚',
  
  // Épicos
  'leao-dourado': '🦁',
  'aguia-real': '🦅',
  'lobo-lunar': '🐺',
  
  // Lendários
  'cosmic-cat': '🌌',
  'stellar-bird': '⭐',
  'time-guardian': '⏰',
};

// Função para gerar SVG com emoji
export const gerarImagemBichinho = (nomeBichinho, tamanho = 128) => {
  const emoji = bichinhoEmojis[nomeBichinho] || '🐾';
  
  const svg = `
    <svg width="${tamanho}" height="${tamanho}" viewBox="0 0 ${tamanho} ${tamanho}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${tamanho}" height="${tamanho}" fill="none"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${tamanho * 0.6}">${emoji}</text>
    </svg>
  `;
  
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
};

// Função para obter imagem do ovo por raridade
export const obterImagemOvoPorRaridade = (raridade = 'comum') => {
  switch (raridade) {
    case 'raro': return ovoRaro;
    case 'epico': return ovoEpico;
    case 'lendario': return ovoLendario;
    default: return ovoComum;
  }
};

// Função para obter cor de borda por raridade
export const obterCorPorRaridade = (raridade) => {
  switch (raridade) {
    case 'comum': return '#808080';
    case 'raro': return '#0080FF';
    case 'epico': return '#8B00FF';
    case 'lendario': return '#FFD700';
    default: return '#808080';
  }
};
