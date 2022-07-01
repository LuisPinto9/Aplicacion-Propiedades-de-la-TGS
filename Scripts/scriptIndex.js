function begin() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', "./Php/control.php?option=1", true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)
            data.sort((a, b) => a.name.localeCompare(b.name)).forEach((user) => {
                alert(user.name)
            })
        }
    }
    xhr.send(null)

}

function login(){
    const name = document.getElementById("inputUser").value;
    const password = document.getElementById("inputPassword").value;
    const xhr = new XMLHttpRequest();
    xhr.open('get', `./Php/controlLogin.php?option=2&name=${name}&password=${password}`, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    }
    xhr.send(null)
}

function findUser(userN, password) {

    const xhr = new XMLHttpRequest();
    xhr.open("get", "./Php/control.php?option=1", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            data.forEach((user)=>{
                if (user.name === userN && user.password === password) {
                    return user
                }else{
                    return null
                }
            })
        }
    };
    xhr.send(null);
}
