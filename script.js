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
        items: [
          { id: 'cpu', title: 'Processeurs', icon: 'memory', src: 'processeurs.html' },
          { id: 'commands', title: 'Commandes pratiques', icon: 'terminal', src: 'commandes.html' },
          { id: 'windows', title: 'Menus Windows', icon: 'window', src: 'windows.html' },
          { id: 'bios', title: 'BIOS / Boot Menu', icon: 'developer_board', src: 'bios.html' },
        ],
      },
    ],
    tools: [
      {
        heading: 'Boîte à outils',
        items: [
          { id: 'tools', title: 'Tous les logiciels', icon: 'build', src: 'logiciels.html', hash: '' },
        ],
      },
      {
        heading: 'Par catégorie',
        items: [
          { id: 'tool-usb', title: 'Clés USB & secours', keywords: 'Ventoy MediCat Rescuezilla USB ISO clé bootable', icon: 'usb', src: 'logiciels.html', hash: 'environnements-bootables' },
          { id: 'tool-hardware', title: 'Diagnostic matériel', keywords: 'OCCT HWMonitor CPU-Z GPU-Z CrystalDiskInfo Keyboard Tester Dead Pixel Locator MemTest86 RAM CPU GPU disque', icon: 'memory', src: 'logiciels.html', hash: 'diagnostic-materiel' },
          { id: 'tool-clean', title: 'Nettoyage & sécurité', keywords: 'BleachBit Revo BCUninstaller AdwCleaner Malwarebytes ShutUp10 adware antivirus confidentialité', icon: 'cleaning_services', src: 'logiciels.html', hash: 'nettoyage-securite' },
          { id: 'tool-system', title: 'Système & recherche', keywords: 'Filelight Everything System Informer LockHunter TrID fichiers registre disque', icon: 'search', src: 'logiciels.html', hash: 'systeme-recherche' },
          { id: 'tool-network', title: 'Pilotes & réseau', keywords: 'DDU Snappy Driver Installer Advanced IP Scanner Nmap Zenmap NetSpot Wi-Fi drivers réseau', icon: 'lan', src: 'logiciels.html', hash: 'pilotes-reseau' },
          { id: 'tool-password', title: 'Accès & restauration', keywords: 'Reset Windows Password chntpw NTPWEdit compte mot de passe', icon: 'key', src: 'logiciels.html', hash: 'acces-restauration' },
          { id: 'tool-backup', title: 'Sauvegarde & récupération', keywords: 'Clonezilla TestDisk PhotoRec FastCopy Kopia Duplicati clonage fichiers disque', icon: 'backup', src: 'logiciels.html', hash: 'sauvegarde-recuperation' },
          { id: 'tool-remote', title: 'Téléassistance', keywords: 'RustDesk AnyDesk AnyViewer Firefox Portable distant accès', icon: 'support_agent', src: 'logiciels.html', hash: 'teleassistance' },
          { id: 'tool-office', title: 'Bureautique & utilitaires', keywords: '7-Zip Ninite WinGet Sumatra PDF LibreOffice Rufus archive install', icon: 'apps', src: 'logiciels.html', hash: 'bureautique-utilitaires' },
        ],
      },
    ],
  };

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
      heading.textContent = group.heading;
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
        title.textContent = item.title;
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
      empty.textContent = 'Aucun résultat.';
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
      close.setAttribute('aria-label', `Fermer ${tab.title}`);
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
      empty.textContent = index === 0
        ? 'Choisissez une fiche dans le menu pour l’ouvrir ici.'
        : 'Ouvrez une fiche ici pour la comparer.';
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
        title: item.title,
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
    document.querySelector('[data-current-label]').textContent = item.title.toLocaleUpperCase('fr');
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
    const activeTab = panes[activePane].tabs.find((tab) => tab.key === panes[activePane].active);
    document.querySelector('[data-current-label]').textContent = activeTab?.title.toLocaleUpperCase('fr') ?? 'ACCUEIL';
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
      search.placeholder = mode === 'tools' ? 'Rechercher un outil…' : 'Rechercher une fiche…';
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
        document.querySelector('[data-current-label]').textContent = activeTab?.title.toLocaleUpperCase('fr') ?? 'ACCUEIL';
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

  renderNavigation();
  renderPane(0);
  renderPane(1);
  setActivePane(0);

  const requested = params.get('open');
  if (requested && [...documentationItems, ...toolItems].some((item) => item.id === requested)) {
    openItem(requested, 0);
  }
})();

function initializeDocumentationPage() {
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
