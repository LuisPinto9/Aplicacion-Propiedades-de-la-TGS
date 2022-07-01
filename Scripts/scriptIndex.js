function begin() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', './Resources/Control.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            listData(data)
        }
    }
    xhr.send(null)

}

function userName() {
    let name = document.getElementById("inputUser").value
    data = findUser(name, password)
    const xhr = new XMLHttpRequest();
    xhr.open('post', `./Resources/Control.php?option=4&name=${user.name}`, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
        }
    }
    xhr.send(null)
}

function listData(data) {

    data.sort((a, b) => a.name.localeCompare(b.name)).forEach((user) => {
        alert(user.name)
    })
}

function findUser(user, password) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./Resources/Control.php?option=1", true);
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
