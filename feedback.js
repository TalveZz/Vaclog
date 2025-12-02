// Sistema de feedback e sugestões para o governo

const feedbackForm = document.getElementById('form-feedback');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackList = [];

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const categoria = document.getElementById('categoria').value;
    const mensagem = document.getElementById('mensagem').value;
    const publico = document.getElementById('publico').checked;
    
    if (!email || !categoria || !mensagem) {
      showStatus('Preencha todos os campos obrigatórios', 'erro');
      return;
    }
    
    const feedback = {
      id: Date.now(),
      nome: nome || 'Anônimo',
      email: email,
      categoria: categoria,
      mensagem: mensagem,
      publico: publico,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'recebido'
    };
    
    feedbackList.push(feedback);
    saveFeedback(feedback);
    
    feedbackForm.reset();
    showStatus('Sugestão enviada com sucesso! Obrigado pela sua participação.', 'sucesso');
    
    updateFeedbackCount();
  });
}

function showStatus(message, type) {
  if (!feedbackStatus) return;
  feedbackStatus.textContent = message;
  feedbackStatus.className = `feedback-status status-${type}`;
  setTimeout(() => {
    feedbackStatus.textContent = '';
    feedbackStatus.className = 'feedback-status';
  }, 5000);
}

function saveFeedback(feedback) {
  let savedFeedback = JSON.parse(localStorage.getItem('governmentFeedback')) || [];
  savedFeedback.push(feedback);
  localStorage.setItem('governmentFeedback', JSON.stringify(savedFeedback));
}

function updateFeedbackCount() {
  let savedFeedback = JSON.parse(localStorage.getItem('governmentFeedback')) || [];
  localStorage.setItem('feedbackCount', savedFeedback.length.toString());
  const element = document.getElementById('feedback-recebido');
  if (element) element.textContent = savedFeedback.length;
}

// Chamar ao carregar
document.addEventListener('DOMContentLoaded', function() {
  updateFeedbackCount();
});
