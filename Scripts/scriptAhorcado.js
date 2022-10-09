let qLevel = []
let options1 = ""
let questionCount = 0
let score = 0
let user = []
let words = [];

//En este metodo se cargan todas las recompensas en la pagina dependiendo del nivel del usuario
addEventListener("load", () => {
    showGame('1')
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            user = data
            document.getElementById("labelUser").innerText = data.name
            if (data.level === "1") {
                rewards += "<img src=\"Images/medalla.png\">"
            }
            if (data.level === "2") {
                rewards += "<img src=\"Images/medalla.png\">"
                rewards += "<img src=\"Images/trofeo.png\">"
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
                rewards += "<img src=\"Images/medalla2.png\">"
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
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
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
    if(mistakes === bodyParts.length) {
        endGame();
        next('2')
    }
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
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
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
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

startButton.addEventListener('click', startGame);

//en esta funcion se esconden los div que muestran los niveles y se muestran los div que tienen las preguntas
function showGame(levelV) {

    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    /*game.removeAttribute("hidden")
    divQ.setAttribute("hidden", "")*/
    level(levelV)
}
/*//en esta funcion se agregan las opciones de respuesta que hay en una pregunta
function addButton(title) {
    let divQ = document.getElementById("divOptions")
    divQ.innerHTML = ""
    options1 += `<button class="btn-option m-3" href="#Game" id="btnRandom" onclick="validate('${title}')"  >  ${title}</button>`
    divQ.innerHTML = options1
}*/

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
                }
            })

            showQuestion()
        }
    }
    xhr.send(null)
}

//en esta funcion se muestra una a una las preguntas que hay en el nivel
function showQuestion() {
    let divT = document.getElementById("divTitle")
    let divQuestion = document.getElementById("divD")

    divQuestion.innerHTML = qLevel[questionCount].description
    words.push(qLevel[questionCount].solution)

    options1 = ""
    plusCount()
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`

    startGame()
    startButton.addEventListener('click', showQuestion);
    words = [];
}

//esta funcion sirve para ir avanzando de pregunta
function next(correct) {

    if (correct === "1") {
        //en que pregunta va
        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`

        startGame()
        startButton.addEventListener('click', showQuestion);
        words = [];

        //la pregunta
        let divQuestion = document.getElementById("divD")
        divQuestion.innerHTML = ""
        divQuestion.innerHTML = qLevel[questionCount - 1].description


        if (questionCount === qLevel.length) {
            alert("Esta fue la ultima pregunta")
            finish()
        }

        showQuestion()

    } else    {

        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
        let divQuestion = document.getElementById("divD")
        divQuestion.innerHTML =  "retroalimentacion de la pregunta  <br/>"+ qLevel[questionCount - 1].feedback

    }
}

//en esta funcion se valida que la opcion escogida sea correcta
function validate(answer) {
    if (questionCount <= qLevel.length) {
        let options = qLevel[questionCount - 1].solution
        if (options !== answer) {
            alert("Respuesta incorrecta ")

            next("2")
            return;
        } else {
            score += parseInt(qLevel[questionCount - 1].score)
            alert("Respuesta correcta ")
            clearTimeout(temporizador);
            next("1")
            return;

        }
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
    //alert(`nivel: ${level}`)
    alert(`Puntuación obtenida: ${score}`)
    total = score + parseInt(user.score)
    if (user.level === "0") {
        if (total === 15) {
            if (user.level === "0"){
                alert("Subiste de nivel")
            }
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (user.score === "0"){
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
            total = 0;
            user.score = total.toString()
        }
    } else if (user.level === "1") {
        if (total === 40) {
            alert("Subiste de nivel")
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (user.score === "15"){
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
            total = 15;
            user.score = total.toString()
        }
    } else if (user.level === "2") {
        if (total === 90) {
            alert("Subiste de nivel")
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (user.score === "40"){
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
            total = 40;
            user.score = total.toString()
        }
    }
    saveScore()
    saveScore2()
    window.location.reload()
    //vuelve a recargar por eso vuelve donde estan los niveles
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
