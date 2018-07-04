function reg() {
    var nume = document.getElementById('n').value;
    var email = document.getElementById('e').value.indexOf("@");
    var username = document.getElementById('u').value;
    var pass = document.getElementById('p').value;
    var repass = document.getElementById('p2').value;
    if (pass != repass) {
        alert("Parolele nu corespund!");
    }
    else if (email == -1) {
        alert("Email-ul tău trebuie să fie de forma:\nexemplu@platforma.domeniu");
    }
    else if (username.length < 3 || username.length > 20) {
        alert("Username-ul trebuie să conțină între 3 și 20 de caractere!");
    }
}