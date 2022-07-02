let qLevel = []
let questions = ""
let questionCount = 0

addEventListener("load", () => {
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
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

function showGame(levelV) {
    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    let divT = document.getElementById("divTitle")
    game.removeAttribute("hidden")
    divQ.setAttribute("hidden", "")
    divT.setAttribute("hidden", "")
    level(levelV)
}


/*function hideGame() {
    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    divQ.removeAttribute("hidden")
    game.setAttribute("hidden", "")
}*/

function addButton(title) {
    let divQ = document.getElementById("divQuestions")
    questions += "<a type=\"button\" class=\"btn-random m-3\" href=\"#Game\" id=\"btnRandom\"\n" +
        "                       onclick=\"showGame()\">" + title + " </a>"

    divQ.innerHTML = questions
}

function level(level) {
    qLevel=[]
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

function showQuestion() {
    let divQuestion = document.getElementById("divD")
    let questions = divQuestion.innerHTML
    for (let i = 0; i < qLevel.length; i++) {
        questions += qLevel[i].description
    }
    divQuestion.innerHTML=questions
}

/*function level2() {
    qLevel = Array()
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlQuestions.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            data.forEach((e) => {
                if (e.level === "2") {
                    qLevel.push(e)
                }

            })
            qLevel.forEach((e) => {
                alert(e.title)
            })

        }
    }
    xhr.send(null)
}

function level3() {
    qLevel = Array()
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlQuestions.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            data.forEach((e) => {
                if (e.level === "3") {
                    qLevel.push(e)
                }

            })
            qLevel.forEach((e) => {
                alert(e.title)
            })

        }
    }
    xhr.send(null)
}*/
