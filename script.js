// Disable console logs for non-developers
(function() {
  const methods = ['log', 'warn', 'error', 'info', 'debug'];
  methods.forEach(method => {
    console[method] = function() {};
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const linkBtns = document.querySelectorAll('.link-btn');

  linkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'translate(2px, 2px)';
      btn.style.boxShadow = 'none';
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }, 100);
    });
  });

  document.querySelectorAll('.email').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const email = link.dataset.email || link.textContent;
      navigator.clipboard.writeText(email).then(() => {
        showToast();
      });
    });
  });

  function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Moon click event for day/night toggle
  const moon = document.getElementById('moon');
  const tagline = document.getElementById('tagline');

  moon.addEventListener('click', () => {
    const isDay = document.body.classList.toggle('day');
    if (isDay) {
      tagline.textContent = '햇살이 비치는 순간을 그냥 흘려보내지 못하는 사람.';
    } else {
      tagline.textContent = '별이 보이지 않아도 늘 하늘을 찾는 습관이 있는 사람.';
    }
  });

  // Speech bubble animation - show once after 3 seconds with bounce effect
  if (!localStorage.getItem('easterEggShown')) {
    setTimeout(() => {
      const speechBubble = document.getElementById('speechBubble');
      speechBubble.classList.add('show');
      localStorage.setItem('easterEggShown', 'true');
    }, 3000); // Show after 3 seconds
  }

  createStars();

  function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = Math.random() * 2 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      starsContainer.appendChild(star);
    }
  }

  createParticles();

  function createParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});
