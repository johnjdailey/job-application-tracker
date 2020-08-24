$(document).ready(() => {
    (async () => {
        const res = await fetch('/api/templates', {
            method: 'GET',
            headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
        });
        const templates = await res.json();
        templates.forEach(item => {
            $('#action').append(`
                <option value="${item.name}">${item.name}</option>
            `);
            localStorage.setItem(item.name, JSON.stringify(item));
        });
        const name = $('#action').val();
        const template = JSON.parse(localStorage.getItem(name));
        $('#template-name').val(template.name);
        $('#template-editor').val(template.message);
        $('#subject').val(template.subject);
    })();

    $('#template-submit').click(e => {
        e.preventDefault();
        const name = $('#template-name').val();
        const subject = $('#subject').val();
        const message = $('#template-editor').val();
        const action = $('#template-action').val();

        switch (action) {
            case 'add':
                (async () => {
                    const res = await fetch('/api/templates', {
                        method: 'POST',
                        body: JSON.stringify({ name, message, subject }),
                        headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
                    });

                    if (res.status === 200) {
                        location.reload();
                    } else {
                        showError('A server error occurred.');
                    }
                })();
                break;
            case 'update':
                (async () => {
                    const res = await fetch('/api/update', {
                        method: 'POST',
                        body: JSON.stringify({ name, message, subject }),
                        headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
                    });

                    if (res.status === 200) {
                        location.reload();
                    } else {
                        showError('A server error occurred.');
                    }
                })();
                break;
            case 'delete':
                (async () => {
                    const res = await fetch('/api/templates', {
                        method: 'DELETE',
                        body: JSON.stringify({ name }),
                        headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
                    });

                    if (res.status === 200) {
                        localStorage.removeItem(name);
                        location.reload();
                    } else {
                        showError('A server error occurred.');
                    }
                })();
                break;
            default:
                showError('An unexpected error occurred.');
                break;
        }
    });

    $('#template-clear').click(e => {
        e.preventDefault();
        $('#template-name').val('');
        $('#template-editor').val('');
        $('#subject').val('');
    });

    $('#action').change(() => {
        const name = $('#action').val();
        const template = JSON.parse(localStorage.getItem(name));
        $('#template-name').val(template.name);
        $('#template-editor').val(template.message);
        $('#subject').val(template.subject);
    });
});

function showError(msg) {
    $('#status-msg').text(msg).css('color', '#ff0000');
    setTimeout(() => {
        $('#status-msg').text('');
    }, 5000);
}

