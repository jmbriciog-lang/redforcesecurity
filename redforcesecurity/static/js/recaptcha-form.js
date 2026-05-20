document.addEventListener('DOMContentLoaded', function () {
  var SITE_KEY = '6LfEPvIsAAAAANP00JUZjGynyxOwJhkIJ0EIxEqC';
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    grecaptcha.ready(function () {
      grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(function (token) {
        document.getElementById('g-recaptcha-response').value = token;
        form.submit();
      }).catch(function (err) {
        console.error('reCAPTCHA error:', err);
        var msg = document.getElementById('recaptcha-error-msg');
        if (!msg) {
          msg = document.createElement('p');
          msg.id = 'recaptcha-error-msg';
          msg.style.cssText = 'color:#e63946;font-weight:700;margin-top:10px;';
          form.appendChild(msg);
        }
        msg.textContent = 'Error de verificación. Por favor, inténtalo de nuevo.';
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      });
    });
  });
});
