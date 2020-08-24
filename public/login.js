$(document).ready(() => {

    $('form').on('submit', e => {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const user = {
            username,
            password
        };

        (async () => {
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 200) {
                const { token } = await res.json();
                localStorage.setItem('token', token);
                window.location.assign('/');
            } else {
                $('#result-msg').text('Incorrect username/password');
                setTimeout(() => {
                    $('#result-msg').text('');
                }, 5000);
            }
        })();
    });
});