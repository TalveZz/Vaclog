// Dados do portal de transparência e compromissos do governo

const governmentCommitments = [
  {
    id: 1,
    titulo: 'Aumentar cobertura vacinal para 95% em 2025',
    descricao: 'Comprometimento de alcançar 95% de cobertura de vacinação nas campanhas prioritárias',
    status: 'em-progresso',
    progresso: 78,
    dataInicio: '2024-01-01',
    dataMeta: '2025-12-31',
    responsavel: 'Ministério da Saúde'
  },
  {
    id: 2,
    titulo: 'Expandir centros de vacinação para 100% dos municípios',
    descricao: 'Garantir que todos os municípios tenham pelo menos um centro de vacinação acessível',
    status: 'em-progresso',
    progresso: 85,
    dataInicio: '2024-02-01',
    dataMeta: '2025-06-30',
    responsavel: 'Ministério da Saúde'
  },
  {
    id: 3,
    titulo: 'Melhorar comunicação e transparência sobre vacinas',
    descricao: 'Criar canais diretos de comunicação com a população e responder dúvidas sobre segurança',
    status: 'cumprido',
    progresso: 100,
    dataInicio: '2023-12-01',
    dataMeta: '2025-12-31',
    responsavel: 'Comunicação Social'
  },
  {
    id: 4,
    titulo: 'Realizar audiências públicas mensais sobre políticas de saúde',
    descricao: 'Manter diálogo constante com a sociedade civil',
    status: 'em-progresso',
    progresso: 92,
    dataInicio: '2024-01-01',
    dataMeta: '2025-12-31',
    responsavel: 'Participação Cidadã'
  }
];

const campaigns = [
  {
    id: 1,
    nome: 'Dengue 2025',
    descricao: 'Campanha contra dengue',
    status: 'ativa',
    cobertura: 45,
    eficacia: '86%'
  },
  {
    id: 2,
    nome: 'HPV - Prevenção',
    descricao: 'Prevenção de cânceres HPV',
    status: 'ativa',
    cobertura: 67,
    eficacia: '99%'
  }
];

function renderCommitments() {
  const grid = document.getElementById('compromissos-grid');
  if (!grid) return;
  grid.innerHTML = governmentCommitments.map(c => `
    <div class="commitment-card status-${c.status}">
      <h3>${c.titulo}</h3>
      <p>${c.descricao}</p>
      <div class="progress-bar"><div class="progress-fill" style="width: ${c.progresso}%"></div></div>
      <p>${c.progresso}% completo</p>
    </div>
  `).join('');
}

function renderCampaigns() {
  const grid = document.getElementById('campanhas-grid');
  if (!grid) return;
  grid.innerHTML = campaigns.map(c => `
    <div class="campaign-card status-${c.status}">
      <h3>${c.nome}</h3>
      <p>${c.descricao}</p>
      <p>Eficácia: ${c.eficacia}</p>
      <div class="progress-bar"><div class="progress-fill" style="width: ${c.cobertura}%"></div></div>
    </div>
  `).join('');
}

function updateStatistics() {
  document.getElementById('cobertura-total').textContent = '82%';
  document.getElementById('campanhas-ativas').textContent = campaigns.filter(c => c.status === 'ativa').length;
  document.getElementById('compromissos-cumpridos').textContent = '2/4';
  document.getElementById('feedback-recebido').textContent = localStorage.getItem('feedbackCount') || '0';
}

document.addEventListener('DOMContentLoaded', function() {
  renderCommitments();
  renderCampaigns();
  updateStatistics();
});
