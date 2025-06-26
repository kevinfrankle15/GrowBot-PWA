document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
  const path = window.location.pathname;

  console.log("Main JS loaded");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("Path:", path); // ✅ now in scope

  // 🔒 Protect home.html
  if (path.endsWith("/home.html")) {
    if (!isLoggedIn) {
      window.location.href = "index.html";
    } else if (isLoggedIn == true) {
      console.log("test ....");
      const app = document.getElementById("app");
      if (app) {
        app.classList.remove("hidden");
      } else {
        console.error("❌ #app element not found in DOM");
      }

      const notifyBtn = document.getElementById("notifyBtn");
      if (notifyBtn) {
        notifyBtn.addEventListener("click", () => {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("🔔 Hello from Grow Bot!");
            }
          });
        });
      }

      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "index.html";
        });
      }
    }
  }
});
