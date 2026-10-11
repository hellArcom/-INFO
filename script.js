const INFO_LANG_KEY = 'info-lang';
const I18N = {
  fr: {
    'empty.main': 'Choisissez une fiche dans le menu pour l’ouvrir ici.',
    'empty.side': 'Ouvrez une fiche ici pour la comparer à l’autre panneau.',
    'noresult': 'Aucun résultat.',
    'search.fiche': 'Rechercher une fiche…',
    'search.outil': 'Rechercher un outil…',
    'crumb.home': 'ACCUEIL',
    'close.tab': 'Fermer',
  },
  en: {
    'empty.main': 'Choose a document in the menu to open it here.',
    'empty.side': 'Open a document here to compare it with the other panel.',
    'noresult': 'No result.',
    'search.fiche': 'Search a document…',
    'search.outil': 'Search a tool…',
    'crumb.home': 'HOME',
    'close.tab': 'Close',
  },
};

function infoLang() {
  try {
    const saved = localStorage.getItem(INFO_LANG_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
  } catch { /* stockage indisponible */ }
  return (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
}

function infoT(key) {
  const dict = I18N[infoLang()] || I18N.fr;
  return dict[key] || I18N.fr[key] || key;
}

function applyStaticLang() {
  const lang = infoLang();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach((el) => {
    if (el.dataset.frText === undefined) el.dataset.frText = el.textContent;
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.frText;
  });
  document.querySelectorAll('[data-en-html]').forEach((el) => {
    if (el.dataset.frHtml === undefined) el.dataset.frHtml = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.frHtml;
  });
  document.querySelectorAll('[data-en-ph]').forEach((el) => {
    if (el.dataset.frPh === undefined) el.dataset.frPh = el.placeholder || '';
    el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.frPh;
  });
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.textContent = lang === 'en' ? '🇫🇷 Français' : '🇬🇧 English';
  });
}

function setInfoLang(lang) {
  try { localStorage.setItem(INFO_LANG_KEY, lang); } catch { /* stockage indisponible */ }
  applyStaticLang();
  document.dispatchEvent(new CustomEvent('info:lang'));
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-lang-toggle]')) {
    setInfoLang(infoLang() === 'en' ? 'fr' : 'en');
  }
});

