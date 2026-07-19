(() => {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');

  const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeNav = () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
    document.body.classList.toggle('nav-open', Boolean(open));
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeNav(); });

  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const proposalTemplate = `AsiaCryptoFin 2026 - Talk Proposal\n\nTalk title:\n\nSpeaker name:\n\nAffiliation and role:\n\nPerspective (academic / industry / government / practitioner):\n\nAbstract (200-300 words):\n\nKey takeaway for the audience:\n\nShort biography (approximately 100 words):\n\nRelevant links (optional):\n\nAccessibility or scheduling notes (optional):`;

  const mailto = document.querySelector('[data-mailto]');
  if (mailto) {
    const subject = encodeURIComponent('AsiaCryptoFin 2026 Talk Proposal');
    const body = encodeURIComponent(proposalTemplate);
    mailto.href = `mailto:joseph.liu@monash.edu?cc=john.yuen@monash.edu&subject=${subject}&body=${body}`;
  }

  const copyButton = document.querySelector('[data-copy-template]');
  const copyStatus = document.querySelector('[data-copy-status]');
  const fallbackCopy = text => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  };

  copyButton?.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(proposalTemplate);
        copied = true;
      }
    } catch (error) {
      copied = fallbackCopy(proposalTemplate);
    }
    if (!copied) copied = fallbackCopy(proposalTemplate);
    copyStatus.textContent = copied
      ? 'Proposal template copied to your clipboard.'
      : 'Copying was blocked by the browser. Please use the downloadable template.';
  });
})();
