document.addEventListener('DOMContentLoaded', function() {
    var cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Adiciona classe 'hover' ao passar sobre links e botões
    var interactiveElements = document.querySelectorAll('a, button, .interactive');

    interactiveElements.forEach(function(elem) {
        elem.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        elem.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
});

// palavra

var words = ["Incrível!", "Inovador!", "Extraordinário!", "Avançado!", "Impressionante!", "Surpreendente!"];
var index = 0;
var changingWordsElement = document.getElementById('changing-words');

function typeWord(word, callback) {
    var letterIndex = 0;
    changingWordsElement.innerHTML = '';
    changingWordsElement.classList.add('appear'); // Adiciona a classe 'appear' para animação
    
    var typingInterval = setInterval(function() {
        letterIndex++;
        changingWordsElement.innerHTML = '<strong>' + word.substring(0, letterIndex).toUpperCase() + '</strong>'; // Negrito e caixa alta

        if (letterIndex === word.length) {
            clearInterval(typingInterval);
            setTimeout(callback, 2000); // Tempo antes de apagar a palavra
        }
    }, 200); // Velocidade da digitação
}

function deleteWord(callback) {
    changingWordsElement.classList.remove('appear');
    changingWordsElement.classList.add('disappear'); // Adiciona a classe 'disappear' para animação
    
    var word = changingWordsElement.textContent; // Utilizando textContent para pegar o texto simples sem tags
    var letterIndex = word.length;

    var deletingInterval = setInterval(function() {
        letterIndex--;
        changingWordsElement.innerHTML = '<strong>' + word.substring(0, letterIndex).toUpperCase() + '</strong>'; // Negrito e caixa alta

        if (letterIndex === 0) {
            clearInterval(deletingInterval);
            changingWordsElement.classList.remove('disappear'); // Remove a classe 'disappear' após a animação
            setTimeout(callback, 500); // Tempo antes de digitar a próxima palavra
        }
    }, 100); // Velocidade de deleção
}

function loopWords() {
    setTimeout(function() { // Adicionando um pequeno delay inicial para suavizar o início
        typeWord(words[index], function() {
            deleteWord(function() {
                index = (index + 1) % words.length;
                loopWords();
            });
        });
    }, 500); // Delay inicial
}

// Iniciar o loop após a página carregar
window.onload = function() {
    loopWords();
};
