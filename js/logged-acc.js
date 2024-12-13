document.addEventListener("DOMContentLoaded", () => {
    // Attach a delegated click event listener for the account icon
    document.body.addEventListener("click", (event) => {
      const accountIcon = event.target.closest("#accountIcon");
      if (accountIcon) {
        const token = localStorage.getItem("jwtToken");
  
        if (token) {
          // Redirect to profile details page if logged in
          accountIcon.href = "acc-profile-details.html";
        } else {
          // Redirect to login page if not logged in
          accountIcon.href = "acc-login.html";
        }
      }
    });
  
    // Attach a delegated click event listener for the logout button
    document.body.addEventListener("click", (event) => {
      const logoutButton = event.target.closest(".logout-btn");
      if (logoutButton) {
        // Remove the JWT token from localStorage
        localStorage.removeItem("jwtToken");
  
        // Redirect the user to the login page
        window.location.href = "acc-login.html";
      }
    });
  
    // Login functionality (inside a form submit event listener)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Store the token in localStorage
            localStorage.setItem("jwtToken", data.token);
  
            window.location.href = "acc-profile-details.html"; // Redirect to profile page
          } else {
            alert(data.message || "Error logging in");
          }
        } catch (error) {
          console.error("Login Error:", error);
          console.log("An error occurred during login.");
        }
      });
    }
  });
  