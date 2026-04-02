/**
 * Sidebar Widget for static guide pages.
 *
 * Usage: add a <script> tag with data attributes:
 *   <script
 *     src="../sidebar-widget.js"
 *     data-active="admin"
 *     data-sections='[{"href":"#overview","label":"목차"},{"href":"#s1","label":"1. 회원관리"}]'>
 *   </script>
 */
(function () {
  var scriptTag = document.currentScript;
  var activePage = scriptTag.getAttribute('data-active');  // admin | manager | learner
  var sections = JSON.parse(scriptTag.getAttribute('data-sections') || '[]');
  var BASE = '/guide/';

  var guides = [
    { key: 'admin',   label: '총괄관리자 가이드',  href: BASE + 'admin/' },
    { key: 'manager', label: '교육담당자 가이드',  href: BASE + 'manager/' },
    { key: 'main',    label: '연동 가이드',       href: BASE },
    { key: 'faq',     label: 'FAQ',              href: BASE + 'faq/' },
  ];

  // --- Build sidebar HTML ---
  function arrowSvg(open) {
    return '<svg class="sidebar-arrow' + (open ? ' open' : '') + '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>';
  }

  function buildMenu() {
    var html = '<div class="sidebar-widget">';
    html += '<div class="sidebar-widget-title">가이드 목록</div>';
    html += '<nav>';

    guides.forEach(function (g) {
      var isCurrent = (g.key === activePage);

      if (isCurrent && sections.length > 0) {
        // Expandable current page
        html += '<button class="sidebar-group-btn active" data-toggle="' + g.key + '">';
        html += arrowSvg(true);
        html += g.label + '</button>';
        html += '<div class="sidebar-children" id="sidebar-children-' + g.key + '">';
        sections.forEach(function (s) {
          html += '<a href="' + s.href + '">' + s.label + '</a>';
        });
        html += '</div>';
      } else {
        // Link to other page
        html += '<a href="' + g.href + '" class="sidebar-group-link">';
        html += arrowSvg(false);
        html += g.label + '</a>';
      }
    });

    html += '</nav></div>';
    return html;
  }

  var menuHTML = buildMenu();

  // --- Hamburger icons ---
  var hamburgerIcon = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var closeIcon = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';

  // --- Inject DOM ---
  // Desktop
  var desktopEl = document.createElement('div');
  desktopEl.className = 'sidebar-desktop';
  desktopEl.innerHTML = menuHTML;
  document.body.appendChild(desktopEl);

  // Mobile button
  var mobileBtn = document.createElement('button');
  mobileBtn.className = 'sidebar-mobile-btn';
  mobileBtn.innerHTML = hamburgerIcon;
  document.body.appendChild(mobileBtn);

  // Mobile overlay
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Mobile menu
  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'sidebar-mobile-menu';
  mobileMenu.innerHTML = menuHTML;
  document.body.appendChild(mobileMenu);

  // --- Toggle mobile menu ---
  var mobileOpen = false;
  function toggleMobile() {
    mobileOpen = !mobileOpen;
    overlay.classList.toggle('show', mobileOpen);
    mobileMenu.classList.toggle('show', mobileOpen);
    mobileBtn.innerHTML = mobileOpen ? closeIcon : hamburgerIcon;
  }
  mobileBtn.addEventListener('click', toggleMobile);
  overlay.addEventListener('click', toggleMobile);

  // Close on section click (mobile)
  mobileMenu.querySelectorAll('.sidebar-children a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mobileOpen) toggleMobile();
    });
  });

  // --- Toggle expand/collapse for current page sections ---
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

  // --- Scroll spy ---
  if (sections.length > 0) {
    var sectionIds = sections.map(function (s) { return s.href.replace('#', ''); });

    function updateActive() {
      var current = sectionIds[0];
      sectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop - 140 <= window.scrollY) current = id;
      });

      // Update links in both desktop and mobile
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
