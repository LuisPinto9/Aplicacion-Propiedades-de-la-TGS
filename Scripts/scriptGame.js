let qLevel = []
let options1 = ""
let questionCount = 0
//El score es la puntuacion que se va acumulando en cada nivel
let score = 0
//Auxiliar de nivel para saber que nivel esta haciendo el usuario
let auxLevel = ""
let user = []
let temporizador;
let time = 11;

//En este metodo se cargan todas las recompensas en la pagina dependiendo del nivel del usuario
addEventListener("load", () => {
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            user = data
            if (data.level === "1" || data.level === "2" || data.level === "3" || data.level === "4") {
                document.getElementById("btn2").removeAttribute("disabled")
                document.getElementById("btn2").setAttribute("class", "btn-level2 m-3")
            }
            if (data.level === "2" || data.level === "3" || data.level === "4") {
                document.getElementById("btn3").removeAttribute("disabled")
                document.getElementById("btn3").setAttribute("class", "btn-level3 m-3")
            }
            if (data.level === "3" || data.level === "4") {
                document.getElementById("btn4").removeAttribute("disabled")
                document.getElementById("btn4").setAttribute("class", "btn-level4 m-3")
            }
            document.getElementById("labelUser").innerText = data.name[0].toUpperCase() + data.name.substring(1)
            let level = parseInt(user.level) + 1
            document.getElementById("labelLevel").innerText = " / Nivel: " + level.toString()
            document.getElementById("labelScore").innerText = " / Puntuación: " + data.score
            if (user.level === "4") {
                document.getElementById("labelLevel").innerText = " / Nivel: Max."
            }

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
                rewards += "<img src=\"Images/trofeo2.png\">"
            }
            document.getElementById("rewards").innerHTML = rewards
        }
    }
    xhr.send(null)
})


//en esta funcion se esconden los div que muestran los niveles y se muestran los div que tienen las preguntas
function showGame(levelV) {

    let game = document.getElementById("Game")
    game.removeAttribute("hidden")
    //preguntas
    let divQ = document.getElementById("divQuestions")
    divQ.setAttribute("hidden", "")
    //barra tiempo
    let barra1 = document.getElementById("Game1")
    barra1.removeAttribute("hidden")
    animar();
    auxLevel = levelV
    level(levelV)
}

//en esta funcion se agregan las opciones de respuesta que hay en una pregunta
function addButton(title) {
    let divQ = document.getElementById("divOptions")
    divQ.innerHTML = ""
    options1 += `<button class="btn-option m-3" href="#Game" id="btnRandom" onclick="validate('${title}')"  >  ${title}</button>`
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

//En esta función se empieza la animación de la barra de progreso
function animar() {
    document.getElementById("barra").classList.toggle("progress-bar");
}

//en esta funcion se muestra una a una las preguntas que hay en el nivel
function showQuestion() {

    let divT = document.getElementById("divTitle")
    let divQuestion = document.getElementById("divD")

    divQuestion.innerHTML = qLevel[questionCount].description
    let options = qLevel[questionCount].options


    temporizador = setInterval(() => {
        time = time - 1;

        if (time === 0) {
            alert("Se acabo el tiempo")
            clearInterval(temporizador);
            time = 11;
            next(2);
        } else {
            let time3 = document.getElementById('time2')
            //time3.innerHTML = time;
            time3.innerHTML = " ";
        }
    }, 1000)


    for (let i = 0; i < options.length; i++) {
        //adieren las opciones
        addButton(options[i])
    }
    options1 = ""
    plusCount()
    divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`


    animar();
}


//esta función sirve para ir avanzando de pregunta
function next(correct, a) {

    if (correct === '1') {
        if (a === '2') {
            document.getElementById("barra").style.visibility = "visible"
        }
        let barra1 = document.getElementById("Game1")
        barra1.removeAttribute("hidden")

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


        clearInterval(temporizador);
        time = 11;

        animar();
        showQuestion()

    } else {
        //ocultar barra
        document.getElementById("barra").style.visibility = "hidden"
        time = 11;
        let divT = document.getElementById("divTitle")
        divT.innerHTML = `<h1 class="title-questions">Pregunta ${questionCount}/${qLevel.length}</h1>`
        let divQuestion = document.getElementById("divD")
        divQuestion.innerHTML = "Retroalimentación de la pregunta:  <br/>" + qLevel[questionCount - 1].feedback
        let divQ = document.getElementById("divOptions")
        divQ.innerHTML = `<button class="btn-option m-3" href="#Game" id="btnRandom" onclick="next('1','2') ">Siguiente</button>`
        let barra1 = document.getElementById("Game1")
        barra1.setAttribute("hidden", "")

    }
}

//en esta funcion se valida que la opcion escogida sea correcta
function validate(answer) {
    if (questionCount <= qLevel.length) {
        let options = qLevel[questionCount - 1].solution
        if (options !== answer) {
            alert("Respuesta incorrecta ")
            next("2", "2")
        } else {
            score += parseInt(qLevel[questionCount - 1].score)
            alert("Respuesta correcta ")
            clearInterval(temporizador);
            time = 11;
            next("1", "1")
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
    if (auxLevel === "1" && user.level === "0") {
        if (total === 15) {
            if (user.level === "0") {
                alert("Subiste de nivel")
            }
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (score < 15) {
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
            total = 0;
            user.score = total.toString()
        }
    } else if (auxLevel === "2" && user.level === "1") {
        if (total === 40) {
            alert("Subiste de nivel")
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            total = 15;
            user.score = total.toString()
            if (score < 25) {
                alert("Responde todas las preguntas correctamente para pasar de nivel")
            }
        }
    } else if (auxLevel === "3" && user.level === "2") {
        if (total === 90) {
            alert("Subiste de nivel")
            level2 = parseInt(user.level) + 1
            user.level = level2.toString()
            user.score = total.toString()
        } else {
            if (score < 50) {
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