(() => {
  const params = new URLSearchParams(window.location.search);
  const embedded = params.has('embed');

  if (embedded) {
    document.body.classList.add('embedded-page');
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.footer');
    header?.remove();
    footer?.remove();
    const page = document.querySelector('.page');
    if (page) {
      const hashTarget = window.location.hash
        ? document.getElementById(window.location.hash.slice(1))
        : null;
      window.requestAnimationFrame(() => {
        if (hashTarget) {
          hashTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          page.scrollIntoView({ behavior: 'auto', block: 'start' });
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    }
  }

  const workspace = document.querySelector('[data-workspace]');
  if (!workspace) {
    initializeDocumentationPage();
    return;
  }

  const catalog = {
    docs: [
      {
        heading: 'Documentations',
        headingEn: 'Documentation',
        items: [
          { id: 'cpu', title: 'Processeurs', titleEn: 'Processors', icon: 'memory', src: 'processeurs.html' },
          { id: 'commands', title: 'Commandes pratiques', titleEn: 'Practical commands', icon: 'terminal', src: 'commandes.html' },
          { id: 'windows', title: 'Menus Windows', titleEn: 'Windows menus', icon: 'window', src: 'windows.html' },
          { id: 'bios', title: 'BIOS / Boot Menu', titleEn: 'BIOS / Boot Menu', icon: 'developer_board', src: 'bios.html' },
        ],
      },
    ],
    tools: [
      {
        heading: 'Boîte à outils',
        headingEn: 'Toolbox',
        items: [
          { id: 'tools', title: 'Tous les logiciels', titleEn: 'All software', icon: 'build', src: 'logiciels.html', hash: '' },
        ],
      },
      {
        heading: 'Par catégorie',
        headingEn: 'By category',
        items: [
          { id: 'tool-usb', title: 'Clés USB & secours', titleEn: 'USB sticks & rescue', keywords: 'Ventoy MediCat Rescuezilla USB ISO clé bootable', icon: 'usb', src: 'logiciels.html', hash: 'environnements-bootables' },
          { id: 'tool-hardware', title: 'Diagnostic matériel', titleEn: 'Hardware diagnostics', keywords: 'OCCT HWMonitor CPU-Z GPU-Z CrystalDiskInfo Keyboard Tester Dead Pixel Locator MemTest86 RAM CPU GPU disque', icon: 'memory', src: 'logiciels.html', hash: 'diagnostic-materiel' },
          { id: 'tool-clean', title: 'Nettoyage & sécurité', titleEn: 'Cleaning & security', keywords: 'BleachBit Revo BCUninstaller AdwCleaner Malwarebytes ShutUp10 adware antivirus confidentialité', icon: 'cleaning_services', src: 'logiciels.html', hash: 'nettoyage-securite' },
          { id: 'tool-system', title: 'Système & recherche', titleEn: 'System & search', keywords: 'Filelight Everything System Informer LockHunter TrID fichiers registre disque', icon: 'search', src: 'logiciels.html', hash: 'systeme-recherche' },
          { id: 'tool-network', title: 'Pilotes & réseau', titleEn: 'Drivers & network', keywords: 'DDU Snappy Driver Installer Advanced IP Scanner Nmap Zenmap NetSpot Wi-Fi drivers réseau', icon: 'lan', src: 'logiciels.html', hash: 'pilotes-reseau' },
          { id: 'tool-password', title: 'Accès & restauration', titleEn: 'Access & recovery', keywords: 'Reset Windows Password chntpw NTPWEdit compte mot de passe', icon: 'key', src: 'logiciels.html', hash: 'acces-restauration' },
          { id: 'tool-backup', title: 'Sauvegarde & récupération', titleEn: 'Backup & recovery', keywords: 'Clonezilla TestDisk PhotoRec FastCopy Kopia Duplicati clonage fichiers disque', icon: 'backup', src: 'logiciels.html', hash: 'sauvegarde-recuperation' },
          { id: 'tool-remote', title: 'Téléassistance', titleEn: 'Remote support', keywords: 'RustDesk AnyDesk AnyViewer Firefox Portable distant accès', icon: 'support_agent', src: 'logiciels.html', hash: 'teleassistance' },
          { id: 'tool-office', title: 'Bureautique & utilitaires', titleEn: 'Office & utilities', keywords: '7-Zip Ninite WinGet Sumatra PDF LibreOffice Rufus archive install', icon: 'apps', src: 'logiciels.html', hash: 'bureautique-utilitaires' },
        ],
      },
    ],
  };

  const localizedTitle = (item) => (infoLang() === 'en' ? (item.titleEn || item.title) : item.title);

  const nav = document.querySelector('[data-workspace-nav]');
  const search = document.querySelector('[data-sidebar-search]');
  const welcomeMarkup = '';
  const modeButtons = [...document.querySelectorAll('[data-mode]')];
  const panes = [0, 1].map((index) => ({
    element: document.querySelector(`[data-pane="${index}"]`),
    strip: document.querySelector(`[data-tabs="${index}"]`),
    body: document.querySelector(`[data-pane-body="${index}"]`),
    tabs: [],
    active: null,
  }));
  panes.forEach((pane) => {
    pane.element._workspacePane = pane;
  });

  let currentMode = 'docs';
  let activePane = 0;
  let isSplit = false;
  let serial = 0;
  let dragState = null;

  const HIST_KEY = 'info-history';
  const SESSION_KEY = 'info-session';
  const allItems = () => [...documentationItems, ...toolItems];
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HIST_KEY)) || []; } catch { return []; }
  }
  function pushHistory(id) {
    let h = loadHistory().filter((x) => x !== id);
    h.unshift(id);
    h = h.slice(0, 12);
    try { localStorage.setItem(HIST_KEY, JSON.stringify(h)); } catch {}
  }
  function saveSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        split: isSplit,
        panes: panes.map((p) => ({
          ids: p.tabs.map((t) => t.id),
          active: (p.tabs.find((t) => t.key === p.active) || {}).id || null,
        })),
      }));
    } catch {}
  }

  function getSource(item) {
    return `${item.src}?embed=1${item.hash ? `#${item.hash}` : ''}`;
  }

  const documentationItems = catalog.docs[0].items;
  const toolItems = catalog.tools.flatMap((group) => group.items);

  function renderNavigation() {
    const query = (search?.value ?? '').trim().toLocaleLowerCase('fr');
    nav.replaceChildren();
    const groups = currentMode === 'docs'
      ? [{ heading: 'Documentations', items: documentationItems }]
      : catalog.tools;

    for (const group of groups) {
      const matches = group.items.filter((item) => {
        const text = `${item.title} ${item.keywords ?? ''} ${group.heading}`.toLocaleLowerCase('fr');
        return text.includes(query);
      });
      if (!matches.length) continue;
      const heading = document.createElement('div');
      heading.className = 'nav-category';
      heading.textContent = infoLang() === 'en' ? (group.headingEn || group.heading) : group.heading;
      nav.append(heading);
      for (const item of matches) {
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'workspace-nav-link';
        link.dataset.open = item.id;
        const icon = document.createElement('span');
        icon.className = 'nav-icon material-symbols-outlined';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = item.icon;
        const title = document.createElement('span');
        title.textContent = localizedTitle(item);
        link.append(icon, title);
        if (panes.some((pane) => pane.tabs.some((tab) => tab.id === item.id))) {
          link.classList.add('has-tab');
        }
        nav.append(link);
      }
    }
    if (!nav.children.length) {
      const empty = document.createElement('p');
      empty.className = 'nav-empty';
      empty.textContent = infoT('noresult');
      nav.append(empty);
    }
  }

  function setActivePane(index) {
    activePane = index;
    panes.forEach((pane, paneIndex) => {
      pane.element.classList.toggle('active-pane', paneIndex === index);
    });
  }

  function renderPane(index) {
    const pane = panes[index];
    pane.element.setAttribute('aria-label', index === 0 ? 'Panneau principal' : 'Panneau secondaire');
    pane.strip.replaceChildren();
    for (const tab of pane.tabs) {
      const tabGroup = document.createElement('div');
      tabGroup.className = 'workspace-tab-group';
      tabGroup.draggable = true;
      tabGroup.dataset.tabKey = tab.key;
      tabGroup.dataset.paneIndex = String(index);
      const tabButton = document.createElement('button');
      tabButton.type = 'button';
      tabButton.className = `workspace-tab${pane.active === tab.key ? ' active' : ''}`;
      tabButton.setAttribute('role', 'tab');
      tabButton.setAttribute('aria-selected', String(pane.active === tab.key));
      tabButton.draggable = true;
      tabButton.dataset.tabKey = tab.key;
      tabButton.dataset.paneIndex = String(index);
      const title = document.createElement('span');
      title.className = 'tab-title';
      title.textContent = tab.title;
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'tab-close material-symbols-outlined';
      close.setAttribute('aria-label', `${infoT('close.tab')} ${tab.title}`);
      close.dataset.closeTab = tab.key;
      close.textContent = 'close';
      tabButton.append(title);
      tabButton.addEventListener('click', () => {
        setActivePane(index);
        pane.active = tab.key;
        renderPane(index);
      });
      tabButton.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const buttons = [...pane.strip.querySelectorAll('[role="tab"]')];
          const current = buttons.indexOf(tabButton);
          const direction = event.key === 'ArrowRight' ? 1 : buttons.length - 1;
          buttons[(current + direction) % buttons.length]?.focus();
        }
      });
      close.addEventListener('click', (event) => {
        event.stopPropagation();
        closeTab(index, tab.key);
      });
      const onDragStart = (event) => {
        dragState = { key: tab.key, fromPane: index };
        event.dataTransfer.effectAllowed = 'move';
        try { event.dataTransfer.setData('text/plain', tab.key); } catch {}
      };
      const onDragEnd = () => {
        dragState = null;
        panes.forEach(p => p.strip.classList.remove('drag-over'));
      };
      tabButton.addEventListener('dragstart', onDragStart);
      tabGroup.addEventListener('dragstart', onDragStart);
      tabButton.addEventListener('dragend', onDragEnd);
      tabGroup.addEventListener('dragend', onDragEnd);
      tabGroup.append(tabButton, close);
      pane.strip.append(tabGroup);
    }
    const tab = pane.tabs.find((item) => item.key === pane.active);
    // drag handlers for strip
    pane.strip.addEventListener('dragover', (event) => {
      if (dragState) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        pane.strip.classList.add('drag-over');
      }
    }, { passive: false });
    pane.strip.addEventListener('dragleave', (event) => {
      if (event.currentTarget === pane.strip && !pane.strip.contains(event.relatedTarget)) {
        pane.strip.classList.remove('drag-over');
      }
    });
    pane.strip.addEventListener('drop', (event) => {
      event.preventDefault();
      pane.strip.classList.remove('drag-over');
      if (!dragState) return;
      const { key, fromPane } = dragState;
      if (fromPane === index) return;
      const fromP = panes[fromPane];
      const tabToMove = fromP.tabs.find(t => t.key === key);
      if (!tabToMove) return;
      fromP.tabs = fromP.tabs.filter(t => t.key !== key);
      pane.tabs.push(tabToMove);
      pane.active = tabToMove.key;
      if (fromP.active === key) {
        fromP.active = fromP.tabs.at(-1)?.key ?? null;
      }
      renderPane(fromPane);
      renderPane(index);
      setActivePane(index);
      renderNavigation();
      saveSession();
    });
    pane.body.id = `pane-content-${index}`;
    pane.body.querySelectorAll('.doc-frame').forEach((frame) => frame.classList.remove('is-active'));
    const emptyEl = pane.body.querySelector('.pane-empty');
    if (emptyEl) emptyEl.remove();
    if (tab) {
      if (tab.frame.parentElement !== pane.body) pane.body.append(tab.frame);
      tab.frame.classList.add('doc-frame', 'is-active');
      tab.frame.title = tab.title;
      tab.frame.setAttribute('loading', 'lazy');
    } else {
      pane.body.querySelectorAll('.doc-frame').forEach((frame) => frame.remove());
      const empty = document.createElement('div');
      empty.className = 'pane-empty';
      empty.textContent = index === 0 ? infoT('empty.main') : infoT('empty.side');
      pane.body.replaceChildren(empty);
    }
  }

  function openItem(id, paneIndex = activePane) {
    const item = [...documentationItems, ...toolItems].find((entry) => entry.id === id);
    if (!item) return;
    if (!isSplit) paneIndex = 0;
    const pane = panes[paneIndex];
    let tab = pane.tabs.find((entry) => entry.id === item.id);
    if (!tab) {
      tab = {
        id: item.id,
        key: `tab-${++serial}`,
        title: localizedTitle(item),
        frame: document.createElement('iframe'),
      };
      tab.frame.addEventListener('focus', () => setActivePane(paneIndex));
      tab.frame.addEventListener('load', () => {
        try {
          const frameDocument = tab.frame.contentDocument;
          if (!frameDocument) return;
          frameDocument.body.classList.add('embedded-page');
          frameDocument.querySelector('.site-header')?.remove();
          frameDocument.querySelector('.footer')?.remove();
          const page = frameDocument.querySelector('.page');
          if (page) {
            page.classList.add('embedded-page-content');
          }
          const docInner = frameDocument.querySelector('.doc-inner');
          if (docInner) {
            docInner.classList.add('embedded-page-content');
          }
          frameDocument.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.setAttribute('rel', 'noopener noreferrer');
          });
          frameDocument.addEventListener('pointerdown', () => setActivePane(paneIndex), true);
          frameDocument.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (a && a.href && !a.href.startsWith('javascript:')) {
              const url = new URL(a.href, frameDocument.baseURI);
              if (url.origin !== window.location.origin) {
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'noopener noreferrer');
              }
            }
          }, true);
          let scrollTarget = null;
          try {
            const hash = frameDocument.location.hash || tab.frame.contentWindow?.location.hash;
            if (hash) {
              scrollTarget = frameDocument.getElementById(hash.slice(1)) || frameDocument.querySelector(hash);
            }
          } catch {}
          if (scrollTarget) {
            requestAnimationFrame(() => {
              scrollTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
            });
          } else {
            try {
              frameDocument.documentElement.scrollTop = 0;
              frameDocument.body.scrollTop = 0;
            } catch {}
          }
        } catch {
          // ignore
        }
        // Respect hash if present; avoid forcing top
        try {
          const w = tab.frame.contentWindow;
          if (w && !w.location.hash) {
            w.scrollTo({ top: 0, behavior: 'auto' });
          }
        } catch {}
      });
      tab.frame.src = getSource(item);
      tab.frame.setAttribute('loading', 'lazy');
      tab.frame.setAttribute('title', item.title);
      tab.frame.setAttribute('allow', 'clipboard-read; clipboard-write');
      pane.tabs.push(tab);
    }
    pane.active = tab.key;
    setActivePane(paneIndex);
    renderPane(paneIndex);
    renderNavigation();
    closeSidebar();
    pushHistory(item.id);
    saveSession();
    document.querySelector('[data-current-label]').textContent = localizedTitle(item).toLocaleUpperCase(infoLang());
  }

  function closeTab(index, key) {
    const pane = panes[index];
    const tabIndex = pane.tabs.findIndex((tab) => tab.key === key);
    if (tabIndex < 0) return;
    const wasActive = pane.active === key;
    pane.tabs[tabIndex].frame.remove();
    pane.tabs.splice(tabIndex, 1);
    if (wasActive) {
      pane.active = pane.tabs[Math.max(0, tabIndex - 1)]?.key ?? null;
    }
    renderPane(index);
    renderNavigation();
    saveSession();
    const activeTab = panes[activePane].tabs.find((tab) => tab.key === panes[activePane].active);
    document.querySelector('[data-current-label]').textContent = activeTab?.title.toLocaleUpperCase(infoLang()) ?? infoT('crumb.home');
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
  }

  function setMode(mode) {
    currentMode = mode;
    modeButtons.forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    if (search) {
      search.value = '';
      search.placeholder = infoT(mode === 'tools' ? 'search.outil' : 'search.fiche');
    }
    renderNavigation();
  }

  const splitToggle = document.querySelector('[data-split-toggle]');
  if (splitToggle) {
    splitToggle.addEventListener('click', (event) => {
      isSplit = !isSplit;
      workspace.classList.toggle('split-view', isSplit);
      event.currentTarget.setAttribute('aria-pressed', String(isSplit));
      event.currentTarget.classList.toggle('active', isSplit);
      panes[1].element.hidden = !isSplit;
      if (isSplit && panes[1].tabs.length === 0 && panes[0].tabs.length > 1) {
        const last = panes[0].tabs.pop();
        panes[1].tabs.push(last);
        panes[0].active = panes[0].tabs.at(-1)?.key ?? null;
        panes[1].active = last.key;
      renderPane(0);
      renderPane(1);
    }
    setActivePane(isSplit ? 1 : 0);
    saveSession();
      if (!isSplit) {
        if (panes[1].tabs.length) {
          panes[0].tabs.push(...panes[1].tabs);
          if (panes[1].active) panes[0].active = panes[1].active;
          panes[1].tabs = [];
          panes[1].active = null;
          renderPane(0);
          renderPane(1);
        }
        const activeTab = panes[0].tabs.find((tab) => tab.key === panes[0].active);
        document.querySelector('[data-current-label]').textContent = activeTab?.title.toLocaleUpperCase(infoLang()) ?? infoT('crumb.home');
      }
    });
  }

  modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
  search?.addEventListener('input', renderNavigation);
  document.addEventListener('click', (event) => {
    const open = event.target.closest('[data-open]');
    if (open) {
      let paneElement = open.parentElement;
      while (paneElement && !paneElement._workspacePane) paneElement = paneElement.parentElement;
      openItem(open.dataset.open, paneElement?._workspacePane === panes[1] ? 1 : activePane);
    }
    if (event.target.closest('[data-sidebar-open]')) {
      document.body.classList.add('sidebar-open');
    }
    if (event.target.closest('[data-sidebar-close]')) {
      closeSidebar();
    }
    const pane = event.target.closest('[data-pane]');
    if (pane) {
      setActivePane(Number(pane.dataset.pane));
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar();
    if ((event.ctrlKey || event.metaKey) && /^[1-9]$/.test(event.key)) {
      const pane = panes[activePane];
      const tab = pane.tabs[Number(event.key) - 1];
      if (tab) {
        event.preventDefault();
        pane.active = tab.key;
        renderPane(activePane);
      }
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
      const pane = panes[activePane];
      if (pane.active) {
        event.preventDefault();
        closeTab(activePane, pane.active);
      }
    }
  });

  function restoreSession() {
    let s;
    try { s = JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return false; }
    if (!s || !Array.isArray(s.panes) || !s.panes.some((p) => p.ids && p.ids.length)) return false;
    if (s.split && !isSplit && splitToggle) splitToggle.click();
    s.panes.forEach((ps, idx) => {
      (ps.ids || []).forEach((id) => {
        if (allItems().some((it) => it.id === id)) openItem(id, isSplit ? idx : 0);
      });
    });
    const first = s.panes[0];
    if (first && first.active) {
      const t = panes[0].tabs.find((tab) => tab.id === first.active);
      if (t) { panes[0].active = t.key; renderPane(0); }
    }
    setActivePane(0);
    return true;
  }

  // Expose pour la recherche globale
  window.__infoWorkspace = {
    items: allItems,
    open: (id) => openItem(id, activePane),
    history: loadHistory,
    localizedTitle,
  };

  renderNavigation();
  renderPane(0);
  renderPane(1);
  setActivePane(0);
  applyStaticLang();
  if (!params.get('open')) restoreSession();

  document.addEventListener('info:lang', () => {
    setMode(currentMode);
    panes.forEach((pane, index) => {
      pane.tabs.forEach((tab) => {
        const item = [...documentationItems, ...toolItems].find((entry) => entry.id === tab.id);
        if (item) {
          tab.title = localizedTitle(item);
          tab.frame.src = getSource(item);
        }
      });
      renderPane(index);
    });
    const activeTab = panes[activePane].tabs.find((tab) => tab.key === panes[activePane].active);
    document.querySelector('[data-current-label]').textContent = activeTab?.title.toLocaleUpperCase(infoLang()) ?? infoT('crumb.home');
  });

  const requested = params.get('open');
  if (requested && [...documentationItems, ...toolItems].some((item) => item.id === requested)) {
    openItem(requested, 0);
  }
})();

