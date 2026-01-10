/* ===== Scroll Progress ===== */
const progressBar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / height) * 100 + "%";
});

/* ===== Section Reveal ===== */
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          navLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }
  });
}, { threshold: 0.25 });

sections.forEach(section => observer.observe(section));

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

/* ===== Smooth Scroll ===== */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    // set active state immediately for instant feedback
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ===== Contact Form Interaction ===== */
const form = document.querySelector(".contact-form");

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

// Scroll reveal animation
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

/* ===== 3D Tilt Effect (disabled) ===== */
// Tilt effect removed from project visuals and contact form to prevent hover 'swimming'.
// If desired in the future, re-enable by restoring the event listeners.



window.addEventListener("scroll", () => {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
});

// Smooth nav click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    // update active state on click
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});


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

const projectRows = document.querySelectorAll('.project-row');

const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

projectRows.forEach(row => observer1.observe(row));

// skills section
const info = document.getElementById("labInfo");
const nodes = document.querySelectorAll(".lab-node");
const lines = document.querySelectorAll(".lab-lines line");

const data = {
  HTML: "Semantic structure, accessibility-first layouts",
  CSS: "Design systems, responsiveness, calm animations",
  JavaScript: "Logic, interaction, dynamic UI behavior",
  React: "Component architecture, state-driven UI",
  Java: "Core logic, DSA, structured problem solving"
};

nodes.forEach(node => {
  node.addEventListener("mouseenter", () => {
    const skill = node.dataset.skill;
    info.innerHTML = `<strong>${skill}</strong> — ${data[skill]}`;

    lines.forEach(line => line.style.opacity = 0.05);
    const lineEl = document.getElementById(`line-${skill.toLowerCase()}`);
    if (lineEl) lineEl.style.opacity = 0.8;
  });

  node.addEventListener("mouseleave", () => {
    info.innerHTML = "Hover a node to explore";
    lines.forEach(line => line.style.opacity = 0.2);
  });
});




