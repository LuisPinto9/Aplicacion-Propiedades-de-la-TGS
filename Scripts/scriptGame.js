let qLevel = []
let options1 = ""
let questionCount = 0
let score = 0

//En este metodo se cargan todas las recompensas en la pagina dependiendo del nivel del usuario
addEventListener("load", () => {
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            score = parseInt(data.score)
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
            document.getElementById("rewards").innerHTML = rewards
        }
    }
    xhr.send(null)

})

//en esta funcion se esconden los div que muestran los niveles y se muestran los div que tienen las preguntas
function showGame(levelV) {
    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    game.removeAttribute("hidden")
    divQ.setAttribute("hidden", "")
    level(levelV)
}

//en esta funcion se agregan las opciones de respuesta que hay en una pregunta
function addButton(title) {
    let divQ = document.getElementById("divOptions")
    divQ.innerHTML = ""
    options1 += `<button class="btn-option m-3" href="#Game" id="btnRandom" onclick="validate('${title}')">${title}</button>`
    divQ.innerHTML = options1
}

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
    let options = qLevel[questionCount].options
    for (let i = 0; i < options.length; i++) {
        addButton(options[i])
    }
    options1 = ""
    plusCount()
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`

}

//esta funcion sirve para ir avanzando de pregunta
function next() {
    let divT = document.getElementById("divTitle")
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
    let divQuestion = document.getElementById("divD")
    divQuestion.innerHTML = ""
    divQuestion.innerHTML = qLevel[questionCount - 1].description
    if (questionCount === qLevel.length){
        alert("Esta fue la ultima pregunta")
        finish()
    }
    showQuestion()
}

//en esta funcion se va aumentando el contador que sirve para pasar de pregunta en pregunta
function plusCount() {
    if (questionCount < qLevel.length) {
        questionCount++
    }
}

//en esta funcion se valida que la opcion escogida sea correcta
function validate(answer) {
    if (questionCount <= qLevel.length){
        let options = qLevel[questionCount-1].solution
        if (options !== answer) {
            alert("Respuesta incorrecta")
            next()
            return;
        } else {
            score += parseInt(qLevel[questionCount-1].score)
            alert("Respuesta correcta")
            next()
            return;
        }
    }
}

//esta funcion sirve para terminar el nivel
function finish(){
    alert(`Puntuacion obtenida: ${score}`)
    window.location.reload()
}