function initializeDocumentationPage() {
  applyStaticLang();
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  const search = document.querySelector('[data-search]');
  const searchToggle = document.querySelector('[data-search-toggle]');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open', !expanded);
  });
  searchToggle?.addEventListener('click', () => {
    const expanded = searchToggle.getAttribute('aria-expanded') === 'true';
    searchToggle.setAttribute('aria-expanded', String(!expanded));
    search?.classList.toggle('open', !expanded);
    if (!expanded) search?.querySelector('input')?.focus();
  });
  search?.querySelector('input')?.addEventListener('input', (event) => {
    const query = event.currentTarget.value.trim().toLocaleLowerCase('fr');
    document.querySelectorAll('[data-search-item]').forEach((item) => {
      item.classList.toggle('hidden-by-search', !item.textContent.toLocaleLowerCase('fr').includes(query));
    });
    const groups = [...document.querySelectorAll('[data-search-group]')];
    groups.forEach((group) => {
      const items = [...group.querySelectorAll('[data-search-item]')];
      if (items.length) {
        group.classList.toggle('hidden-by-search', !items.some((item) => !item.classList.contains('hidden-by-search')));
        return;
      }
      let sibling = group.nextElementSibling;
      let visible = false;
      while (sibling && sibling.tagName !== 'H2') {
        const sectionItems = sibling.matches('[data-search-item]')
          ? [sibling]
          : [...sibling.querySelectorAll('[data-search-item]')];
        if (sectionItems.some((item) => !item.classList.contains('hidden-by-search'))) {
          visible = true;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      group.classList.toggle('hidden-by-search', !visible);
    });
    document.querySelectorAll('[data-empty-search]').forEach((message) => {
      const hasVisible = [...document.querySelectorAll('[data-search-item]')].some((item) => !item.classList.contains('hidden-by-search'));
      message.hidden = query.length === 0 || hasVisible;
    });
  });
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const command = button.closest('.terminal')?.querySelector('code')?.innerText;
    if (!command) return;
    const original = button.textContent;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(command);
      } else {
        const field = document.createElement('textarea');
        field.value = command;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copie indisponible');
      }
      button.textContent = 'Copié !';
    } catch {
      button.textContent = 'Copie impossible';
    }
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });
}

