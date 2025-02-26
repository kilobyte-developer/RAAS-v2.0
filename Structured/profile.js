document.addEventListener("DOMContentLoaded", function () {
    let userId = localStorage.getItem("loggedInUserId") || 1; // Get stored user ID or default to 1

    fetch(`http://localhost:5000/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        })
        .then(user => {
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-email").textContent = user.email;
            document.getElementById("user-phone").textContent = user.phone;
        })
        .catch(error => {
            console.error("Error fetching user:", error);
            document.getElementById("profile-info").innerHTML = "<p class='text-danger'>User not found.</p>";
        });

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUserId"); // Remove stored user ID
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    });
});
