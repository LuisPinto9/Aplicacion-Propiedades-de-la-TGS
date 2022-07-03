
function login2(){
    //let status = false;
    let score = "0";
    let level = "0";
    let name = document.getElementById("inputUser").value;
    let password1 = document.getElementById("inputPassword1").value;
    let password2 = document.getElementById("inputPassword2").value;

    if (password1 === password2 ) {

        const xhr3 = new XMLHttpRequest();


        xhr3.open("GET", `./Php/controlUsers.php?option=2&name=${name}&password=${password1}&score=${score}&level=${level}`, true)
        xhr3.onreadystatechange = () => {
            if (xhr3.readyState === 4 && xhr3.status === 200) {
            }
        }
        xhr3.send(null)
        // listButton()
        // document.getElementById("create").reset();

    }else{
        alert("contaseñas diferentes")
    }

}


function listButton() {

    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', './Php/controlUsers.php?option=1', true)
    xhr2.onreadystatechange = () => {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            const data = JSON.parse(xhr2.response)
            //listData(data)

        }
    }
    xhr2.send(null)

}
function listData(data) {

    data.sort((a, b) => a.name.localeCompare(b.name)).forEach((participant) => {
        initialTable(participant.discipline, participant.name, participant.id, participant.eventPosition, participant.disciplineType, participant.event)
    })
}


document.getElementById("inputUser").addEventListener("change", () => {

    comprobarExistencia();
})



function comprobarExistencia() {

    let name = document.getElementById("inputUser").value
    const xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "./Php/controlUsers.php?option=1", true);
    xhr5.onreadystatechange = () => {
        if (xhr5.readyState === 4 && xhr5.status === 200) {
            const data = JSON.parse(xhr5.responseText);

            for (let i = 0; i < data.length; ++i) {

                if (data[i].name === name) {
                    alert("Ese ususario ya existe ")
                    disableButton(2)

                } else  {
                    disableButton(1)
                }
            }
        }

    };
    xhr5.send(null);
}



function disableButton(estado) {


    const button = document.getElementById("btnLogin")

    switch (estado) {

        case 1:
            button.disabled = true

            break;
        case 2:
            button.disabled = false
            break;
    }
}

