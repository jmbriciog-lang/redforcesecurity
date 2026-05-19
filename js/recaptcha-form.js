document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('rfForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('rfSubmit');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    grecaptcha.ready(function () {
      grecaptcha.execute('6LfEPvIsAAAAANP00JUZjGynyxOwJhkIJ0EIxEqC', { action: 'contact' }).then(function (token) {
        document.getElementById('recaptcha-response').value = token;
        form.submit();
      });
    });
  });
});
