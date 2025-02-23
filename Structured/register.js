document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const mobInput = document.getElementById("mob");
    const ageInput = document.getElementById("age");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    function validateName() {
        const name = nameInput.value.trim();
        const regex = /^[A-Za-z\s]+$/;
        if (!name) return "Name is required.";
        if (!regex.test(name)) return "Name must contain only letters.";
        return "";
    }

    function validateMobile() {
        const mob = mobInput.value.trim();
        const regex = /^[6-9]\d{9}$/;
        if (!mob) return "Mobile number is required.";
        if (!regex.test(mob)) return "Enter a valid 10-digit mobile number.";
        return "";
    }

    function validateAge() {
        const age = parseInt(ageInput.value, 10);
        if (!ageInput.value) return "Age is required.";
        if (isNaN(age) || age < 16) return "Age must be 16 or older.";
        return "";
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required.";
        if (!regex.test(email)) return "Enter a valid email address.";
        return "";
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        if (!password) return "Password is required.";
        if (password.length < 6) return "Password must be at least 6 characters long.";
        return "";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const errors = [
            validateName(),
            validateMobile(),
            validateAge(),
            validateEmail(),
            validatePassword()
        ].filter(error => error !== "");

        if (errors.length > 0) {
            alert("Registration failed:\n\n" + errors.join("\n"));
        } else {
            alert("Registration successful!");
            form.submit();
        }
    });
});
