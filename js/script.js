/* BABY ZONE - Interactive Script & Gallery Carousel */
const campaignPosters = [
  {
    src: 'assets/post.jpg',
    title: 'Comfort Feels Like Love',
    sub: 'Why do babies smile more in some clothes? Because comfort feels like love.'
  },
  {
    src: 'assets/06.04.png',
    title: 'Joyful Moments (പുഞ്ചിരി നിമിഷങ്ങൾ)',
    sub: 'Visit BabyZone Today & Bring Home the Joy!'
  },
  {
    src: 'assets/07.01.png',
    title: 'Little Champions Collection',
    sub: 'Every little champion deserves their first jersey.'
  },
  {
    src: 'assets/07.04.png',
    title: "Babies' Best Landing",
    sub: 'Everything Your Little One Needs, All Under One Roof.'
  },
  {
    src: 'assets/08.01.png',
    title: 'Shop Toys & Playwear',
    sub: 'Makes your baby smile - Shop toys for your little one.'
  },
  {
    src: 'assets/08.04.png',
    title: 'The Perfect Pick Awaits',
    sub: 'Discover adorable baby wear and accessories at BabyZone.'
  },
  {
    src: 'assets/09.02.png',
    title: 'Everything Baby Looks For',
    sub: 'Baby തേടുന്നതെല്ലാം Baby Zone ൽ ഉണ്ട്.'
  },
  {
    src: 'assets/09.03.png',
    title: 'Baby Wants BabyZone',
    sub: 'Where every little wish comes true.'
  }
];

let currentPosterIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('babyzone_theme') || 'light';
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      body.removeAttribute('data-theme');
      localStorage.setItem('babyzone_theme', 'light');
      themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('babyzone_theme', 'dark');
      themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
    }
  });

  // Save Contact (vCard .vcf file creation)
  const saveContactBtn = document.getElementById('save-contact-btn');
  if (saveContactBtn) {
    saveContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadVCard();
    });
  }

  // Gallery Card Clicks
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openPosterModal(index);
    });
  });

  // View All Posters Button
  const viewPosterBtn = document.getElementById('view-poster-btn');
  if (viewPosterBtn) {
    viewPosterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPosterModal(0);
    });
  }

  // Modal Handles
  const posterModal = document.getElementById('poster-modal');
  const qrModal = document.getElementById('qr-modal');
  const shareBtn = document.getElementById('share-btn');
  const closeBtns = document.querySelectorAll('.modal-close');

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      generateQRCode();
      qrModal.classList.add('active');
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      posterModal.classList.remove('active');
      qrModal.classList.remove('active');
    });
  });

  [posterModal, qrModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Lightbox Modal Prev / Next Navigation
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentPosterIndex = (currentPosterIndex - 1 + campaignPosters.length) % campaignPosters.length;
      updatePosterModalContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentPosterIndex = (currentPosterIndex + 1) % campaignPosters.length;
      updatePosterModalContent();
    });
  }

  // Set Background Button
  const setBgBtn = document.getElementById('set-bg-btn');
  if (setBgBtn) {
    setBgBtn.addEventListener('click', () => {
      setAmbientBackground(campaignPosters[currentPosterIndex].src);
      setBgBtn.innerHTML = '<i class="fa-solid fa-check"></i> Applied as Background!';
      setTimeout(() => {
        setBgBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Use as Background';
      }, 2000);
    });
  }
});

// Function to open poster modal
function openPosterModal(index) {
  currentPosterIndex = index;
  updatePosterModalContent();
  document.getElementById('poster-modal').classList.add('active');
}

// Function to update modal image and title
function updatePosterModalContent() {
  const poster = campaignPosters[currentPosterIndex];
  const modalImg = document.getElementById('modal-poster-img');
  const modalTitle = document.getElementById('modal-poster-title');
  const modalSub = document.getElementById('modal-poster-sub');

  if (modalImg) modalImg.src = poster.src;
  if (modalTitle) modalTitle.innerText = poster.title;
  if (modalSub) modalSub.innerText = poster.sub;
}

// Function to dynamically update ambient background
function setAmbientBackground(imagePath) {
  const ambientBg = document.querySelector('.ambient-bg');
  const heroCover = document.querySelector('.hero-cover');
  if (ambientBg) {
    ambientBg.style.backgroundImage = `url('${imagePath}')`;
  }
  if (heroCover) {
    heroCover.style.backgroundImage = `url('${imagePath}')`;
  }
}

// vCard Generator function
function downloadVCard() {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:BABY ZONE
ORG:Baby Zone Clothing & Accessories
TEL;TYPE=CELL,VOICE;TYPE=PREF:+918310893010
TEL;TYPE=WORK,VOICE:+918592000295
TEL;TYPE=WORK,VOICE:+918593000295
NOTE:Makes Your Baby Smile - Main Helpline (+91 83108 93010), Balussery (+91 8592 000 295), Kuttiadi (+91 8593 000 295)
URL:https://www.instagram.com/babyzone_stores
END:VCARD`;

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'BABY_ZONE_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// QR Code Generator
function generateQRCode() {
  const qrContainer = document.getElementById('qrcode-container');
  if (!qrContainer) return;
  
  const currentUrl = window.location.href;
  qrContainer.innerHTML = '';
  
  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=2d3748&bgcolor=ffffff`;
  qrImg.alt = 'BABY ZONE QR Code';
  qrImg.style.width = '180px';
  qrImg.style.height = '180px';
  qrImg.style.borderRadius = '12px';
  
  qrContainer.appendChild(qrImg);
}

// Copy URL to Clipboard
function copyPageLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const copyBtnText = document.getElementById('copy-link-text');
    if (copyBtnText) {
      const orig = copyBtnText.innerText;
      copyBtnText.innerText = 'Copied to Clipboard! ✨';
      setTimeout(() => {
        copyBtnText.innerText = orig;
      }, 2500);
    }
  });
}
