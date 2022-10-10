let qLevel = []
let questionCount = 0
let score = 0
let user = []
let words = "";
let status = false

//En este metodo se cargan todas las recompensas en la pagina dependiendo del nivel del usuario
addEventListener("load", () => {
    level('4')
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            user = data
            document.getElementById("labelUser").innerText = data.name[0].toUpperCase() + data.name.substring(1)
            let level = parseInt(user.level) + 1
            document.getElementById("labelLevel").innerText = " / Nivel: " + level.toString()
            document.getElementById("labelScore").innerText = " / Puntuación: " + data.score

            if (user.level === "4"){
                document.getElementById("labelLevel").innerText = " / Nivel: Max."
            }
            if (data.level === "3") {
                rewards += "<img src=\"Images/medalla.png\">"
                rewards += "<img src=\"Images/trofeo.png\">"
                rewards += "<img src=\"Images/estrella.png\">"
            }
            if (data.level === "4") {
                rewards += "<img src=\"Images/medalla.png\">"
                rewards += "<img src=\"Images/trofeo.png\">"
                rewards += "<img src=\"Images/estrella.png\">"
                rewards += "<img src=\"Images/trofeo2.png\">"
            }
            document.getElementById("rewards").innerHTML = rewards
        }
    }
    xhr.send(null)
})

const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) {
        status = false
        endGame();
        next(false)
    }
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';

}

const correctLetter = letter => {
    const {children} = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) {
        status = true
        if (status === true) {
            score += parseInt(qLevel[questionCount - 1].score)
            alert("Respuesta correcta ")
        }
        endGame();
    }
}

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñáó]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words.toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#413331';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', () => {
    startGame()
    showQuestion()
});

//en esta funcion se filtran las preguntas que corresponden a un nivel
function level(level) {
    qLevel = []
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlQuestions.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            data.forEach((e) => {
                if (e.level === level) {
                    qLevel.push(e)
                    qLevel.sort(function () {
                        return Math.random() - 0.5
                    });
                }
            })
            showQuestion()
        }
    }
    xhr.send(null)
}

//en esta funcion se muestra una a una las preguntas que hay en el nivel
function showQuestion() {

    if (questionCount === qLevel.length) {
        alert("Esta fue la ultima pregunta")
        finish()
    }
    let divT = document.getElementById("divTitle")
    let divQuestion = document.getElementById("divD")

    divQuestion.innerHTML = qLevel[questionCount].description
    words = qLevel[questionCount].solution
    startGame()
    plusCount()
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
}

//esta funcion sirve para ir avanzando de pregunta
function next(correct) {

    if (correct === true) {

        //en que pregunta va
        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
        words = qLevel[questionCount].solution

        //la pregunta
        let divQuestion = document.getElementById("divD")
        divQuestion.innerHTML = ""
        divQuestion.innerHTML = qLevel[questionCount - 1].description
        startGame()

    } else {
        alert("Se acabaron las oportunidades")
        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
        let divQuestion = document.getElementById("divD")
        divQuestion.innerHTML = "Retroalimentación de la pregunta:  <br/>" + qLevel[questionCount - 1].feedback

    }
}

//en esta funcion se va aumentando el contador que sirve para pasar de pregunta en pregunta
function plusCount() {
    if (questionCount < qLevel.length) {
        questionCount++
    }
}

//esta funcion sirve para terminar el nivel
function finish() {
    let total;
    let level2;
    alert(`Puntuación obtenida: ${score}`)
    total = score + parseInt(user.score)
    if (user.level === "3") {
        if (total === 165) {
            if (user.level === "3") {
                alert("Subiste de nivel")
            }
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (user.score === "90") {
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
            total = 90;
            user.score = total.toString()
        }
    }
    saveScore()
    saveScore2()
    window.location.href = "gameWindow.html";
    //vuelve a la página de los niveles
}

//esta funcion sirve para sobreescribir la informacion del json de usuarios
function saveScore() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `./Php/controlUsers.php?option=3&name=${user.name}&password=${user.password}&score=${user.score}&level=${user.level}`, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    }
    xhr.send(null)
}

//esta funcion sirve para sobreescribir la informacion del login
function saveScore2() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `./Php/controlLogin.php?option=2&name=${user.name}&password=${user.password}&score=${user.score}&level=${user.level}`, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    }
    xhr.send(null)
}