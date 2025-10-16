/* main.js */
document.addEventListener('DOMContentLoaded', () => {
  // basics
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // NAV / HAM
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navMenu');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('is-active');
  });

  // DARK MODE - toggle class on body
  const darkToggle = document.getElementById('darkToggle');
  const saved = localStorage.getItem('fokap-mode');
  if (saved === 'dark') document.body.classList.add('dark-mode');

  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    localStorage.setItem('fokap-mode', isDark ? 'dark' : 'light');
  });

  // Sample cards (kegiatan)
  const cardsGrid = document.getElementById('cardsGrid');
  const sampleEvents = [
    {title:'Pelantikan Pengurus 2025', date:'20 Feb 2025', excerpt:'Pelantikan pengurus fokus pada kepemimpinan & program kerja.'},
    {title:'Workshop Jurnalistik', date:'10 Mar 2025', excerpt:'Latihan menulis berita & foto jurnalistik untuk anggota.'},
    {title:'Lomba Antar OSIS', date:'5 Apr 2025', excerpt:'Kompetisi antar OSIS: debat, jurnalistik, kreatif.'},
    {title:'Pengabdian Masyarakat', date:'18 Mei 2025', excerpt:'Kegiatan sosial bersama sekolah-sekolah di kabupaten.'}
  ];

  function renderCards(list){
    cardsGrid.innerHTML = '';
    list.forEach((ev, idx) => {
      const card = document.createElement('article');
      card.className = 'card reveal';
      card.innerHTML = `
        <h4>${ev.title}</h4>
        <div class="meta">${ev.date}</div>
        <p style="margin-top:.5rem;color:var(--muted)">${ev.excerpt}</p>
      `;
      cardsGrid.appendChild(card);
    });
  }
  renderCards(sampleEvents);

  document.getElementById('showMore').addEventListener('click', () => {
    // add 2 more demo events to simulate "show more"
    const more = [
      {title:'Podcast: Cerita OSIS', date:'12 Jun 2025', excerpt:'Pembahasan program dan pengalaman OSIS.'},
      {title:'Festival Sekolah', date:'25 Jul 2025', excerpt:'Acara puncak tahunan melibatkan semua OSIS.'}
    ];
    renderCards(sampleEvents.concat(more));
  });

  // Simple chat bot (RoboFokap) - rule-based
  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  const botReplies = [
    {match: /gabung|bergabung|cara gabung|cara daftar/i, reply: 'Untuk bergabung, hubungi admin melalui email atau daftar di form pendaftaran. Mau saya tampilkan kontak? (ketik "kontak")'},
    {match: /jadwal|kegiatan|event|kegiatan terbaru/i, reply: 'Cek bagian "Kegiatan Terbaru" di halaman ini — tersedia info tanggal dan ringkasan.'},
    {match: /jurnalistik|wartawan|artikel/i, reply: 'Kami terbitkan artikel 2x/bulan. Mau lihat contoh artikel paling baru?'},
    {match: /kontak|admin|email/i, reply: 'Admin: admin@fokap.example (contoh). Atau hubungi lewat Instagram resmi kami.'},
    {match: /halo|hai|hai robo|hai robofokap/i, reply: 'Halo juga! Ada yang ingin ditanyakan seputar kegiatan atau cara gabung?'},
  ];

  function appendMessage(text, who='bot'){
    const el = document.createElement('div');
    el.className = who === 'bot' ? 'bot-message' : 'user-message';
    el.textContent = text;
    chatWindow.appendChild(el);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if(!msg) return;
    appendMessage(msg, 'user');
    chatInput.value = '';
    // simple thinking delay
    setTimeout(() => {
      // rule-based matching
      let found = false;
      for(const r of botReplies){
        if(r.match.test(msg)){
          appendMessage(r.reply, 'bot');
          found = true;
          break;
        }
      }
      if(!found){
        // fallback small Q/A: try to answer some simple factual patterns
        if(/berapa|berapa banyak|jumlah/i.test(msg)){
          appendMessage('Saat ini tercatat ~45 anggota dan 30+ sekolah berpartisipasi.', 'bot');
        } else {
          appendMessage('Maaf, saya belum paham sepenuhnya. Coba ketik "kontak" untuk info admin atau tanyakan tentang kegiatan.', 'bot');
        }
      }
    }, 600);
  });

  // QUIZ modal simple
  const kuisBtn = document.getElementById('kuisBtn');
  const kuisModal = document.getElementById('kuismodal');
  const closeKuis = document.getElementById('closeKuis');
  const quizArea = document.getElementById('quizArea');

  const quizData = [
    {q:'Berapa frekuensi publikasi artikel jurnalistik FOKAP?', options:['1x/bulan','2x/bulan','Setiap minggu'], answer:1},
    {q:'Apa tujuan utama Forum OSIS?', options:['Bermain','Kolaborasi antar OSIS','Menonton film'], answer:1}
  ];

  function openQuiz(){
    kuisModal.setAttribute('aria-hidden','false');
    // render quiz
    quizArea.innerHTML = '';
    quizData.forEach((item, idx) => {
      const box = document.createElement('div');
      box.className = 'quiz-item';
      box.innerHTML = `<h4>${idx+1}. ${item.q}</h4>`;
      item.options.forEach((opt,oIdx) => {
        const btn = document.createElement('button');
        btn.className = 'btn pill';
        btn.style.marginRight = '0.4rem';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          const correct = oIdx === item.answer;
          btn.style.opacity = '1';
          if(correct){
            btn.textContent = '✅ ' + opt;
            btn.style.background = 'var(--primary)';
            btn.style.color = '#fff';
          } else {
            btn.textContent = '✖️ ' + opt;
            btn.style.background = 'rgba(0,0,0,0.06)';
          }
          // disable sibling buttons
          Array.from(box.querySelectorAll('button')).forEach(b=>b.disabled=true);
        });
        box.appendChild(btn);
      });
      quizArea.appendChild(box);
    });
  }

  kuisBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openQuiz();
  });
  closeKuis.addEventListener('click', ()=> kuisModal.setAttribute('aria-hidden','true'));
  kuisModal.addEventListener('click', (e) => {
    if(e.target === kuisModal) kuisModal.setAttribute('aria-hidden','true');
  });

  // Scroll reveal - simple intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting) en.target.classList.add('in');
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});