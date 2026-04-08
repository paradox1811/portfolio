document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close mobile menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.innerHTML = '☰';
    });
  });

  // Navbar background on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active Link Highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
      } else {
        document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.remove('active');
      }
    });
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  const reveal = () => {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
  reveal(); // Trigger on load

  // Chatbot Logic
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatMessages = document.getElementById('chat-messages');
  const chatButtons = document.querySelectorAll('.chat-btn');
  const typingIndicator = document.getElementById('typing-indicator');

  const responses = {
    'skills': "My core expertise lies in Python, Machine Learning, Data Analytics, and Computer Vision. I also craft modern web interfaces using HTML, CSS, JavaScript, and Flask for backend logic.",
    'projects': "I've built several impactful projects, including a Python+OpenCV Attendance System and a Customer Churn Prediction ML model. You can view them in the Projects section above!",
    'availability': "I am currently open to new collaborations, freelance projects, and full-time professional roles. Let's build something amazing together.",
    'contact': "The best ways to reach me are via email at gaudrajan803@gmail.com or WhatsApp at +9779805456978. All my details are in the Contact section!"
  };

  chatToggle.addEventListener('click', () => {
    chatPanel.classList.toggle('active');
  });

  chatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const questionContext = btn.getAttribute('data-question');
      const questionText = btn.textContent.trim();
      
      // Add User Message
      appendMessage(questionText, 'user');
      
      // Show typing indicator, scroll to bottom
      typingIndicator.classList.add('active');
      chatMessages.appendChild(typingIndicator);
      scrollToBottom();
      
      // Simulate Bot delay
      setTimeout(() => {
        typingIndicator.classList.remove('active');
        appendMessage(responses[questionContext], 'bot');
      }, 800 + Math.random() * 500); // dynamic realistic delay
    });
  });

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
