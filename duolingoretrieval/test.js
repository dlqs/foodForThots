var data = { username : 'matthea1998', password: 'password' };
login(data);
function login(data) {
    var url = 'https://www.duolingo.com/login';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}