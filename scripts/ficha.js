console.log('Um projeto criado por fã para fãs de RPG ❤.');

document.getElementById('generate-pdf').addEventListener('click', function() {
    const element = document.querySelector('form.charsheet');
    if (element) {  
      const options = {
        filename: 'ficha_rpg.pdf',
        html2canvas: { scale: 2}, // Ajuste a escala
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape', precision: '1', } // A4
      };
      html2pdf().from(element).set(options).save();
    } else {
      alert("O formulário não foi encontrado!");
    }
  });
 
  document.addEventListener('DOMContentLoaded', function () {
    const arrowButton = document.getElementById('arrowButton');
    const buttonContainer = document.getElementById('buttonContainer');
  
    // Alternar a visibilidade do contêiner ao clicar no botão
    arrowButton.addEventListener('click', function () {
      const isActive = buttonContainer.classList.contains('active');
  
      if (isActive) {
        // Esconde o contêiner e muda a seta para cima
        buttonContainer.classList.remove('active');
        arrowButton.classList.remove('active');
        arrowButton.textContent = "▲"; // Mudando a seta para cima
      } else {
        // Mostra o contêiner e muda a seta para baixo
        buttonContainer.classList.add('active');
        arrowButton.classList.add('active');
        arrowButton.textContent = "▼"; // Mudando a seta para baixo
      }
    });
  });
  
 

 
 
 
 
 
 // Algoritmo inteligente para gerar nomes
const generateName = () => {
  const prefixes = ["Tho", "El", "Bor", "Ka", "Mor", "Vala", "Gor", "Li"];
  const roots = ["rin", "dyn", "gran", "thar", "wyn", "dor", "mal", "tar"];
  const suffixes = ["dor", "a", "us", "ia", "wyn", "is", "an", "el"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const root = roots[Math.floor(Math.random() * roots.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return prefix + root + suffix;
};

// Dados aleatórios para cada campo
const randomData = {
  classes: ["Paladino", "Ladino", "Feiticeiro", "Clérigo", "Bárbaro"],
  backgrounds: ["Acolito", "Herói do Povo", "Eremita", "Nobre", "Forasteiro"],
  races: ["Elfo", "Anão", "Humano", "Meio-Orc", "Tiefling"],
  alignments: ["Leal e Bom", "Neutro e Mau", "Caótico e Neutro", "Neutro Verdadeiro"],
  scores: () => Math.floor(Math.random() * 15) + 8 // 8-18
};

// Função para determinar o dado de vida pela classe
const getHitDiceByClass = (cls) => {
  const hitDice = {
    "Bárbaro": "1d12",
    "Clérigo": "1d8",
    "Druida": "1d8",
    "Guerreiro": "1d10",
    "Ladino": "1d8",
    "Mago": "1d6",
    "Monge": "1d8",
    "Paladino": "1d10",
    "Patrulheiro": "1d10",
    "Feiticeiro": "1d6",
    "Bruxo": "1d8",
    "Bardo": "1d8"
  };
  return hitDice[cls] || "1d8"; // Valor padrão caso a classe não seja encontrada
};

// Função para preencher campos aleatórios
const fillRandomData = () => {
  try {
    // Nome aleatório
    document.querySelector('input[name="charname"]').value = generateName();

    // Classe e nível
    const cls = randomData.classes[Math.floor(Math.random() * randomData.classes.length)];
    const lvl = Math.floor(Math.random() * 20) + 1; // Nível entre 1 e 20
    document.querySelector('input[name="classlevel"]').value = `${cls} ${lvl}`;

    // Outros campos principais
    document.querySelector('input[name="background"]').value = randomData.backgrounds[Math.floor(Math.random() * randomData.backgrounds.length)];
    document.querySelector('input[name="race"]').value = randomData.races[Math.floor(Math.random() * randomData.races.length)];
    document.querySelector('input[name="alignment"]').value = randomData.alignments[Math.floor(Math.random() * randomData.alignments.length)];
    document.querySelector('input[name="experiencepoints"]').value = lvl * 300; // XP estimado por nível

    // Determinar e preencher o dado de vida
    const hitDice = getHitDiceByClass(cls);
    const totalHitDice = `${lvl} ${hitDice}`; // Exibe "Nível Dado", por exemplo, "5 1d10"
    document.querySelector('input[name="totalhd"]').value = totalHitDice;
    document.querySelector('input[name="remaininghd"]').value = totalHitDice;

    // Atributos
    ['Strength', 'Dexterity', 'Constitution', 'Wisdom', 'Intelligence', 'Charisma'].forEach(attr => {
      const score = randomData.scores();
      document.querySelector(`input[name="${attr}score"]`).value = score;
      document.querySelector(`input[name="${attr}mod"]`).value = Math.floor((score - 10) / 2);
    });

  } catch (error) {
    console.error("Erro ao preencher os dados:", error);
    alert("Ocorreu um erro ao preencher os dados. Verifique o console para mais detalhes.");
  }
};

// Função para limpar os campos do formulário
const clearForm = () => {
  const inputs = document.querySelectorAll('form.charsheet input');
  inputs.forEach(input => input.value = '');
};

// Eventos dos botões
document.getElementById("generateButton").addEventListener("click", fillRandomData);
document.getElementById("clearButton").addEventListener("click", clearForm);
