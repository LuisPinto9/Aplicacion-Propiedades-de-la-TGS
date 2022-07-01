function begin() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', 'control.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            listData(data)
            events()
        }
    }
    xhr.send(null)

}

function listButton() {

    const xhr2 = new XMLHttpRequest();
    xhr2.open('get', 'control.php?option=1', true)
    xhr2.onreadystatechange = () => {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            const data = JSON.parse(xhr2.response)
            listData(data)

        }
    }
    xhr2.send(null)

}

function reset() {

    const body1 = document.getElementById("body1");
    body1.innerHTML = "";

}

function reset2() {

    const bodyS = document.getElementById("bodyS")

    bodyS.innerHTML = "";
}

function reset3() {

    const bodyS1 = document.getElementById("bodyS1")

    bodyS1.innerHTML = "";
}

function listData(data) {

    data.sort((a, b) => a.name.localeCompare(b.name)).forEach((participant) => {
        initialTable(participant.discipline, participant.name, participant.id, participant.eventPosition, participant.disciplineType, participant.event)
    })
}

function initialTable(discipline, name, id, position, disciplineType, event) {

    const row = document.createElement('tr');
    let col = document.createElement('td');

    col.appendChild(document.createTextNode(name))
    row.appendChild(col)

    col = document.createElement('td')
    col.appendChild(document.createTextNode(id))
    row.appendChild(col)

    col = document.createElement('td')
    col.appendChild(document.createTextNode(discipline))
    row.appendChild(col)


    col = document.createElement('td')
    col.appendChild(document.createTextNode(disciplineType))
    row.appendChild(col)


    col = document.createElement('td')
    col.appendChild(document.createTextNode(event))
    row.appendChild(col)

    col = document.createElement('td')
    col.appendChild(document.createTextNode(position))
    row.appendChild(col)

    body1.appendChild(row)
}

document.getElementById("createId").addEventListener("change", () => {

    comprobarExistencia();
})

document.getElementById("createName").addEventListener("change", () => {
    comprobarExistencia();
})

function comprobarExistencia() {

    let id = document.getElementById("createId").value
    let nombre = document.getElementById("createName").value
    const xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "control.php?option=1", true);
    xhr5.onreadystatechange = () => {
        if (xhr5.readyState === 4 && xhr5.status === 200) {
            const data = JSON.parse(xhr5.responseText);
            for (let i = 0; i < data.length; ++i) {


                if (data[i].name === nombre && data[i].id === id) {

                    disableButton(2)

                } else if (data[i].id === id) {

                    alert("Ese ususario ya existe, debe colocar el mismo nombre")
                    disableButton(1)

                }
            }
        }

    };
    xhr5.send(null);
}

function disableButton(estado) {
    const button = document.getElementById("addButton")
    const disci = document.getElementById("createDiscipline")
    const tipodis = document.getElementById("createDisciplineType")
    const event = document.getElementById("createEvent")
    const posi = document.getElementById("createEventPosition")

    switch (estado) {

        case 1:

            button.disabled = true
            disci.disabled = true
            tipodis.disabled = true
            event.disabled = true
            posi.disabled = true

            break;
        case 2:
            button.disabled = false
            button.disabled = false
            disci.disabled = false
            tipodis.disabled = false
            event.disabled = false
            posi.disabled = false
            break;
    }
}

document.getElementById("addButton").addEventListener("click", () => {

    let name = document.getElementById("createName").value
    let id = document.getElementById("createId").value
    let discipline = document.getElementById("createDiscipline").value
    let disciplineType = document.getElementById("createDisciplineType").value
    let event = document.getElementById("createEvent").value
    let eventPosition = document.getElementById("createEventPosition").value

    if (name === "" && id === "" && discipline === "Seleccione..." && disciplineType === "Seleccione..." && event === "Seleccione..." && eventPosition === "") {
        alert("Rellene todos los espaios")

    } else {
        const xhr3 = new XMLHttpRequest();
        xhr3.open("get", `control.php?option=2&name=${name}&id=${id}&discipline=${discipline}&disciplineType=${disciplineType}&event=${event}&eventPosition=${eventPosition}`, true)
        xhr3.onreadystatechange = () => {
            if (xhr3.readyState === 4 && xhr3.status === 200) {

            }

        }
        xhr3.send(null)
        listButton()
        document.getElementById("create").reset();

    }
})

