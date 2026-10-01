const clients = [
  ['bliss-flowers','Bliss Flowers'],
  ['novas-singapore','NOVAS Singapore'],
  ['suuco','Suuco'],
  ['twfp','TWFP']
].map(([id, name], index) => ({ id, name, email: `${id}@client.convert8.io`, password: `Convert8${index + 1}!`, seed: index }));

const months = [
  { key: '2026-09', label: 'September 2026', short: 'Sep 01 — Sep 30, 2026' },
  { key: '2026-10', label: 'October 2026', short: 'Oct 01 — Oct 31, 2026' }
];
const app = document.getElementById('app');
let session = JSON.parse(localStorage.getItem('convert8-session') || 'null');

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
function reportFor(client, monthIndex) {
  const factor = 1 + client.seed * .072 + monthIndex * .09;
  const spend = Math.round(34280 * factor); const roas = +(3.76 + client.seed * .045 + monthIndex * .21).toFixed(2);
  const purchases = Math.round(1024 * factor * (1 + monthIndex * .04)); const revenue = Math.round(spend * roas);
  return { spend, roas, purchases, revenue, cpa: +(spend / purchases).toFixed(2), meta: Math.round(spend * .57), google: Math.round(spend * .43) };
}
function renderLogin(error = '') {
  app.innerHTML = `<section class="login-page"><div class="login-card"><div class="logo"><span class="logo-mark"><img src="logo.svg" alt="Convert8"></span>convert8</div><p class="kicker">CLIENT REPORTING PORTAL</p><h1>Your performance,<br><em>all in one place.</em></h1><p class="login-copy">Sign in to access your monthly Google and Meta advertising reports.</p><form id="loginForm"><label>Email address<input type="email" id="email" autocomplete="email" placeholder="you@company.com" required></label><label>Password<input type="password" id="password" autocomplete="current-password" placeholder="Enter your password" required></label>${error ? `<p class="form-error">${error}</p>` : ''}<button class="primary" type="submit">Sign in <span>→</span></button></form><p class="help">Need access? Contact your Convert8 account manager.</p></div><aside class="login-art"><div class="art-label">PRIVATE · CLIENT ACCESS</div><div class="orb orb-one"></div><div class="orb orb-two"></div><p>Clear reports.<br>Confident decisions.</p><span>Convert8<br>Monthly reporting portal</span></aside></section>`;
  document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault(); const email = document.getElementById('email').value.trim().toLowerCase(); const password = document.getElementById('password').value;
    const client = clients.find(item => item.email === email && item.password === password);
    if (!client) return renderLogin('That email or password does not match our records.');
    session = { clientId: client.id, monthIndex: 0 }; localStorage.setItem('convert8-session', JSON.stringify(session)); renderPortal();
  });
}
function renderPortal() {
  const client = clients.find(item => item.id === session.clientId); if (!client) return renderLogin();
  const report = reportFor(client, session.monthIndex); const month = months[session.monthIndex]; const previous = session.monthIndex === 0 ? null : reportFor(client, session.monthIndex - 1);
  const change = previous ? ((report.roas / previous.roas - 1) * 100).toFixed(1) : '—';
  app.innerHTML = `<header class="portal-top"><a class="logo" href="#"><span class="logo-mark"><img src="logo.svg" alt="Convert8"></span>convert8</a><div class="portal-title">CLIENT REPORTING PORTAL <i></i> ${client.name.toUpperCase()}</div><div class="account"><span>${client.name}</span><button id="logout">Sign out</button></div></header>
  <section class="portal"><nav class="side-nav"><p class="nav-title">REPORT ARCHIVE</p>${months.map((item, index) => `<button class="month-link ${index === session.monthIndex ? 'active' : ''}" data-month="${index}"><span>${item.label}</span><b>${index === 0 ? 'NEW' : 'LIVE'}</b></button>`).join('')}<div class="nav-note"><span>✦</span><p>New reports are published during the first week of each month.</p></div></nav>
  <main class="report"><div class="report-heading"><div><p class="kicker">MONTHLY PERFORMANCE REPORT</p><h1>${month.label}</h1><p class="report-intro">Here’s how your paid media investment performed across Google and Meta this month.</p></div><button class="export-report" id="export">↓&nbsp; Export PDF</button></div>
  <section class="kpis"><article class="kpi dark"><p>MEDIA SPEND</p><strong>${money(report.spend)}</strong><span>Paid media investment</span></article><article class="kpi"><p>ATTRIBUTED REVENUE</p><strong>${money(report.revenue)}</strong><span class="positive">↗ ${previous ? '+14.1%' : 'First report'}</span></article><article class="kpi"><p>BLENDED ROAS</p><strong>${report.roas}x</strong><span class="positive">${previous ? `↗ ${change}%` : 'Healthy return'}</span></article><article class="kpi"><p>PURCHASES</p><strong>${report.purchases.toLocaleString()}</strong><span>CPA ${money(report.cpa)}</span></article></section>
  <section class="report-grid"><article class="card chart-card"><div class="card-header"><div><p class="kicker">MONTH AT A GLANCE</p><h2>Revenue & investment</h2></div><div class="chart-legend"><span><i class="rev"></i>Revenue</span><span><i class="inv"></i>Investment</span></div></div><div class="chart"><div class="chart-axis"><span>$${Math.round(report.revenue/1000)}k</span><span>$${Math.round(report.revenue/1500)}k</span><span>$${Math.round(report.revenue/3000)}k</span><span>$0</span></div><svg viewBox="0 0 680 205" preserveAspectRatio="none" aria-label="Revenue increased through the month"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#9acf34" stop-opacity=".23"/><stop offset="1" stop-color="#9acf34" stop-opacity="0"/></linearGradient></defs><g class="grid"><path d="M0 12H680M0 76H680M0 140H680M0 204H680"/></g><path class="area" d="M0 161 C32 155 53 165 78 148 S120 134 150 138 S194 109 225 123 S265 113 301 91 S344 103 372 78 S419 69 449 76 S486 43 520 51 S563 35 593 41 S637 12 680 24 L680 205H0Z"/><path class="revenue" d="M0 161 C32 155 53 165 78 148 S120 134 150 138 S194 109 225 123 S265 113 301 91 S344 103 372 78 S419 69 449 76 S486 43 520 51 S563 35 593 41 S637 12 680 24"/><path class="investment" d="M0 177 C35 168 51 176 78 165 S118 158 150 163 S193 146 225 153 S265 139 301 148 S342 131 372 140 S417 120 449 130 S485 111 520 121 S561 103 593 113 S636 96 680 103"/></svg><div class="chart-months"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div></article>
  <article class="card insight"><p class="kicker">EXECUTIVE SUMMARY</p><h2>Efficiency remained <em>the focus.</em></h2><p>Strong creative and high-intent search continued to drive profitable growth through ${month.label.split(' ')[0]}.</p><div class="insight-stat"><strong>${report.roas}x</strong><span>return on every<br>advertising dollar</span></div><a href="#performance">Explore performance <span>→</span></a></article></section>
  <section class="report-grid lower"><article class="card channels" id="performance"><div class="card-header"><div><p class="kicker">CHANNEL PERFORMANCE</p><h2>Google & Meta</h2></div></div><div class="channel-row"><div class="platform meta">∞</div><div class="channel-name"><b>Meta Ads</b><span>${money(report.meta)} spend</span></div><strong>${(report.roas-.21).toFixed(2)}x</strong><span class="roas-label">ROAS</span><div class="progress"><i style="width:76%"></i></div></div><div class="channel-row"><div class="platform google">G</div><div class="channel-name"><b>Google Ads</b><span>${money(report.google)} spend</span></div><strong>${(report.roas+.29).toFixed(2)}x</strong><span class="roas-label">ROAS</span><div class="progress yellow"><i style="width:90%"></i></div></div></article><article class="card next"><p class="kicker">NEXT MONTH</p><h2>Focus areas</h2><ul><li>Scale highest-performing creative</li><li>Protect branded search visibility</li><li>Test new customer acquisition offer</li></ul></article></section>
  <footer class="report-footer">Prepared exclusively for <b>${client.name}</b><span>Confidential · Convert8</span></footer></main></section><div id="toast" class="toast" role="status"></div>`;
  document.querySelectorAll('[data-month]').forEach(button => button.addEventListener('click', () => { session.monthIndex = Number(button.dataset.month); localStorage.setItem('convert8-session', JSON.stringify(session)); renderPortal(); }));
  document.getElementById('logout').addEventListener('click', () => { localStorage.removeItem('convert8-session'); session = null; renderLogin(); });
  document.getElementById('export').addEventListener('click', () => showToast('Your PDF export is being prepared.'));
}
function showToast(text) { const toast = document.getElementById('toast'); toast.textContent = text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
session ? renderPortal() : renderLogin();
