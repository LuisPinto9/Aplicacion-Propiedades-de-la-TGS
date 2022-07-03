


function login() {
    let status = false;
    let score = "";
    let level = "";
    const name = document.getElementById("inputUser").value;
    const password = document.getElementById("inputPassword").value;


    const xhr2 = new XMLHttpRequest();

    xhr2.open("get", "./Php/controlUsers.php?option=1", false);
    xhr2.onreadystatechange = () => {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            const data = JSON.parse(xhr2.responseText);
            if (compare(name, password, data) !== false) {
                data.forEach(e => {
                    if (e.name === name && e.password === password) {
                        score = e.score;
                        level = e.level;
                    }
                })
                status = true

            }
        }

    }
    xhr2.send(null);

    const formulario = document.getElementById("formulario");
    if (status === true) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `./Php/controlLogin.php?option=2&name=${name}&password=${password}&score=${score}&level=${level}`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {

            }

        }
        xhr.send(null);
        formulario.action = './gameWindow.html';

    } else {
        alert("Usuario o contraseña incorrectos");

    }
}

function compare(user, password, data) {
    let status = false
    data.forEach(e => {
        if (e.name === user && e.password === password) {
            status = true
        }
    })
    return status
}