// ===== Recherche globale (Ctrl+K) — commun à toutes les pages =====
(function globalSearch() {
  const overlay = document.createElement('div');
  overlay.className = 'gsearch';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="gsearch-backdrop" data-gs-close></div>
    <div class="gsearch-panel" role="dialog" aria-modal="true" aria-label="Recherche globale">
      <label class="gsearch-field">
        <span class="material-symbols-outlined" aria-hidden="true">search</span>
        <input type="search" data-gs-input autocomplete="off" spellcheck="false"
               placeholder="Rechercher partout… (Ctrl+K)" data-en-ph="Search everywhere… (Ctrl+K)">
        <kbd>Esc</kbd>
      </label>
      <div class="gsearch-results" data-gs-results role="listbox"></div>
      <div class="gsearch-hint" data-gs-hint></div>
    </div>`;
  document.body.append(overlay);
  const input = overlay.querySelector('[data-gs-input]');
  const results = overlay.querySelector('[data-gs-results]');
  const hint = overlay.querySelector('[data-gs-hint]');
  let active = 0;
  let current = [];

  const STR = {
    fr: { recent: 'Récents', hint: '↑↓ pour naviguer · Entrée pour ouvrir · Échap pour fermer', none: 'Aucun résultat.', open: 'Ouvrir' },
    en: { recent: 'Recent', hint: '↑↓ to navigate · Enter to open · Esc to close', none: 'No result.', open: 'Open' },
  };
  const t = (k) => (STR[infoLang()] || STR.fr)[k];

  function index() {
    const idx = window.INFO_SEARCH_INDEX || [];
    const items = window.__infoWorkspace ? window.__infoWorkspace.items() : [];
    // fusionner index texte + catalogue (titres)
    const byId = new Map();
    idx.forEach((e) => byId.set(e.id, { ...e }));
    items.forEach((it) => {
      const e = byId.get(it.id) || {};
      byId.set(it.id, { id: it.id, page: it.src, hash: it.hash || '', title: it.title, titleEn: it.titleEn || it.title, text: e.text || '', kw: it.keywords || '' });
    });
    return [...byId.values()];
  }

  function score(entry, q) {
    const title = (infoLang() === 'en' ? entry.titleEn : entry.title).toLocaleLowerCase('fr');
    const body = `${entry.text || ''} ${entry.kw || ''}`.toLocaleLowerCase('fr');
    let s = 0;
    if (title.includes(q)) s += 10;
    if (body.includes(q)) s += 3;
    // bonus si le titre commence par la requête
    if (title.startsWith(q)) s += 5;
    return s;
  }

  function snippet(entry, q) {
    const body = entry.text || '';
    const i = body.toLocaleLowerCase('fr').indexOf(q);
    if (i < 0) return '';
    const start = Math.max(0, i - 30);
    return (start > 0 ? '…' : '') + body.slice(start, i + 60).trim() + '…';
  }

  function resolveTarget(entry) {
    // Dans l'espace de travail -> ouvrir l'onglet ; sinon -> page + ancre
    if (window.__infoWorkspace) return { ws: true, id: entry.id };
    const hash = entry.hash ? `#${entry.hash}` : '';
    return { ws: false, url: `${entry.page}${hash}` };
  }

  function openEntry(entry) {
    const target = resolveTarget(entry);
    close();
    if (target.ws) {
      window.__infoWorkspace.open(target.id);
    } else {
      window.location.href = target.url;
    }
  }

  function render(list, isRecent) {
    current = list;
    active = 0;
    results.replaceChildren();
    if (!list.length) {
      const p = document.createElement('div');
      p.className = 'gsearch-none';
      p.textContent = t('none');
      results.append(p);
      hint.textContent = '';
      return;
    }
    list.forEach((entry, i) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'gsearch-item';
      row.setAttribute('role', 'option');
      const title = infoLang() === 'en' ? entry.titleEn : entry.title;
      row.innerHTML = `<span class="gs-title"></span><span class="gs-page"></span>`;
      row.querySelector('.gs-title').textContent = title;
      row.querySelector('.gs-page').textContent = entry.page.replace('.html', '');
      const sn = entry._snippet;
      if (sn) {
        const s = document.createElement('span');
        s.className = 'gs-snippet';
        s.textContent = sn;
        row.append(s);
      }
      row.addEventListener('click', () => openEntry(entry));
      row.addEventListener('mousemove', () => setActive(i));
      results.append(row);
    });
    hint.textContent = isRecent ? t('recent') + ' · ' + t('hint') : t('hint');
    setActive(0);
  }

  function setActive(i) {
    active = i;
    [...results.children].forEach((el, idx) => el.classList.toggle('active', idx === i));
  }

  function run() {
    const q = input.value.trim().toLocaleLowerCase('fr');
    if (!q) {
      // Historique récent
      const ids = window.__infoWorkspace ? window.__infoWorkspace.history() : (JSON.parse(localStorage.getItem('info-history') || '[]'));
      const all = index();
      const list = ids.map((id) => all.find((e) => e.id === id)).filter(Boolean).map((e) => ({ ...e, _snippet: '' }));
      render(list.slice(0, 8), true);
      return;
    }
    const scored = index()
      .map((e) => ({ ...e, _s: score(e, q), _snippet: snippet(e, q) }))
      .filter((e) => e._s > 0)
      .sort((a, b) => b._s - a._s)
      .slice(0, 10);
    render(scored, false);
  }

  function open() {
    overlay.hidden = false;
    input.value = '';
    run();
    input.focus();
  }
  function close() {
    overlay.hidden = true;
  }

  input.addEventListener('input', run);
  overlay.addEventListener('click', (e) => { if (e.target.closest('[data-gs-close]')) close(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, current.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (current[active]) openEntry(current[active]); }
    else if (e.key === 'Escape') { close(); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'k'.toLocaleLowerCase('fr'))) { e.preventDefault(); overlay.hidden ? open() : close(); }
  });

  // Bouton de déclenchement injecté dans l'interface
  function addTrigger() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gsearch-trigger';
    btn.setAttribute('aria-label', 'Recherche globale / Global search');
    btn.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">search</span>';
    btn.addEventListener('click', open);
    const wsActions = document.querySelector('.workspace-actions');
    if (wsActions) { wsActions.prepend(btn); return; }
    const headerInner = document.querySelector('.header-inner');
    if (headerInner) headerInner.append(btn);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addTrigger);
  else addTrigger();
})();
