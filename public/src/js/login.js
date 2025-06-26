document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const loginError = document.getElementById("loginError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Debug logs
    console.log("Submitted:", email, password);

    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/home.html";
      // window.location.replace("/home.html");
    } else {
      if (loginError) {
        loginError.textContent = "❌ Invalid credentials. Please try again.";
        loginError.classList.remove("hidden");
      } else {
        alert("❌ Invalid credentials.");
      }
    }
  });
});
