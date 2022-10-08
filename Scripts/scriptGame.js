let qLevel = []
let options1 = ""
let questionCount = 0
let score = 0
let user = []

//En este metodo se cargan todas las recompensas en la pagina dependiendo del nivel del usuario
addEventListener("load", () => {
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            user = data
            if (data.level === "1" || data.level === "2" || data.level === "3") {
                document.getElementById("btn2").removeAttribute("disabled")
                document.getElementById("btn2").setAttribute("class", "btn-level2 m-3")
            }
            if (data.level === "2" || data.level === "3") {
                document.getElementById("btn3").removeAttribute("disabled")
                document.getElementById("btn3").setAttribute("class", "btn-level3 m-3")
            }
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
    //alert("respuesta cCorrecta 3")
    let divT = document.getElementById("divTitle")
    let divQuestion = document.getElementById("divD")

    divQuestion.innerHTML = qLevel[questionCount].description
    let options = qLevel[questionCount].options
    for (let i = 0; i < options.length; i++) {
        //adieren las opciones
        addButton(options[i])
    }
    options1 = ""
    plusCount()
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`

}

//esta funcion sirve para ir avanzando de pregunta
function next(correct) {

    let correcto = correct
    if (correcto == "1") {
        //en que pregunta va
        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`

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
        let divQ = document.getElementById("divOptions")
        divQ.innerHTML = `<button class="btn-option m-3" href="#Game" id="btnRandom" onclick="next(1)">  siguiente  </button>`

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
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            total = 0;
            user.score = total.toString()
        }
    } else if (user.level === "1") {
        if (total === 40) {
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            total = 15;
            user.score = total.toString()
        }
    } else if (user.level === "2") {
        if (total === 90) {
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
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