// Catálogo base (exemplo): nome para exibição + slug para rota
const VACINAS = [
  { nome: "Dengue – Qdenga", slug: "dengue-qdenga" },
  { nome: "Dengue – Dengvaxia", slug: "dengue-dengvaxia" },
  { nome: "Gripe – Influenza", slug: "gripe-influenza" },
  { nome: "HPV – Quadrivalente", slug: "hpv-quadrivalente" },
  { nome: "HPV – Nonavalente", slug: "hpv-nonavalente" },
  { nome: "Sarampo – Tríplice viral", slug: "sarampo-triplice-viral" },
  { nome: "Febre amarela", slug: "febre-amarela" },
  { nome: "COVID-19 – Vacina A", slug: "covid19-vacina-a" },
  { nome: "COVID-19 – Vacina B", slug: "covid19-vacina-b" }
];

const input = document.getElementById("campo-busca");
const listbox = document.getElementById("lista-sugestoes");
const status = document.getElementById("status-busca");
const botaoBusca = document.getElementById("botao-busca");

let activeIndex = -1;
let currentSuggestions = [];

function limparSugestoes() {
  listbox.innerHTML = "";
  listbox.hidden = true;
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
  activeIndex = -1;
  currentSuggestions = [];
}

function criarSugestaoHTML(vacina, searchTerm, index) {
  const id = `sugestao-${index}`;
  const li = document.createElement("li");
  li.id = id;
  li.role = "option";
  li.tabIndex = -1;
  li.setAttribute("aria-selected", "false");
  li.dataset.index = index.toString();

  const nome = vacina.nome;
  const termo = searchTerm.trim();
  const termoLower = termo.toLowerCase();
  const nomeLower = nome.toLowerCase();

  const start = nomeLower.indexOf(termoLower);

  if (start >= 0 && termo.length > 0) {
    const before = nome.slice(0, start);
    const match = nome.slice(start, start + termo.length);
    const after = nome.slice(start + termo.length);
    li.innerHTML =
      `${before}<strong>${match}</strong>${after}` +
      `<small>${vacina.slug}</small>`;
  } else {
    li.textContent = nome;
  }

  li.addEventListener("mousedown", (evt) => {
    evt.preventDefault();
    selecionarSugestao(index);
  });

  return li;
}

function filtrarSugestoes(valor) {
  const termo = valor.trim().toLowerCase();
  if (termo.length === 0) {
    limparSugestoes();
    status.textContent = "";
    return;
  }

  const resultados = VACINAS
    .filter((item) => item.nome.toLowerCase().includes(termo))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  currentSuggestions = resultados;

  if (resultados.length === 0) {
    limparSugestoes();
    status.textContent = "Nenhuma sugestão encontrada.";
    return;
  }

  listbox.innerHTML = "";
  resultados.forEach((vacina, index) => {
    const li = criarSugestaoHTML(vacina, valor, index);
    listbox.appendChild(li);
  });

  listbox.hidden = false;
  input.setAttribute("aria-expanded", "true");
  status.textContent =
    resultados.length === 1
      ? "1 sugestão disponível."
      : `${resultados.length} sugestões disponíveis.`;
}

function atualizarItemAtivo(novoIndex) {
  const itens = listbox.querySelectorAll('[role="option"]');
  if (!itens.length) return;

  if (activeIndex >= 0 && activeIndex < itens.length) {
    itens[activeIndex].setAttribute("aria-selected", "false");
  }

  activeIndex = novoIndex;

  if (activeIndex >= 0 && activeIndex < itens.length) {
    const ativo = itens[activeIndex];
    ativo.setAttribute("aria-selected", "true");
    input.setAttribute("aria-activedescendant", ativo.id);

    const offsetTop = ativo.offsetTop;
    const scrollTop = listbox.scrollTop;
    const boxHeight = listbox.clientHeight;
    if (offsetTop < scrollTop) {
      listbox.scrollTop = offsetTop;
    } else if (offsetTop >= scrollTop + boxHeight) {
      listbox.scrollTop = offsetTop - boxHeight + ativo.offsetHeight;
    }
  } else {
    input.removeAttribute("aria-activedescendant");
  }
}

function navegarParaVacina(vacina) {
  if (!vacina) return;
  const url = `vacina-${encodeURIComponent(vacina.slug)}.html`;
  console.log("Navegando para:", url);
  window.location.href = url;
}

function selecionarSugestao(index) {
  if (index < 0 || index >= currentSuggestions.length) return;
  const vacina = currentSuggestions[index];
  input.value = vacina.nome;
  limparSugestoes();
  navegarParaVacina(vacina);
}

if (input) {
  input.addEventListener("input", (evt) => {
    filtrarSugestoes(evt.target.value);
  });

  input.addEventListener("keydown", (evt) => {
    const itens = listbox.querySelectorAll('[role="option"]');
    const temSugestoes = itens.length > 0;

    switch (evt.key) {
      case "ArrowDown":
        if (!temSugestoes) return;
        evt.preventDefault();
        if (activeIndex < itens.length - 1) {
          atualizarItemAtivo(activeIndex + 1);
        } else {
          atualizarItemAtivo(0);
        }
        break;
      case "ArrowUp":
        if (!temSugestoes) return;
        evt.preventDefault();
        if (activeIndex > 0) {
          atualizarItemAtivo(activeIndex - 1);
        } else {
          atualizarItemAtivo(itens.length - 1);
        }
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < itens.length) {
          evt.preventDefault();
          selecionarSugestao(activeIndex);
        } else if (input.value.trim()) {
          const termo = input.value.trim().toLowerCase();
          const match =
            VACINAS.find((v) => v.nome.toLowerCase() === termo) ||
            VACINAS.find((v) => v.nome.toLowerCase().includes(termo));
          if (match) {
            navegarParaVacina(match);
          }
        }
        break;
      case "Escape":
        if (!listbox.hidden) {
          evt.preventDefault();
          limparSugestoes();
        }
        break;
      case "Tab":
        limparSugestoes();
        break;
      default:
        break;
    }
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      if (
        !document.activeElement ||
        document.activeElement.closest("#lista-sugestoes") === null
      ) {
        limparSugestoes();
      }
    }, 100);
  });
}

if (listbox) {
  listbox.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      const index = parseInt(evt.target.dataset.index || "-1", 10);
      if (!Number.isNaN(index)) {
        selecionarSugestao(index);
      }
    }
  });
}

if (botaoBusca) {
  botaoBusca.addEventListener("click", () => {
    const termo = input.value.trim().toLowerCase();
    if (!termo) return;

    const match =
      VACINAS.find((v) => v.nome.toLowerCase() === termo) ||
      VACINAS.find((v) => v.nome.toLowerCase().includes(termo));

    if (match) {
      navegarParaVacina(match);
    } else if (status) {
      status.textContent = "Nenhuma vacina encontrada com esse nome.";
    }
  });
}
