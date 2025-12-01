// Banco de dados de vacinas com informacoes e redirecionamentos
const vaccines = [
  { nome: 'Dengue - Qdenga', slug: 'dengue-qdenga', arquivo: 'dengue-qdenga.html', cores: ['#DC2626', '#B91C1C'] },
  { nome: 'Dengue - Dengvaxia', slug: 'dengue-dengvaxia', arquivo: 'dengue-dengvaxia.html', cores: ['#EA580C', '#C2410C'] },
  { nome: 'Gripe - Influenza', slug: 'gripe-influenza', arquivo: 'gripe-influenza.html', cores: ['#0EA5E9', '#0284C7'] },
  { nome: 'HPV - Quadrivalente', slug: 'hpv-quadrivalente', arquivo: 'hpv-quadrivalente.html', cores: ['#EC4899', '#BE185D'] },
  { nome: 'HPV - Nonavalente', slug: 'hpv-nonavalente', arquivo: 'hpv-nonavalente.html', cores: ['#A855F7', '#7E22CE'] },
  { nome: 'Sarampo - Triplice viral', slug: 'sarampo-triplice-viral', arquivo: 'sarampo-triplice-viral.html', cores: ['#10B981', '#059669'] },
  { nome: 'Febre amarela', slug: 'febre-amarela', arquivo: 'febre-amarela.html', cores: ['#F59E0B', '#D97706'] },
  { nome: 'COVID-19 - Vacina A', slug: 'covid19-vacina-a', arquivo: 'covid19-vacina-a.html', cores: ['#1E40AF', '#1E3A8A'] },
  { nome: 'COVID-19 - Vacina B', slug: 'covid19-vacina-b', arquivo: 'covid19-vacina-b.html', cores: ['#06B6D4', '#0891B2'] },
  { nome: 'Variolaa', slug: 'variolaa', arquivo: 'variolaa.html', cores: ['#6366F1', '#4F46E5'] }
];

// Funcao para encontrar vacina por nome (busca fuzzy)
function findVaccine(query) {
  const q = query.toLowerCase().trim();
  
  // Busca exata primeiro
  let found = vaccines.find(v => v.slug === q || v.nome.toLowerCase() === q);
  if (found) return found;
  
  // Busca parcial
  found = vaccines.find(v => v.nome.toLowerCase().includes(q) || q.includes(v.slug.split('-')[0]));
  if (found) return found;
  
  // Busca por palavras-chave
  for (let vaccine of vaccines) {
    const nome = vaccine.nome.toLowerCase();
    const palavras = nome.split(' ');
    for (let palavra of palavras) {
      if (palavra.includes(q) || q.includes(palavra)) {
        return vaccine;
      }
    }
  }
  
  return null;
}

// Funcao para redirecionar para a pagina da vacina
function redirectToVaccine(query) {
  const vaccine = findVaccine(query);
  if (vaccine) {
    window.location.href = vaccine.arquivo;
    return true;
  }
  return false;
}

// Funcao para processar busca no formulario
function handleVaccineSearch(searchTerm) {
  if (!searchTerm) return;
  const encoded = encodeURIComponent(searchTerm);
  window.location.href = 'index.html?busca=' + encoded;
}

// Processar parametro de busca na URL
function processSearchParams() {
  const params = new URLSearchParams(window.location.search);
  const busca = params.get('busca');
  
  if (busca) {
    const vaccine = findVaccine(busca);
    if (vaccine) {
      window.location.href = vaccine.arquivo;
    } else {
      // Mostrar mensagem de vacina nao encontrada
      console.warn('Vacina nao encontrada: ' + busca);
    }
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { vaccines, findVaccine, redirectToVaccine, handleVaccineSearch, processSearchParams };
}
