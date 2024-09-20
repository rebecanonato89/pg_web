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


// Código para trocar as palavras
var words = ["Incrível!", "Inovador!", "Extraordinário!", "Avançado!", "Impressionante!", "Surpreendente!"];
var index = 0;
var changingWordsElement = document.getElementById('changing-words');

function typeWord(word, callback) {
    var letterIndex = 0;
    changingWordsElement.innerHTML = '';
    //changingWordsElement.style.width = '0';
    
    var typingInterval = setInterval(function() {
        letterIndex++;
        changingWordsElement.innerHTML = word.substring(0, letterIndex);
        //changingWordsElement.style.width = changingWordsElement.innerHTML.length + 'ch';

        if (letterIndex === word.length) {
            clearInterval(typingInterval);
            setTimeout(callback, 2000); // Tempo antes de apagar a palavra
        }
    }, 200); // Velocidade da digitação
}

function deleteWord(callback) {
    var word = changingWordsElement.innerHTML;
    var letterIndex = word.length;

    var deletingInterval = setInterval(function() {
        letterIndex--;
        changingWordsElement.innerHTML = word.substring(0, letterIndex);
        //changingWordsElement.style.width = changingWordsElement.innerHTML.length + 'ch';

        if (letterIndex === 0) {
            clearInterval(deletingInterval);
            setTimeout(callback, 500); // Tempo antes de digitar a próxima palavra
        }
    }, 100); // Velocidade de deleção
}

function loopWords() {
    typeWord(words[index], function() {
        deleteWord(function() {
            index = (index + 1) % words.length;
            loopWords();
        });
    });
}

// Iniciar o loop após a página carregar
window.onload = function() {
    loopWords();
};