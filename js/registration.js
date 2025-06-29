
$( document ).ready(function() {
    var authToken = "U29tYWxpbmRhcw==";
    localStorage.setItem("authToken",authToken);
});

 /*// Real-time max length validator
    const fields = [
        { id: "firstName", max: 15, errClass: "firstNameErr" },
        { id: "middleName", max: 15 },
        { id: "lastName", max: 15, errClass: "lastNameErr" },
        { id: "email", max: 100, errClass: "emailErr" },
        { id: "username", max: 8, errClass: "usernameErr" },
        { id: "password", max: 8, errClass: "passwordErr" },
        { id: "confirmpwd", max: 8, errClass: "confirmpwdErr" }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = field.errClass
            ? document.querySelector(`.${field.errClass}`)
            : input.nextElementSibling;

        input.addEventListener("input", function () {
            if (input.value.length > field.max) {
                errorSpan.textContent = `Maximum ${field.max} characters allowed.`;
            } else {
                errorSpan.textContent = "";
            }
        });
    });
*/

const url = "http://localhost:8081/buddybench/user/createUser";

function signUp() {
    const fields = ["firstName", "lastName", "email", "username", "password", "confirmpwd"];
    let formData = {};

    // Validate input fields dynamically
    for (let field of fields) {
        let value = $(`#${field}`).val();
        formData[field] = value;
        if (!value) {
            $(`.${field}Err`).text(`Enter your ${field}!`);
            return false;
        }
    }

    // Password confirmation check
    if (formData.password !== formData.confirmpwd) {
        $(".pwdmismatchErr").text("Your password did not match!");
        return false;
    }

    // Retrieve a valid token dynamically from local storage
    const token = localStorage.getItem("authToken"); 

    if (!token) {
        console.error("No authentication token found!");
        alert("Authentication required. Please log in.");
        return false;
    }

    $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify({
            firstName: formData.firstName,
            middleName: $("#middleName").val() || "", 
            lastName: formData.lastName,
            emailId: formData.email,
            userName: formData.username,
            password:formData.password,
            confirmPassword:formData.confirmpwd
        }),
        success: function(response) {
            $(".success").text("You are successfully registered!");
            alert("You are successfully registered!");
             window.location.href = "login.html";
        },
        error: function(xhr, status, error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");

        }
    });
}
