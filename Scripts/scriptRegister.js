function login2() {

    let score = "0";
    let level = "0";
    let name = document.getElementById("inputUser").value;
    let password1 = document.getElementById("inputPassword1").value;
    let password2 = document.getElementById("inputPassword2").value;

    if (password1 === "" || password2 === "" || name === "") {
        alert("Rellene todos los espacios")

    } else if (password1 === password2) {

        const xhr3 = new XMLHttpRequest();

        xhr3.open("GET", `./Php/controlUsers.php?option=2&name=${name}&password=${password1}&score=${score}&level=${level}`, true)
        xhr3.onreadystatechange = () => {
            if (xhr3.readyState === 4 && xhr3.status === 200) {
            }
        }
        xhr3.send(null)

    } else {
        alert("Las contraseñas no coinciden")
    }

}

function bloquear() {
    comprobarExistencia();
}

function comprobarExistencia() {

    let name1 = document.getElementById("inputUser").value;
    const xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "./Php/controlUsers.php?option=1", true);
    xhr5.onreadystatechange = () => {
        if (xhr5.readyState === 4 && xhr5.status === 200) {
            const data = JSON.parse(xhr5.responseText);

            for (let i = 0; i < data.length; ++i) {

                if (data[i].name === name1) {

                    disableButton(2)
                    alert("Ese usuario ya existe ")
                    i = data.length
                } else {
                    disableButton(1)

                }
            }
        }

    };
    xhr5.send(null);
}

function disableButton(estado) {

    const button = document.getElementById("btn-register1")
    //si se bloquean estos no funciona
    //const button2 = document.getElementById("input-password1")
    // const button3 = document.getElementById("input-password2")

    switch (estado) {

        case 1:
            button.disabled = false
            //alert("cambie nombre de usuario")
            //button2.disabled = false
            //button3.disabled = false

            break;
        case 2:
            button.disabled = true
            //button2.disabled = true
            //button3.disabled = true
            break;
    }
}

