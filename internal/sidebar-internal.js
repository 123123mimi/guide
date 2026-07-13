/**
 * Sidebar Widget for internal guide page.
 * Two groups: 콘텐츠 관리, 심사 — each expandable/collapsible.
 */
(function () {
  var scriptTag = document.currentScript;
  var groups = JSON.parse(scriptTag.getAttribute('data-groups') || '[]');

  function arrowSvg(open) {
    return '<svg class="sidebar-arrow' + (open ? ' open' : '') + '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>';
  }

  function buildMenu() {
    var html = '<div class="sidebar-widget">';
    html += '<div class="sidebar-widget-title">콘텐츠팀 가이드</div>';
    html += '<nav>';

    groups.forEach(function (g) {
      html += '<button class="sidebar-group-btn active" data-toggle="' + g.key + '">';
      html += arrowSvg(true);
      html += g.label + '</button>';
      html += '<div class="sidebar-children" id="sidebar-children-' + g.key + '">';
      g.sections.forEach(function (s) {
        html += '<a href="' + s.href + '">' + s.label + '</a>';
      });
      html += '</div>';
    });

    html += '</nav></div>';
    return html;
  }

  var menuHTML = buildMenu();

  var hamburgerIcon = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var closeIcon = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';

  var desktopEl = document.createElement('div');
  desktopEl.className = 'sidebar-desktop';
  desktopEl.innerHTML = menuHTML;
  document.body.appendChild(desktopEl);

  var mobileBtn = document.createElement('button');
  mobileBtn.className = 'sidebar-mobile-btn';
  mobileBtn.innerHTML = hamburgerIcon;
  document.body.appendChild(mobileBtn);

  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'sidebar-mobile-menu';
  mobileMenu.innerHTML = menuHTML;
  document.body.appendChild(mobileMenu);

  var mobileOpen = false;
  function toggleMobile() {
    mobileOpen = !mobileOpen;
    overlay.classList.toggle('show', mobileOpen);
    mobileMenu.classList.toggle('show', mobileOpen);
    mobileBtn.innerHTML = mobileOpen ? closeIcon : hamburgerIcon;
  }
  mobileBtn.addEventListener('click', toggleMobile);
  overlay.addEventListener('click', toggleMobile);

  mobileMenu.querySelectorAll('.sidebar-children a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mobileOpen) toggleMobile();
    });
  });

  [desktopEl, mobileMenu].forEach(function (container) {
    container.querySelectorAll('.sidebar-group-btn[data-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-toggle');
        var children = container.querySelector('#sidebar-children-' + key);
        var arrow = btn.querySelector('.sidebar-arrow');
        if (children) {
          var isOpen = children.style.display !== 'none';
          children.style.display = isOpen ? 'none' : '';
          if (arrow) arrow.classList.toggle('open', !isOpen);
        }
      });
    });
  });

  // Scroll spy across all groups
  var allSectionIds = [];
  groups.forEach(function (g) {
    g.sections.forEach(function (s) {
      allSectionIds.push(s.href.replace('#', ''));
    });
  });

  if (allSectionIds.length > 0) {
    function updateActive() {
      var current = allSectionIds[0];
      allSectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop - 140 <= window.scrollY) current = id;
      });

      [desktopEl, mobileMenu].forEach(function (container) {
        container.querySelectorAll('.sidebar-children a').forEach(function (a) {
          var href = a.getAttribute('href');
          a.classList.toggle('active', href === '#' + current);
        });
      });
    }

    window.addEventListener('scroll', updateActive);
    updateActive();
  }
})();
