document.addEventListener('DOMContentLoaded', function() {
    var token = document.getElementById('token');
    token.value = localStorage.getItem('findmjob_token');
    document.getElementById('save').addEventListener('click', function() {
        localStorage.setItem('findmjob_token',  token.value);
        document.getElementById('msg').innerHTML = "Saved!";
    });
});