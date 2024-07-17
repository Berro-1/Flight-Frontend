document.addEventListener('DOMContentLoaded', async () => {
    let menuicn = document.querySelector(".menuicn");
    let nav = document.querySelector(".navcontainer");
    let main = document.querySelector(".main");

    menuicn.addEventListener("click", () => {
        nav.classList.toggle("navclose");
        main.classList.toggle("main-close");
    });
    await fetchUsers();
    document.getElementById('searchButton').addEventListener('click', searchUsers);
});

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/user/manageUsers.php', {
            method: 'GET'
        });
        const data = await response.json();
        fillUsersTable(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function fillUsersTable(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-user-id', user.user_id); 
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="deleteUser(${user.user_id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        try {
            const response = await fetch('http://localhost/fullstack/Flight-Backend/api/user/manageUsers.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'delete', user_id: userId })
            });

            const result = await response.json();
            if (result.success) {
                await fetchUsers();
            } else {
                console.error('Error deleting user:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function searchUsers() {
    const searchTerm = document.getElementById('searchUser').value;
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/user/manageUsers.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'search', term: searchTerm })
        });

        const data = await response.json();
        fillUsersTable(data);
    } catch (error) {
        console.error('Error searching users:', error);
    }
}
