
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-transition");

  document.querySelectorAll('.menu-toggle').forEach((menuToggle) => {
    const navId = menuToggle.getAttribute('aria-controls');
    const siteNav = document.getElementById(navId);
    if (!siteNav) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach(item => observer.observe(item));
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: contactForm.querySelector('[name="name"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        type: contactForm.querySelector('[name="type"]').value,
        message: contactForm.querySelector('[name="message"]').value,
        createdAt: new Date().toISOString()
      };
      const submissions = JSON.parse(localStorage.getItem("blackboyEnquiries") || "[]");
      submissions.push(formData);
      localStorage.setItem("blackboyEnquiries", JSON.stringify(submissions));
      contactForm.reset();
      const note = document.querySelector("#formSuccess");
      if (note) note.textContent = "Enquiry saved locally in this demo build. Connect Formspree, Netlify Forms, or a backend API for real submissions.";
    });
  }

  const checkoutForm = document.querySelector("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const orders = JSON.parse(localStorage.getItem("blackboyOrders") || "[]");
      orders.push({
        id: "BB-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        customer: checkoutForm.querySelector('[name="fullName"]').value,
        email: checkoutForm.querySelector('[name="email"]').value,
        address: checkoutForm.querySelector('[name="address"]').value,
        cart: JSON.parse(localStorage.getItem("blackboyCart") || "[]"),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("blackboyOrders", JSON.stringify(orders));
      localStorage.removeItem("blackboyCart");
      if (typeof updateCartCount === "function") updateCartCount();
      window.location.href = "checkout-success.html";
    });
  }
});
