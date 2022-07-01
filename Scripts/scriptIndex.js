function begin() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/Control.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            listData(data)
        }
    }
    xhr.send(null)

}

function login() {
    const name = document.getElementById("inputUser").value;
    const password = document.getElementById("inputPassword").value;
    let data = findUser(name, password);
    const xhr1 = new XMLHttpRequest();
    xhr1.open('get', `./Php/ControlLogin.php?option=2&name=${name}&password=${password}`, true)
    xhr1.onreadystatechange = () => {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            
        }
    }
    xhr1.send(null)
}

function listData(data) {

    data.sort((a, b) => a.name.localeCompare(b.name)).forEach((user) => {
        alert(user.name)
    })
}

function findUser(user, password) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./Php/Control.php?option=1", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            for (let i = 0; i < data.length; ++i) {


                if (data[i].name === user && data[i].password === password) {
                    return data[i]
                }else{
                    return null
                }
            }
        }

    };
    xhr.send(null);
}
