/* Armila's Restaurant & Lounge. Small enhancements only: every page works without this file. */

/* ---------------------------------------------------------------
   Google Analytics 4
   Paste your Measurement ID (looks like G-ABC123XYZ) between the quotes.
   Leave it empty and no analytics code loads.
---------------------------------------------------------------- */
var GA_MEASUREMENT_ID = '';

(function () {
  'use strict';

  /* Analytics. Skipped when the visitor has Global Privacy Control turned on. */
  var gpc = navigator.globalPrivacyControl === true;
  window.track = function () {};
  if (GA_MEASUREMENT_ID && !gpc) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
    window.track = function (name, params) { window.gtag('event', name, params || {}); };
  }

  /* Count calls, orders and direction requests as GA4 events */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var where = a.getAttribute('data-where') || '';
    if (href.indexOf('tel:') === 0) window.track('click_call', { link_location: where });
    else if (href.indexOf('ubereats.com') > -1) window.track('click_order', { link_location: where });
    else if (href.indexOf('google.com/maps/dir') > -1) window.track('click_directions', { link_location: where });
    else if (/\.pdf$/i.test(href)) window.track('file_download', { file_name: href.split('/').pop() });
  });

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); toggle.focus(); }
    });
  }

  /* Open now / closed, computed in Hamilton time from the hours on the page */
  var hoursEl = document.getElementById('hours-data');
  if (hoursEl) {
    var hours = JSON.parse(hoursEl.textContent); // index 0 = Sunday
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; return ''; };
    var dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    var now = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
    var mins = function (hhmm) { var p = hhmm.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); };
    var label = function (hhmm) {
      var m = mins(hhmm), h = Math.floor(m / 60), mm = m % 60;
      var suffix = h < 12 ? 'AM' : 'PM'; var h12 = h % 12 === 0 ? 12 : h % 12;
      return h12 + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + suffix;
    };
    var today = hours[dayIdx], yesterday = hours[(dayIdx + 6) % 7];
    var state, text;
    if (now < mins(yesterday.close)) { state = 'open'; text = 'Open now until ' + label(yesterday.close); }
    else if (now >= mins(today.open)) { state = 'open'; text = 'Open now until ' + label(today.close); }
    else { state = 'closed'; text = 'Closed now. Opens today at ' + label(today.open); }
    var status = document.querySelectorAll('[data-open-status]');
    for (var i = 0; i < status.length; i++) { status[i].textContent = text; status[i].setAttribute('data-state', state); }
    // Highlight the service day in the hours table (after midnight, that is still yesterday's service)
    var serviceDay = now < mins(yesterday.close) ? (dayIdx + 6) % 7 : dayIdx;
    var row = document.querySelector('.hours tr[data-day="' + serviceDay + '"]');
    if (row) row.classList.add('today');
  }

  /* Map: hide the loading message once the embed has loaded */
  var map = document.querySelector('.map iframe');
  if (map) {
    map.addEventListener('load', function () { var l = document.querySelector('.map-loading'); if (l) l.hidden = true; });
  }

  /* Menu: highlight the section chip that is in view */
  var chips = document.querySelectorAll('.chips a');
  if (chips.length && 'IntersectionObserver' in window) {
    var byId = {};
    for (var c = 0; c < chips.length; c++) byId[chips[c].getAttribute('href').slice(1)] = chips[c];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var k in byId) byId[k].classList.remove('active');
        var chip = byId[en.target.id];
        if (chip) { chip.classList.add('active'); chip.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (var id in byId) { var sec = document.getElementById(id); if (sec) io.observe(sec); }
  }

  /* Inquiry form: validation, loading state, success and error messages */
  var form = document.querySelector('form[data-inquiry]');
  if (form) {
    var statusBox = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var buttonText = button.querySelector('.label');
    var idleLabel = buttonText.textContent;

    var showError = function (field, msg) {
      var err = document.getElementById(field.id + '-error');
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg || '';
    };
    var check = function (field) {
      if (field.type === 'tel') {
        var digits = field.value.replace(/\D/g, '');
        field.setCustomValidity(field.value && (digits.length < 10 || digits.length > 15) ? 'phone' : '');
      }
      var v = field.validity;
      if (v.valid) { showError(field, ''); return true; }
      var name = field.getAttribute('data-label') || 'This field';
      if (v.valueMissing) showError(field, name + ' is required.');
      else if (v.typeMismatch && field.type === 'email') showError(field, 'Enter an email address like name@example.com.');
      else if (v.customError && field.type === 'tel') showError(field, 'Enter a 10-digit phone number, like 289 674 9692.');
      else if (v.rangeUnderflow) showError(field, 'Enter at least ' + field.min + '.');
      else showError(field, 'Check this field.');
      return false;
    };
    var fields = form.querySelectorAll('[data-label]');
    fields.forEach(function (f) { f.addEventListener('blur', function () { if (f.value) check(f); }); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusBox.className = 'form-status'; statusBox.textContent = '';
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }

      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      buttonText.textContent = 'Sending inquiry';

      var action = form.getAttribute('action');
      var url = action.indexOf('formsubmit.co/') > -1 && action.indexOf('/ajax/') === -1 ? action.replace('formsubmit.co/', 'formsubmit.co/ajax/') : action;
      fetch(url, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (body) { return { ok: r.ok, body: body }; }); })
        .then(function (res) {
          var success = res.ok && res.body.success !== false && res.body.success !== 'false';
          if (!success) throw new Error('send failed');
          form.reset();
          statusBox.className = 'form-status ok';
          statusBox.textContent = 'Inquiry sent. We will reply by email or phone.';
          window.track('generate_lead', { form: 'catering_inquiry' });
        })
        .catch(function () {
          statusBox.className = 'form-status err';
          statusBox.innerHTML = 'Your inquiry did not send. Check your connection and try again, or call <a href="tel:+12896749692">(289) 674-9692</a>.';
        })
        .then(function () {
          button.removeAttribute('aria-busy');
          button.disabled = false;
          buttonText.textContent = idleLabel;
          statusBox.focus();
        });
    });
  }
})();
