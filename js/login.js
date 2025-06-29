$(document).ready(function () {
    var authToken = "U29tYWxpbmRhcw==";
    localStorage.setItem("authToken", authToken);
});


    
    const fields = [
        { id: "username", max: 8, errClass: "usernameErr" },
        { id: "password", max: 8, errClass: "passwordErr" }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = document.querySelector(`.${field.errClass}`);

        input.addEventListener("input", function () {
            if (input.value.length > field.max) {
                errorSpan.textContent = `Maximum ${field.max} characters allowed.`;
            } else {
                errorSpan.textContent = "";
            }
        });
    });

const loginUrl = "http://localhost:8081/buddybench/user/loginUser"; 

function loginUser() {
    const username = $("#username").val();
    const password = $("#password").val();

    let isValid = true;

    $(".usernameErr").text("");
    $(".passwordErr").text("");
     $(".loginFail").text("");

    // Field validation
    if (!username) {
        $(".usernameErr").text("Enter your username or email !");
        isValid = false;
    }

    if (!password) {
        $(".passwordErr").text("Enter your password!");
        isValid = false;
    }

    if (!isValid) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("Authentication token not found.");
        return;
    }

   
    $.ajax({
        url: loginUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify({
            username: formData.username,
            password:formData.password,
        }),
        success: function (response) {
            alert("Login successful!");
           window.location.href = "user/dashboard.html";
        },
        error: function (xhr) {
            if (xhr.status === 401 || xhr.status === 403) {
                $(".loginFail").text("Incorrect username or password.");
            } else {
                $(".loginFail").text("Login failed. Please try again.");
            }
        }
    });
}
