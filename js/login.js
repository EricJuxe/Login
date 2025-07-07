document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("remember");
  const toggleBtn = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");
  const form = document.querySelector("form");

  // Mostrar/Ocultar contraseña
  toggleBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
  });

  // Validar contraseña segura
  function isPasswordValid(password) {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUppercase && hasSpecialChar;
  }

  // Cargar desde localStorage SOLO si rememberMe es true
  const remember = localStorage.getItem("rememberMe");
  if (remember === "true") {
    emailInput.value = localStorage.getItem("savedEmail") || "";
    passwordInput.value = localStorage.getItem("savedPassword") || "";
    rememberCheckbox.checked = true;
  } else {
    // 🔥 LIMPIA valores visuales si no se debe recordar
    emailInput.value = "";
    passwordInput.value = "";
    rememberCheckbox.checked = false;
  }

  // Envío del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isPasswordValid(password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo especial.");
      return;
    }

    // Guardar o borrar datos según el estado del checkbox
    if (rememberCheckbox.checked) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
      localStorage.removeItem("rememberMe");
    }

    alert("Inicio de sesión exitoso. Recargando...");
    location.reload();
  });
});
