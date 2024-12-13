// LOGIN FORM SUBMISSION HANDLER
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Save the token locally
      console.log("Login successful! Redirecting to profile...");
      window.location.href = "acc-profile-details.html"; // Redirect to profile
    } else {
      alert(data.message || "Error logging in");
    }
  } catch (error) {
    console.error("Error:", error);
    console.log("An error occurred during login.");
  }
});

// ---------------- new password modal---------------

// Modal elements
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementById("closeModal");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

// Open modal when "Forgot Password?" is clicked
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent link's default behavior
  forgotPasswordModal.classList.remove("hidden");
});

// Close modal when 'Cancel' is clicked
closeModal.addEventListener("click", () => {
  forgotPasswordModal.classList.add("hidden");
});

// Handle form submission (password reset)
forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("resetEmail").value;
  const newPassword = document.getElementById("newPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password updated successfully.");
      forgotPasswordModal.classList.add("hidden");  // Close the modal after successful password reset
    } else {
      alert(data.message || "Failed to update password.");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("An error occurred. Please try again later.");
  }
});
