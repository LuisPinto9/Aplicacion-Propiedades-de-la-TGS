function begin() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', './Php/ControlLogin.php?option=1', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            alert(data)
        }
    }
    xhr.send(null)

}