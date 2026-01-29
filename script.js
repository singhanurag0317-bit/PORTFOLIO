/* ===== Scroll Progress ===== */
const progressBar = document.getElementById("progress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / height) * 100 + "%";
  });
}




/* ===== Hero Animations (GSAP) ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(".reveal-text", { y: 30, opacity: 0 });
    gsap.set(".sphere", { scale: 0.8, opacity: 0 });
    gsap.set(".glow-left, .glow-right", { opacity: 0 });

    tl.to(".reveal-text", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3
    })
      .to(".sphere", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.3)"
      }, "-=0.5")
      .to(".glow-left, .glow-right", {
        opacity: 1,
        duration: 1.5,
      }, "-=0.8");
  }
});

/* ===== Nav Link Active State ===== */
// Safety: Ensure active class is set based on current path if not already
const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPath) {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }
});


/* ===== Card Interaction ===== */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

/* ===== Skill Hover ===== */
document.querySelectorAll(".skills span").forEach(skill => {
  skill.addEventListener("mouseenter", () => skill.classList.add("active"));
  skill.addEventListener("mouseleave", () => skill.classList.remove("active"));
});

/* ===== Contact Interaction ===== */
document.querySelectorAll(".contact-item").forEach(item => {
  item.addEventListener("click", () => {
    item.style.color = "#5b7cfa";
  });
});

/* ===== Contact Form Interaction ===== */
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const button = form.querySelector("button");
    const originalText = button.innerText;

    button.innerText = "Sending...";
    button.disabled = true;

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/7a41ceb9fada0b818acd10ed3315869b", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then(response => response.json())
      .then(data => {
        button.innerText = "Message Sent ✓";
        button.style.background = "#6fd1c7";
        form.reset();

        setTimeout(() => {
          button.innerText = originalText;
          button.style.background = "";
          button.disabled = false;
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        button.innerText = "Error! Try again.";
        button.style.background = "#ff6b6b";

        setTimeout(() => {
          button.innerText = originalText;
          button.style.background = "";
          button.disabled = false;
        }, 3000);
      });
  });
}

// Scroll reveal animation for inner elements
const revealElements = document.querySelectorAll('.reveal');

if (revealElements && revealElements.length) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}


/* ===== Orb Animation ===== */
const orb = document.querySelector(".orb");
if (orb && typeof gsap !== "undefined") {
  orb.addEventListener("mouseenter", () => {
    gsap.to(".orb", {
      scale: 1.08,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  orb.addEventListener("mouseleave", () => {
    gsap.to(".orb", {
      scale: 1,
      duration: 0.4
    });
  });
}

/* ===== Status Text ===== */
const texts = [
  "Available for opportunities",
  "Building clean UI & interactions",
  "Focused on frontend mastery",
  "Learning. Building. Improving."
];

let index = 0;
const statusText = document.getElementById("statusText");

if (statusText) {
  setInterval(() => {
    index = (index + 1) % texts.length;
    statusText.textContent = texts[index];
  }, 3500);
}

/* ===== Project Row Animation ===== */
const projectRows = document.querySelectorAll('.project-row');

const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

projectRows.forEach(row => observer1.observe(row));



/* ===== Page Transition ===== */
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
});

document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = this.getAttribute('target');

    if (href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('javascript:') &&
      target !== '_blank') {

      e.preventDefault();
      document.body.classList.remove('loaded');

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});

/* ===== Skill Tag Hover Colors ===== */
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
  const color = tag.getAttribute('data-color');
  const icon = tag.querySelector('i');

  tag.addEventListener('mouseenter', () => {
    tag.style.borderColor = color;
    tag.style.boxShadow = `0 4px 15px ${color}40`; // 40 is hex opacity
    if (icon) icon.style.color = color;
  });

  tag.addEventListener('mouseleave', () => {
    tag.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    tag.style.boxShadow = 'none';
    if (icon) icon.style.color = '';
  });
});

/* ===== Magnetic Buttons ===== */
const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .nav-links a');

buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) * 0.2; // Move 20% of cursor distance
    const deltaY = (y - centerY) * 0.2;

    btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* ===== Mobile Menu Toggle ===== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate toggle icon
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
}