document.getElementById("deleteButton").addEventListener("click", () => {

    let id = document.getElementById("deleteId").value
    if (id === "") {
        alert("Rellene el campo correspondiente")
    } else {
        const xhr4 = new XMLHttpRequest();
        xhr4.open("get", `control.php?option=3&id=${id}`, true)
        xhr4.onreadystatechange = () => {
            if (xhr4.readyState === 4 && xhr4.status === 200) {
            }

        }
        xhr4.send(null)
        listButton()
        document.getElementById("form2").reset();
    }

})

document.getElementById("searchButton").addEventListener('click', () => {

    const initio = document.getElementById('id').value;

    const xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "control.php?option=1", true);

    let cont = 0;

    xhr5.onreadystatechange = () => {
        if (xhr5.readyState === 4 && xhr5.status === 200) {
            const data = JSON.parse(xhr5.responseText);

            let tabla = document.getElementById('tabla');

            for (let i = 0; i < data.length; ++i) {

                let fila = document.createElement('tr');
                let td = document.createElement('td');

                if (data[i].id === initio) {

                    const name = document.getElementById("labelName")
                    const id = document.getElementById("labelId")

                    name.innerText = data[i].name
                    id.innerText = data[i].id

                    cont++;

                    td = document.createElement('td');
                    td.innerText = data[i].discipline;
                    fila.appendChild(td);


                    td = document.createElement('td');
                    td.innerText = data[i].disciplineType;
                    fila.appendChild(td);

                    td = document.createElement('td');
                    td.innerText = data[i].event;
                    fila.appendChild(td);

                    td = document.createElement('td');
                    td.innerText = data[i].eventPosition;
                    fila.appendChild(td);

                }
                bodyS.appendChild(fila);

            }

            tabla.appendChild(bodyS);
        }
    };
    xhr5.send(null);

    document.getElementById("form3").reset()
    reset2()
})

function events() {
    let events = Array()
    const xhr6 = new XMLHttpRequest();
    xhr6.open('get', 'control.php?option=1', true)
    xhr6.onreadystatechange = () => {
        if (xhr6.readyState === 4 && xhr6.status === 200) {
            const data = JSON.parse(xhr6.responseText);
            data.sort((a, b) => a.name.localeCompare(b.name)).forEach(e => {
                if (!competRepeated(e, events)) {
                    document.getElementById("events").add(new Option(e.event))
                    events.push(e)
                }
            })
        }
    }
    xhr6.send(null)
}

document.getElementById("resultsButton").addEventListener("click", () => {
    const initio = document.getElementById('events').value;


    const xhr7 = new XMLHttpRequest();
    xhr7.open("GET", "control.php?option=1", true);

    let cont1 = 0;

    xhr7.onreadystatechange = () => {
        if (xhr7.readyState === 4 && xhr7.status === 200) {
            const data = JSON.parse(xhr7.responseText);
            data.sort((a, b) => a.eventPosition.localeCompare(b.eventPosition))

            let tabla = document.getElementById('tabla1');

            for (let i = 0; i < data.length; ++i) {

                let fila1 = document.createElement('tr');
                let td1 = document.createElement('td');

                if (data[i].event === initio) {

                    cont1++;
                    td1.innerText = data[i].name;
                    fila1.appendChild(td1);

                    td1 = document.createElement('td');
                    td1.innerText = data[i].id;
                    fila1.appendChild(td1);

                    td1 = document.createElement('td');
                    td1.innerText = data[i].discipline;
                    fila1.appendChild(td1);


                    td1 = document.createElement('td');
                    td1.innerText = data[i].disciplineType;
                    fila1.appendChild(td1);

                    td1 = document.createElement('td');
                    td1.innerText = data[i].event;
                    fila1.appendChild(td1);

                    td1 = document.createElement('td');
                    td1.innerText = data[i].eventPosition;
                    fila1.appendChild(td1);

                }
                bodyS1.appendChild(fila1);

            }

            tabla.appendChild(bodyS1);
        }
    };
    xhr7.send(null);

    document.getElementById("form4").reset()
    reset3()
})

function competRepeated(comp, event) {
    let status = false
    event.forEach(e => {
        if (e.event === comp.event) {
            status = true
        }
    })
    return status
}

function SoloNumeros(evt) {
    if (window.event) {
        keynum = evt.keyCode;
    } else {
        keynum = evt.which;
    }

    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13) {

        return true;
    } else {
        alert("Caracter invalido");
        return false;
    }

}

begin()