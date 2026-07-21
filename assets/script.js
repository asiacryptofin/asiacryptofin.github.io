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

  const proposalTemplate = `=====================================================
AsiaCryptoFin 2026 - Talk Proposal
ASIACRYPT Industry Forum on Cryptography and Finance
=====================================================

1) Talk title:


2) Speaker name:


3) Affiliation and role:


4) Perspective (academic / industry / government / practitioner):


5) Abstract (200-300 words):


6) Key takeaway for the audience:


7) Short biography (approx. 100 words):


8) Relevant links (optional):


9) Accessibility or scheduling notes (optional):


-----------------------------------------------------
Send to:  joseph.liu@monash.edu
Cc:       John.TszHonYuen@monash.edu
Deadline: 01 October 2026
=====================================================`;

  const submitTo = 'joseph.liu@monash.edu';
  const submitCc = 'John.TszHonYuen@monash.edu';
  const subject = encodeURIComponent('AsiaCryptoFin 2026 Talk Proposal');
  const body = encodeURIComponent(proposalTemplate.replace(/\n/g, '\r\n'));

  const mailto = document.querySelector('[data-mailto]');
  if (mailto) {
    mailto.href = `mailto:${submitTo}?cc=${submitCc}&subject=${subject}&body=${body}`;
  }

  const gmailCompose = document.querySelector('[data-gmail-compose]');
  if (gmailCompose) {
    gmailCompose.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${submitTo}&cc=${submitCc}&su=${subject}&body=${body}`;
  }

  const mailtoFallback = document.querySelector('[data-mailto-fallback]');
  if (mailto && mailtoFallback) {
    mailto.addEventListener('click', () => {
      let clientOpened = false;
      const markOpened = () => { clientOpened = true; };
      window.addEventListener('blur', markOpened, { once: true });
      document.addEventListener('visibilitychange', markOpened, { once: true });
      setTimeout(() => {
        window.removeEventListener('blur', markOpened);
        document.removeEventListener('visibilitychange', markOpened);
        if (!clientOpened && !document.hidden) mailtoFallback.hidden = false;
      }, 1600);
    });
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

  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const addresses = `${submitTo}, ${submitCc}`;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(addresses);
          copied = true;
        }
      } catch (error) {
        copied = fallbackCopy(addresses);
      }
      if (!copied) copied = fallbackCopy(addresses);
      const original = button.textContent;
      button.textContent = copied ? 'Copied ✓' : 'Copy blocked';
      setTimeout(() => { button.textContent = original; }, 1800);
    });
  });
})();
