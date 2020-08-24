$(document).ready(() => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const todayDate = mm + '-' + dd + '-' + yyyy;

    (async () => {
        const res = await fetch('/api', {
            method: 'GET',
            headers: { 'token': localStorage.getItem('token') }
        });

        if (res.status !== 200) {
            window.location.assign(window.location.href + 'login');
        }

        const companies = await res.json();
        const response = await fetch('/api/templates', {
            method: 'GET',
            headers: { 'token': localStorage.getItem('token') }
        });
        const templates = await response.json();

        for (let i = 0; i < companies.length; i++) {
            $('tbody').append(`
                <tr>
                    <th scope="row" class="index">${i + 1}</th>
                    <td class="checkbox"><input class="target-row" type="checkbox"></td>
                    <td class="company-name">${companies[i].company}</td>
                    <td class="company-position">${companies[i].position}</td>
                    <td class="contact-name">${companies[i].contact}</td>
                    <td class="email">${companies[i].email}</td>
                    <td class="template">${companies[i].template}</td>
                    <td class="phone">${companies[i].phone}</td>
                    <td class="contacted">${companies[i].wasContacted}</td>
                    <td class="date">${companies[i].dateContacted}</td>
                    <td class="response">${companies[i].didRespond}</td>
                    <td class="providedWork">${companies[i].resultedInWork}</td>
                </tr>
            `);
        }

        templates.forEach(item => {
            $('#template-input').append(`<option value="${item.name}">${item.name}</option`);
        });

        const td = $('td');
        for (i = 0; i < td.length; i++) {
            const str = $(td[i]).text().trim();

            if (str === 'NO') {
                $(td[i]).css('background-color', 'rgba(255, 0, 0, 0.3)');
            }
            if (str === 'YES') {
                $(td[i]).css('background-color', 'rgba(0, 255, 0, 0.3)');
            }
        }

        $('.target-row').click(e => {
            const checkedStatus = $(e.target).attr('checked');
            if (checkedStatus) {
                $(e.target).attr('checked', false);
            } else {
                $(e.target).attr('checked', true);
                const fields = $(e.target).parent().siblings();
                const dateArray = fields[8].textContent.split('-');
                $('#company').val(fields[1].textContent);
                $('#position').val(fields[2].textContent);
                $('#contact').val(fields[3].textContent);
                $('#email').val(fields[4].textContent);
                $('#template-input').val(fields[5].textContent);
                $('#phone').val(fields[6].textContent);
                $('#contacted').val(fields[7].textContent);
                $('#month').val(dateArray[0] ? dateArray[0] : mm);
                $('#day').val(dateArray[1] ? dateArray[1] : dd);
                $('#year').val(dateArray[2] ? dateArray[2] : yyyy);
                $('#response').val(fields[9].textContent);
                $('#jobs').val(fields[10].textContent);
            }
        });
    })();

    $('#lead-clear').click(() => {
        clearLeadForm();
    });

    $('#lead-submit').click(() => {
        const selection = $('#action').val();
        const company = $('#company').val();
        const position = $('#position').val();
        const contact = $('#contact').val();
        const email = $('#email').val();
        const template = $('#template-input').val();
        const phone = $('#phone').val();
        const wasContacted = $('#contacted').val();
        const dateContacted = $('#month').val() + '-' + $('#day').val() + '-' + $('#year').val();
        const didRespond = $('#response').val();
        const resultedInWork = $('#jobs').val();

        const newCompany = {
            company,
            position,
            contact,
            email,
            template,
            phone
        };

        const updateCompany = {
            company,
            position,
            contact,
            email,
            template,
            phone,
            wasContacted,
            dateContacted,
            didRespond,
            resultedInWork
        };

        switch (selection) {
            case 'add':
                if (company) {
                    (async () => {
                        const res = await fetch('/api/add', {
                            method: 'POST',
                            body: JSON.stringify(newCompany),
                            headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' }
                        });
                        console.log(res.status);
                        if (res.status === 200) {
                            location.reload();
                        } else {
                            showError('A server error occurred.');
                        }
                    })();
                } else {
                    showError('Company name is required');
                }

                break;
            case 'update':
                if (company) {
                    (async () => {
                        const res = await fetch('/api', {
                            method: 'POST',
                            body: JSON.stringify(updateCompany),
                            headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' }
                        });

                        if (res.status === 200) {
                            location.reload();
                        } else {
                            showError('A server error occurred.');
                        }
                    })();
                } else {
                    showError('Company name is required');
                }

                break;
            case 'email-selected':
                const targets = $('.target-row:checked').parent().parent();

                if (targets[0]) {
                    const clients = [];
                    targets.each((index, item) => {
                        const fields = $(item).children();
                        const { message, subject } = JSON.parse(localStorage.getItem(fields[6].textContent));
                        const mailObj = {
                            email: fields[5].textContent,
                            company: fields[2].textContent,
                            position: fields[3].textContent,
                            contactName: fields[4].textContent,
                            message,
                            subject
                        };

                        clients.push(mailObj);
                    });

                    (async () => {
                        const res = await fetch('/api/email', {
                            method: 'POST',
                            body: JSON.stringify(clients),
                            headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' }
                        });
                        console.log(res.status);
                        if (res.status === 200) {


                            clients.forEach((item, index) => {
                                (async () => {
                                    await fetch('/api', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            company: item.company, wasContacted: 'YES', dateContacted: todayDate
                                        }),
                                        headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' }
                                    });
                                    if (index === clients.length - 1) {
                                        showSuccess('Email(s) were sent successfully!');
                                    }
                                })();
                            });
                        } else {
                            showError('A server error occurred.');
                        }
                    })();
                } else {
                    showError('No email addresses were selected.');
                }

                break;
            case 'delete':
                const selected = $('.target-row:checked').parent().next();
                const names = [];
                for (let i = 0; i < selected.length; i++) {
                    names[i] = $(selected[i]).text();
                }

                if (names[0]) {
                    (async () => {
                        const res = await fetch('/api', {
                            method: 'DELETE',
                            body: JSON.stringify({ companies: names }),
                            headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
                        });
                        console.log(res.status);
                        if (res.status === 200) {
                            location.reload();
                        } else {
                            showError('An server error occurred.');
                        }
                    })();
                } else {
                    showError('The selection array did not contain a name.');
                }
                break;
            default:
                showError('An unexpected error occurred.');
                break;
        }
    });
});

function showError(msg) {
    $('#status-msg').text(msg).css('color', '#ff0000');
    setTimeout(() => {
        $('#status-msg').text('');
    }, 5000);
}

function clearLeadForm() {
    $('#company').val('');
    $('#position').val('');
    $('#contact').val('');
    $('#email').val('');
    $('#template-input').val('');
    $('#phone').val('');
    $('#contacted').val('');
    $('#date').val('');
    $('#response').val('');
    $('#jobs').val('');
}

function showSuccess(msg) {
    $('#status-msg').text(msg).css('color', '#00ff00');
    setTimeout(() => {
        location.reload();
    }, 5000);
}