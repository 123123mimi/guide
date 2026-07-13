/**
 * Sidebar Widget for internal guide page.
 * Groups auto-expand/collapse based on scroll position.
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

    groups.forEach(function (g, i) {
      var isFirst = (i === 0);
      html += '<button class="sidebar-group-btn' + (isFirst ? ' active' : '') + '" data-toggle="' + g.key + '">';
      html += arrowSvg(isFirst);
      html += g.label + '</button>';
      html += '<div class="sidebar-children" id="sidebar-children-' + g.key + '"' + (isFirst ? '' : ' style="display:none"') + '>';
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

  // Manual toggle still works
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

  // Build section-to-group map
  var sectionToGroup = {};
  var allSectionIds = [];
  groups.forEach(function (g) {
    g.sections.forEach(function (s) {
      var id = s.href.replace('#', '');
      sectionToGroup[id] = g.key;
      allSectionIds.push(id);
    });
  });

  var lastActiveGroup = groups.length > 0 ? groups[0].key : '';

  function updateActive() {
    // Find current section
    var current = allSectionIds[0];
    allSectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop - 140 <= window.scrollY) current = id;
    });

    var activeGroup = sectionToGroup[current] || lastActiveGroup;

    // Only update accordion if group changed
    if (activeGroup !== lastActiveGroup) {
      lastActiveGroup = activeGroup;

      [desktopEl, mobileMenu].forEach(function (container) {
        groups.forEach(function (g) {
          var children = container.querySelector('#sidebar-children-' + g.key);
          var btn = container.querySelector('[data-toggle="' + g.key + '"]');
          var arrow = btn ? btn.querySelector('.sidebar-arrow') : null;
          if (children) {
            var shouldOpen = (g.key === activeGroup);
            children.style.display = shouldOpen ? '' : 'none';
            if (arrow) arrow.classList.toggle('open', shouldOpen);
            if (btn) btn.classList.toggle('active', shouldOpen);
          }
        });
      });
    }

    // Update active link highlight
    [desktopEl, mobileMenu].forEach(function (container) {
      container.querySelectorAll('.sidebar-children a').forEach(function (a) {
        var href = a.getAttribute('href');
        a.classList.toggle('active', href === '#' + current);
      });
    });
  }

  if (allSectionIds.length > 0) {
    window.addEventListener('scroll', updateActive);
    updateActive();
  }
})();
