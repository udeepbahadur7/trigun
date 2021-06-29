async function deleteUserFromDb(username) {
    await fetch(`${username}`, {
        method: 'DELETE'
    });
}
function handleDelete(username) {
    alert(`Are you sure you want to delete ${username}`);
    try {
        deleteUserFromDb(username);
        location.reload()
    } catch (err) {
        alert("Error deleting user")
    }
}
