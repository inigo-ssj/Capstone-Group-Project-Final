document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view your profile.");
    window.location.href = "acc-login.html"; // Redirect to login
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("name").textContent = data.name;
      document.getElementById("email").textContent = data.email;
    } else {
      alert(data.message || "Error fetching profile");
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "acc-login.html"; // Redirect to login
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching your profile.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Pre-fill the form with the user data
        document.getElementById("name").value = data.name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }
});

// Pre-fill form with user data after login
function prefillProfileForm() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User not authenticated.");
    return;
  }

  fetch("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phone");

        if (nameField) nameField.value = data.name || "";
        if (emailField) emailField.value = data.email || "";
        if (phoneField) phoneField.value = data.phone || "";

        const streetField = document.getElementById("street");
        const cityField = document.getElementById("city");
        const postalCodeField = document.getElementById("postalCode");
        const countryField = document.getElementById("country");

        if (streetField) streetField.value = data.address?.street || "";
        if (cityField) cityField.value = data.address?.city || "";
        if (postalCodeField)
          postalCodeField.value = data.address?.postalCode || "";
        if (countryField) countryField.value = data.address?.country || "";
      }
    })
    .catch((error) => {
      console.error("Network error", error);
    });
}

// Call the function to pre-fill the form
prefillProfileForm();

//save change button for personal information
document
  .getElementById("personalInfoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    const personalInfo = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(personalInfo),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Personal information updated successfully!");
      } else {
        console.error("Error updating personal information:", result.message);
      }
    } catch (error) {
      console.error("Failed to update personal information:", error);
    }
  });

//save address button
document
  .getElementById("addressForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    const addressInfo = {
      address: {
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        postalCode: document.getElementById("postalCode").value,
        country: document.getElementById("country").value,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressInfo),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Address updated successfully!");
      } else {
        console.error("Error updating address:", result.message);
      }
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  });


