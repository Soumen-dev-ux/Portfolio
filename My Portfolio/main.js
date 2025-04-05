// Project data
const projects = [
  {
    title: "Fresh & Fast",
    description:
      "A responsive food delivery app with user authentication, real-time order tracking, and a dynamic menu.",
    image: "https://i.postimg.cc/HL0yvLTM/canteen.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://freshandfastgmit.netlify.app/",
    githubLink: "https://github.com/Soumen-dev-ux/soumenpore/ecommerce-platform",
  },
]

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
const themeIcon = themeToggle.querySelector("i")

function toggleTheme() {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  html.setAttribute("data-theme", newTheme)
  themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon"

  // Save theme preference
  localStorage.setItem("theme", newTheme)
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", savedTheme)
themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"

themeToggle.addEventListener("click", toggleTheme)

// Header scroll animation
function handleScroll() {
  const navbar = document.getElementById("navbar")
  const scrollPosition = window.scrollY

  if (scrollPosition > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Highlight active section in navigation
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })

  // Reveal sections on scroll
  revealSections()
}

// Reveal sections when they come into view
function revealSections() {
  const revealSections = document.querySelectorAll(".reveal-section")
  const windowHeight = window.innerHeight
  const revealPoint = 150

  revealSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("visible")

      // If this is the stats section, start the counters
      if (section.id === "stats") {
        startCounters()
      }

      // Animate timeline items
      if (section.id === "achievements") {
        animateTimeline()
      }

      // Animate education cards
      if (section.id === "education") {
        animateEducation()
      }

      // Animate form inputs
      if (section.id === "contact") {
        animateFormInputs()
      }
    }
  })
}

// Animate timeline items with delay
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible")
    }, 300 * index)
  })
}

// Animate education cards with delay
function animateEducation() {
  const educationCards = document.querySelectorAll(".education-card")

  educationCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible")
    }, 300 * index)
  })
}

// Animate form inputs with delay
function animateFormInputs() {
  const formInputs = document.querySelectorAll(".animate-input")

  formInputs.forEach((input, index) => {
    setTimeout(() => {
      input.classList.add("visible")
    }, 200 * index)
  })
}

// Start counter animation
function startCounters() {
  const counters = document.querySelectorAll(".counter-value")
  const counterItems = document.querySelectorAll(".counter-item")
  const speed = 200

  // First make counter items visible
  counterItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible")
    }, 200 * index)
  })

  // Then start counting
  setTimeout(() => {
    counters.forEach((counter) => {
      const target = +counter.dataset.target
      let count = 0

      const updateCount = () => {
        const increment = target / speed

        if (count < target) {
          count += increment
          counter.innerText = Math.ceil(count)
          setTimeout(updateCount, 1)
        } else {
          counter.innerText = target
        }
      }

      updateCount()
    })
  }, 800)
}

window.addEventListener("scroll", handleScroll)

// Render projects with animation
function renderProjects() {
  const projectGrid = document.getElementById("projectGrid")

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div")
    projectCard.className = "project-card"
    projectCard.style.opacity = "0"
    projectCard.style.transform = "translateY(20px)"

    projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" target="_blank" class="project-link live">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubLink}" target="_blank" class="project-link github">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `

    projectGrid.appendChild(projectCard)

    // Animate cards
    setTimeout(() => {
      projectCard.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      projectCard.style.opacity = "1"
      projectCard.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Handle form submission with animation
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const submitButton = contactForm.querySelector(".submit-button")

  // Animate button
  submitButton.style.transform = "scale(0.95)"
  submitButton.textContent = "Sending..."

  try {
    // Simulate sending (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success animation
    submitButton.style.backgroundColor = "#10B981"
    submitButton.textContent = "Message Sent!"

    // Reset form
    e.target.reset()

    // Reset button after delay
    setTimeout(() => {
      submitButton.style.transform = ""
      submitButton.style.backgroundColor = ""
      submitButton.textContent = "Send Message"
    }, 2000)
  } catch (error) {
    // Error handling
    submitButton.style.backgroundColor = "#EF4444"
    submitButton.textContent = "Error! Try Again"

    setTimeout(() => {
      submitButton.style.transform = ""
      submitButton.style.backgroundColor = ""
      submitButton.textContent = "Send Message"
    }, 2000)
  }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProjects()
  handleScroll() // Initialize active section

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navLinks = document.getElementById("navLinks")

  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    const icon = mobileMenuToggle.querySelector("i")
    if (navLinks.classList.contains("active")) {
      icon.className = "fas fa-times"
      mobileMenuToggle.style.transform = "rotate(90deg)"
    } else {
      icon.className = "fas fa-bars"
      mobileMenuToggle.style.transform = "rotate(0deg)"
    }
  })

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active")
        mobileMenuToggle.querySelector("i").className = "fas fa-bars"
        mobileMenuToggle.style.transform = "rotate(0deg)"
      }
    })
  })

  // Add entrance animation for the header
  const navbar = document.getElementById("navbar")
  navbar.style.transform = "translateY(-100%)"
  navbar.style.opacity = "0"

  setTimeout(() => {
    navbar.style.transition = "transform 0.5s ease, opacity 0.5s ease"
    navbar.style.transform = "translateY(0)"
    navbar.style.opacity = "1"
  }, 300)

  // Initial reveal of sections that are already in view
  revealSections()
})

