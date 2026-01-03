import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Palette,
  Layers,
  Zap,
  Award,
  Users,
  Download,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Share2 } from "lucide-react";
import "./App.css";

interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images: string[];
  color: string;
}

interface Tool {
  name: string;
  icon: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "work", "services", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setSelectedCategory(null);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".section, .stat-card, .service-card, .category-card, .testimonial-card, .tool-item"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        setToast({
          show: true,
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
        e.currentTarget.reset();
      })
      .catch((error: unknown) => {
        console.error("EmailJS Error:", error);
        setToast({
          show: true,
          message: "Oops! Something went wrong. Please try again.",
          type: "error",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const projectCategories: ProjectCategory[] = [
    {
      id: "estate",
      name: "Real Estate",
      description: "Property branding and marketing materials",
      coverImage: "/george_portfolio/images/Estate_1.jpg",
      images: [
        "/george_portfolio/images/Estate_1.jpg",
        "/george_portfolio/images/Estate_2.jpg",
        "/george_portfolio/images/Estate_2B.jpg",
        "/george_portfolio/images/Estate_3.jpg",
        "/george_portfolio/images/Estate_4.jpg",
        "/george_portfolio/images/Estate_5.jpg",
        "/george_portfolio/images/Estate_6.jpg",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "logistics",
      name: "Logistics",
      description: "Transportation and supply chain branding",
      coverImage: "/george_portfolio/images/Logistics_1.jpg",
      images: [
        "/george_portfolio/images/Logistics_1.jpg",
        "/george_portfolio/images/Logistics_2.jpg",
        "/george_portfolio/images/Logistics_3.jpg",
        "/george_portfolio/images/logistics-3-june3 (1).jpg",
        "/george_portfolio/images/Logistics_4.jpg",
        "/george_portfolio/images/Logistics_5.jpg",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      id: "branding",
      name: "Branding",
      description: "Visual identity and brand systems",
      coverImage: "/george_portfolio/images/Branding_1.jpg",
      images: [
        "/george_portfolio/images/Branding_1.jpg",
        "/george_portfolio/images/Branding_2.jpg",
        "/george_portfolio/images/Branding_3.png",
        "/george_portfolio/images/Branding_4.jpg",
        "/george_portfolio/images/Branding_5.png",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "greeting",
      name: "Greeting & Events",
      description: "Event graphics and greeting designs",
      coverImage: "/george_portfolio/images/Event_1.jpg",
      images: [
        "/george_portfolio/images/Event_1.jpg",
        "/george_portfolio/images/Event_2.jpg",
        "/george_portfolio/images/Event_3.jpg",
        "/george_portfolio/images/Event_4.jpg",
        "/george_portfolio/images/Event_5.jpg",
        "/george_portfolio/images/Event_6.jpg",
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "restaurant",
      name: "Restaurant",
      description: "Food and hospitality branding",
      coverImage: "/george_portfolio/images/Restaurant_1.jpg",
      images: [
        "/george_portfolio/images/Restaurant_1.jpg",
        "/george_portfolio/images/Restaurant_2.jpg",
        "/george_portfolio/images/Restaurant_3.jpg",
        "/george_portfolio/images/Restaurant_4.jpg",
        "/george_portfolio/images/Restaurant_5.jpg",
        "/george_portfolio/images/Restaurant_6.jpg",
        "/george_portfolio/images/Restaurant_8.jpg",
        "/george_portfolio/images/Restaurant_9.jpg",
        "/george_portfolio/images/Restaurant_10.jpg",
        "/george_portfolio/images/Restaurant_11.jpg",
        "/george_portfolio/images/Restaurant_12.jpg",
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "travels",
      name: "Travels",
      description: "Travel photography and travel-related branding",
      coverImage: "/george_portfolio/images/Travels_1.jpg",
      images: [
        "/george_portfolio/images/Travels_1.jpg",
        "/george_portfolio/images/Travels_2.jpg",
        "/george_portfolio/images/Travels_3.jpg",
      ],
      color: "from-sky-500 to-cyan-500",
    },
  ];

  // const projects: Project[] = [
  //   {
  //     title: "Lumina Brand Identity",
  //     category: "branding",
  //     image:
  //       "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
  //     description:
  //       "Complete brand identity system for a modern tech startup including logo, guidelines, and digital assets",
  //     tags: ["Brand Strategy", "Logo Design", "Style Guide"],
  //     color: "from-violet-500 to-fuchsia-500",
  //   },
  //   {
  //     title: "Nordic Living Magazine",
  //     category: "print",
  //     image:
  //       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
  //     description:
  //       "Editorial design and layout for a luxury lifestyle magazine featuring minimalist aesthetics",
  //     tags: ["Editorial", "Typography", "Layout"],
  //     color: "from-pink-500 to-rose-500",
  //   },
  //   {
  //     title: "FitFlow Mobile App",
  //     category: "digital",
  //     image:
  //       "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop",
  //     description:
  //       "Complete UI/UX design for a fitness tracking app with focus on user engagement and accessibility",
  //     tags: ["UI/UX", "Mobile", "Prototyping"],
  //     color: "from-cyan-500 to-blue-500",
  //   },
  //   {
  //     title: "Artisan Coffee Co.",
  //     category: "packaging",
  //     image:
  //       "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
  //     description:
  //       "Sustainable packaging design for premium coffee brand with eco-friendly materials",
  //     tags: ["Packaging", "Sustainability", "3D Mockup"],
  //     color: "from-amber-500 to-orange-500",
  //   },
  //   {
  //     title: "Urban Fashion Campaign",
  //     category: "digital",
  //     image:
  //       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
  //     description:
  //       "Social media campaign design with cohesive visual identity across all platforms",
  //     tags: ["Social Media", "Campaign", "Photography"],
  //     color: "from-fuchsia-500 to-pink-500",
  //   },
  //   {
  //     title: "Summer Beats Festival",
  //     category: "print",
  //     image:
  //       "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
  //     description:
  //       "Dynamic poster series for music festival with bold typography and vibrant colors",
  //     tags: ["Poster Design", "Typography", "Illustration"],
  //     color: "from-emerald-500 to-teal-500",
  //   },
  //   {
  //     title: "Zenith Architecture",
  //     category: "branding",
  //     image:
  //       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  // //     description:
  // //       "Sophisticated brand identity for architectural firm emphasizing precision and elegance",
  // //     tags: ["Brand Identity", "Print Collateral", "Website"],
  //     color: "from-slate-500 to-zinc-500",
  //   },
  //   {
  //     title: "Gourmet Delights Packaging",
  //     category: "packaging",
  //     image:
  //       "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
  //     description:
  //       "Luxury food packaging with premium finishes and elegant typography",
  //     tags: ["Packaging", "Luxury", "Print Design"],
  //     color: "from-purple-500 to-indigo-500",
  //   },
  //   {
  //     title: "TravelHub Dashboard",
  //     category: "digital",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  //     description:
  //       "Comprehensive dashboard design for travel booking platform with intuitive navigation",
  //     tags: ["Web Design", "Dashboard", "UX"],
  //     color: "from-sky-500 to-cyan-500",
  //   },
  // ];

  const tools: Tool[] = [
    { name: "Canva", icon: "🎨" },
    { name: "Adobe Illustrator", icon: "✨" },
    { name: "Adobe InDesign", icon: "📐" },
    { name: "After Effects", icon: "🎬" },
  ];

  const testimonials: Testimonial[] = [
    {
      text: "An absolute pleasure to work with! The designs perfectly captured our brand essence.",
      author: "Engr. Quzeem Sarafdeen",
      role: "CEO, Quazard Global Limited",
    },
    {
      text: "Incredible attention to detail and creative vision. Transformed our entire brand identity with great results results.",
      author: "Mrs. Abimbola",
      role: "Director, TopBites Bakery and Foods",
    },
    {
      text: "Professional, timely and talented. Every project deliverable was pixel-perfect and beyond what we imagined.",
      author: "Barr. Esther Linuson",
      role: "Founder, Linuson & Gold Attorneys",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  const currentCategory = projectCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="portfolio">
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#home" className="logo">
            <Palette className="logo-icon" />
            <span>georgedesignedit</span>
          </a>

          <div className="nav-menu">
            {["home", "about", "work", "services", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-link ${
                  activeSection === item ? "nav-link-active" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {["home", "about", "work", "services", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="mobile-menu-link"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="hero">
        <div className="hero-bg">
          <div className="hero-gradient hero-gradient-1"></div>
          <div className="hero-gradient hero-gradient-2"></div>
          <div className="hero-gradient hero-gradient-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Available for Freelance Projects
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">Crafting Visual</span>
            <span className="hero-title-line hero-title-accent">
              Experiences
            </span>
          </h1>

          <p className="hero-subtitle">
            Hello, I'm George. A graphic designer and junior developer.
          </p>

          <div className="hero-cta">
            <button
              onClick={() => scrollToSection("work")}
              className="btn btn-primary"
            >
              <span>View Portfolio</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn btn-secondary"
            >
              Let's Talk
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">200+</div>
              <div className="hero-stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">15+</div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">3+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-indicator-line"></div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">About Me</div>
            <h2 className="section-title">
              Creating Visuals That Tell <span>Your Story</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <p className="about-text">
                I'm a passionate graphic designer with over 3 years of
                experience; transforming brands through thoughtful, strategic
                design. My work spans branding, editorial design, digital
                experiences, and everything in between.
              </p>
              <p className="about-text">
                I believe great design is more than just aesthetics—it's about
                solving problems, telling stories, and creating meaningful
                connections between brands and their audiences.
              </p>

              <div className="about-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <Award size={24} />
                  </div>
                  <h3 className="feature-title">Professionalism</h3>
                  <p className="feature-text">
                    I approach each brief with a strong understanding of the
                    client’s goals, translating ideas into visually compelling
                    and functional designs. From concept to final delivery, I
                    maintain consistency, accuracy, and a high standard of
                    quality.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Users size={24} />
                  </div>
                  <h3 className="feature-title">Client-Focused</h3>
                  <p className="feature-text">
                    Every project I take on is driven by a deep understanding of
                    the client’s goals, audience, and vision. I believe great
                    design starts with listening — ensuring that every creative
                    decision aligns with the client’s needs and objectives.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Zap size={24} />
                  </div>
                  <h3 className="feature-title">Fast Turnaround</h3>
                  <p className="feature-text">
                    I understand the importance of time in today’s fast-moving
                    digital world. That’s why I prioritize efficiency without
                    compromising quality. From concept to delivery, I work with
                    focus and precision to ensure projects are completed
                    promptly and to a high standard.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-skills">
              <div className="tools-grid">
                {tools.map((tool, i) => (
                  <div key={i} className="tool-card">
                    <span className="tool-icon">{tool.icon}</span>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>

              <div className="skills-list">
                <h3 className="skills-title">Skills</h3>
                {[
                  "Visual Communication",
                  "Branding & Identity Design",
                  "UI/UX Design Basics",
                  "Web Design",
                  "Illustration & Typography",
                  "React Native Development",

                  "Design Consistency & Branding Systems",
                ].map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-marker"></div>
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="container-wide">
          <div className="section-header">
            <div className="section-tag">Portfolio</div>
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
            <p className="section-subtitle">
              Explore my work across different design disciplines. Click on any
              category to view the full collection.
            </p>
          </div>

          <div className="categories-grid">
            {projectCategories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-image-wrapper">
                  <img
                    src={category.coverImage}
                    alt={category.name}
                    className="category-image"
                    loading="lazy"
                  />
                  <div
                    className={`category-overlay gradient-${category.color}`}
                  >
                    <div className="category-content">
                      <h3 className="category-title">{category.name}</h3>
                      <p className="category-description">
                        {category.description}
                      </p>
                      <div className="category-count">
                        {category.images.length} Project
                        {category.images.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="category-view-btn">
                      <ExternalLink size={20} />
                      <span>View Gallery</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && currentCategory && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <h2 className="modal-title">{currentCategory.name}</h2>
                <p className="modal-subtitle">{currentCategory.description}</p>
              </div>

              <div className="modal-gallery">
                {currentCategory.images.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    onClick={() => setFullscreenImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${currentCategory.name} ${index + 1}`}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-item-overlay">
                      <ExternalLink size={24} />
                      <span>View Full Size</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {fullscreenImage && (
          <div
            className="fullscreen-overlay"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              className="fullscreen-close"
              onClick={() => setFullscreenImage(null)}
            >
              <X size={32} />
            </button>
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>

      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Services</div>
            <h2 className="section-title">
              What I <span>Offer</span>
            </h2>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Palette size={32} />
              </div>
              <h3 className="service-title">Brand Identity</h3>
              <p className="service-description">
                Complete brand identity systems including logo design, color
                palettes, typography, and comprehensive brand guidelines that
                establish a strong visual presence.
              </p>
              <ul className="service-list">
                <li>Logo Design & Variations</li>
                <li>Brand Style Guides</li>
                <li>Visual Identity Systems</li>
                <li>Brand Collateral</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Layers size={32} />
              </div>
              <h3 className="service-title">Digital Design</h3>
              <p className="service-description">
                Modern, user-focused digital experiences from websites to mobile
                apps. Creating interfaces that are both beautiful and intuitive
                to use.
              </p>
              <ul className="service-list">
                <li>Front End Design (UI/UX)</li>
                <li>Mobile App Interfaces</li>
                <li>Social Media Graphics</li>
                <li>Digital Campaigns</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Share2 size={32} />
              </div>
              <h3 className="service-title">Social Media</h3>
              <p className="service-description">
                Creative and strategic social media designs that help brands
                connect, engage, and grow their audience across platforms.
              </p>
              <ul className="service-list">
                <li>Social Media Post Design</li>
                <li>Instagram & Facebook Graphics</li>
                <li>Campaign Visuals</li>
                <li>Content Branding</li>
              </ul>
            </div>
          </div>

          <div className="testimonials-section">
            <h3 className="testimonials-title">What Clients Say</h3>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="testimonial-card">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-info">
                      <div className="testimonial-name">
                        {testimonial.author}
                      </div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="section-header">
              <div className="section-tag">Get In Touch</div>
              <h2 className="section-title">
                Let's Create Something <span>Amazing Together</span>
              </h2>
              <p className="section-subtitle">
                Have a project in mind? I'd love to hear about it. Let's
                collaborate and bring your vision to life.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <a
                  href="mailto:linuson.g.linuson@gmail.com"
                  className="contact-email"
                  title="Send me an email"
                >
                  <Mail size={24} />
                  <span>linuson.g.linuson@gmail.com</span>
                </a>

                <div className="social-links">
                  <a
                    href="https://wa.me/2349054363890"
                    className="social-link"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    className="social-link"
                    aria-label="LinkedIn"
                    title="Connect on LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/yourusername"
                    className="social-link"
                    aria-label="GitHub"
                    title="View GitHub Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <div className="contact-actions">
                  <a
                    href="/george_portfolio/resume.pdf"
                    download="Linuson_Resume.pdf"
                    className="btn btn-outline"
                  >
                    <Download size={20} />
                    <span>Download Resume</span>
                  </a>
                  <button
                    onClick={() => scrollToSection("work")}
                    className="btn btn-ghost"
                  >
                    <span>View All Work</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="form-input form-textarea"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="spinner"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="60"
                          strokeDashoffset="30"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Palette className="footer-icon" />
              <span>georgedesignedit</span>
            </div>
            <p className="footer-text">
              © 2026 George. Crafted with passion & precision.
            </p>
          </div>
        </div>
      </footer>

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === "success" ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <p className="toast-message">{toast.message}</p>
            <button
              className="toast-close"
              onClick={() => setToast({ ...toast, show: false })}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
