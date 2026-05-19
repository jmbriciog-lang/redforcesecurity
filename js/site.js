document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle (mobile)
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('active');
    });
  }

  // FAQ accordion — style A: .faq-q / .open (layouts/contacto/list.html)
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.classList.toggle('open');
    });
  });

  // FAQ accordion — style B: .faq-question / .active (layouts/_default/contacto.html)
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      item.classList.toggle('active');
      var span = btn.querySelector('span');
      if (span) span.textContent = item.classList.contains('active') ? '-' : '+';
    });
  });
});
