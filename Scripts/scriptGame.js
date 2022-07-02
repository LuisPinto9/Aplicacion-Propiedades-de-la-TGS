let qLevel = Array()

addEventListener("load", () => {
    let rewards = ""
    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            document.getElementById("labelUser").innerText = data.name
            if (data.level === "1"){
                rewards += "<img src=\"Images/medalla.png\">"
            }
            if (data.level === "2"){
                rewards += "<img src=\"Images/medalla.png\">"
                rewards += "<img src=\"Images/trofeo.png\">"
            }
            if (data.level === "3"){
                rewards += "<img src=\"Images/medalla.png\">"
                rewards += "<img src=\"Images/trofeo.png\">"
                rewards +=  "<img src=\"Images/estrella.png\">"
            }
            document.getElementById("rewards").innerHTML = rewards
        }
    }
    xhr.send(null)

})

function showGame() {
    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    game.removeAttribute("hidden")
    divQ.setAttribute("hidden", "")

}



/*function hideGame() {
    let game = document.getElementById("Game")
    let divQ = document.getElementById("divQuestions")
    divQ.removeAttribute("hidden")
    game.setAttribute("hidden", "")
}*/

let questions = ""

function addButton(title) {
    let divQ = document.getElementById("divQuestions")
    questions += "<a type=\"button\" class=\"btn-random m-3\" href=\"#Game\" id=\"btnRandom\"\n" +
        "                       onclick=\"showGame()\">" + title + " </a>"

    divQ.innerHTML = questions
}

addEventListener("load", () => {

    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/controlQuestions.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            data.forEach((e) => {
                if (e.level === 1)
                    qLevel.push(e)
                qLevel.forEach((e)=>{
                    alert(e.title)
                })

            })

        }
    }
    xhr.send(null)
})
