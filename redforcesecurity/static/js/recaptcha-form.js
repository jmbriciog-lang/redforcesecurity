document.addEventListener('DOMContentLoaded', function () {
  var SITE_KEY = '6LfEPvIsAAAAANP00JUZjGynyxOwJhkIJ0EIxEqC';
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'ENVIANDO...'; }

    var errorMsg = document.getElementById('form-error-msg');

    grecaptcha.ready(function () {
      grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(function (token) {
        document.getElementById('g-recaptcha-response').value = token;

        fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        })
        .then(function (response) {
          if (response.ok) {
            window.location.href = '/gracias/';
          } else {
            return response.json().then(function (data) {
              throw new Error(data.error || 'Error al enviar el formulario.');
            });
          }
        })
        .catch(function (err) {
          console.error('Form submit error:', err);
          if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.id = 'form-error-msg';
            errorMsg.style.cssText = 'color:#e63946;font-weight:700;margin-top:12px;font-size:0.9rem;';
            form.appendChild(errorMsg);
          }
          errorMsg.textContent = err.message || 'Ha ocurrido un error. Por favor, inténtalo de nuevo o escríbenos a info@redforcesecurity.com';
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
        });

      }).catch(function (err) {
        console.error('reCAPTCHA error:', err);
        if (!errorMsg) {
          errorMsg = document.createElement('p');
          errorMsg.id = 'form-error-msg';
          errorMsg.style.cssText = 'color:#e63946;font-weight:700;margin-top:12px;font-size:0.9rem;';
          form.appendChild(errorMsg);
        }
        errorMsg.textContent = 'Error de verificación de seguridad. Por favor, recarga la página e inténtalo de nuevo.';
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      });
    });
  });
});
