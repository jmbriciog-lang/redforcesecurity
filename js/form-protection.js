(function () {
  var RATE_LIMIT_MS = 30000;
  var STORAGE_KEY = 'rf_last_submit';

  var form = document.getElementById('rfForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    var last = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    var now = Date.now();

    if (now - last < RATE_LIMIT_MS) {
      e.preventDefault();
      var remaining = Math.ceil((RATE_LIMIT_MS - (now - last)) / 1000);
      var btn = document.getElementById('rfSubmit');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Espera ' + remaining + 's antes de volver a enviar';
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = 'Solicitar contacto';
        }, RATE_LIMIT_MS - (now - last));
      }
      return;
    }

    localStorage.setItem(STORAGE_KEY, String(now));
  });
})();
