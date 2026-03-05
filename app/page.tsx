"use client";

import { useEffect } from "react";
import { useState } from "react";









export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const track = document.querySelector(".carousel-track") as HTMLElement | null;
    const nextBtn = document.querySelector(".nav.next");
    const prevBtn = document.querySelector(".nav.prev");

    if (!track || !nextBtn || !prevBtn) return;

    const scrollNext = () => {
      track.scrollBy({ left: 900, behavior: "smooth" });
    };

    const scrollPrev = () => {
      track.scrollBy({ left: -900, behavior: "smooth" });
    };

    nextBtn.addEventListener("click", scrollNext);
    prevBtn.addEventListener("click", scrollPrev);

    return () => {
      nextBtn.removeEventListener("click", scrollNext);
      prevBtn.removeEventListener("click", scrollPrev);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".main-navbar");

    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling DOWN → hide navbar
        navbar.classList.add("nav-hidden");
      } else {
        // scrolling UP → show navbar
        navbar.classList.remove("nav-hidden");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const contactPerson = (formData.get("lead-name") as string)?.trim() || "";
    const email = (formData.get("lead-email") as string)?.trim() || "";
    const companySize = (formData.get("lead-size") as string)?.trim() || "";
    const phone = (formData.get("lead-phone") as string)?.trim() || "";
    const clientName = (formData.get("lead-company") as string)?.trim() || "Website Lead";

    if (!contactPerson || !email || !phone) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in Full Name, Email, and Phone Number.");
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    const payload = {
      crmDate: new Date().toISOString().split("T")[0],
      clientName: clientName || "Website Lead",
      contactPerson,
      phone,
      email,
      location: "",
      status: "New",
      notes: companySize ? `Company size: ${companySize}` : "From website enquiry form",
    };

    try {
      const res = await fetch("https://nicknameinfo.net/timesheet/crm/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Request failed (${res.status})`);
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you! We'll be in touch within 2 hours.");
      form.reset();
    } catch (err) {
      setSubmitStatus("error");
      setSubmitMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="main-navbar" aria-label="Main navigation">
        <div className="nav-container">

          <div className="nav-logo">
            <a href="#home" onClick={(e) => scrollToSection(e, "home")} aria-label="Home">
              <img src="/images/Logo.png" alt="NickName InfoTech" />
            </a>
          </div>

          {/* LINKS */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#home" onClick={(e) => scrollToSection(e, "home")}>Home</a></li>
            <li><a href="#product" onClick={(e) => scrollToSection(e, "product")}>Product</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, "about")}>Features</a></li>
            <li><a href="#industries" onClick={(e) => scrollToSection(e, "industries")}>Industries</a></li>
            <li><a href="#security" onClick={(e) => scrollToSection(e, "security")}>Security</a></li>
            <li><a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}>Pricing</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, "about")}>Company</a></li>
            <li><a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}>Contact</a></li>
          </ul>

          <div className="nav-actions">
            <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}><button className="btn-ghost">Sign In</button></a>
            <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}><button className="btn-primary">Register</button></a>
          </div>

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

        </div>
      </nav>

      <main id="main-content">
      {/* Hero */}
      <section className="hero-curve" id="home" aria-labelledby="hero-heading">
        <div className="hero-glow"></div>

        <div className="hero-wrap">

          {/* LEFT FEATURES */}
          <div className="curve left">
            <span>Smart Time Tracking</span>
            <span>Payroll Ready</span>
            <span>Shift Management</span>
            <span>Secure Data</span>
            <span>UAE Complaint</span>
          </div>

          {/* CENTER */}
          <div className="hero-center">
            <h1 id="hero-heading" className="hero-title">
              The #1 Timesheet & Productivity Suite Built
              <span> for the UAE Workforce.</span>
            </h1>

            <p>
              Stop wasting hours on manual logs. Automate your attendance, stay 100% MOHRE compliant, and recapture lost billable time with our enterprise-grade platform.
            </p>

            <div className="hero-cta-row">
              <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}><button className="hero-btn primary">Start Your 14-Day Free Trial</button></a>
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}><button className="hero-btn secondary">Book a Live Demo</button></a>
            </div>
            <p className="hero-trust-badge">
              Trusted by 500+ Companies across Dubai, Abu Dhabi, and the Northern Emirates.
            </p>
          </div>

          {/* RIGHT FEATURES */}
          <div className="curve right">
            <span>Leave Tracking</span>
            <span>Productivity Insights</span>
            <span>GPS Tracking</span>
            <span>Mobile Access</span>
            <span>Budget Tracking</span>
          </div>

        </div>

        {/* Hero product shot – 3D cross-platform (dashboard + phone) */}
        <div className="hero-product-shot">
          <img src="/images/time1.png" alt="NickName Time Sheet dashboard - attendance and timesheet view" className="mockup-dashboard" />
          <img src="/images/mob1.png" alt="NickName Time Sheet mobile app - clock in from phone" className="mockup-phone" />
        </div>
      </section>

      {/* Trust bar – UAE focus, monochrome logos */}
      <section className="trust-bar">
        <div className="trust-bar-inner">
          <p className="trust-uae">
            <span className="uae-flag" aria-hidden>🇦🇪</span>
            Designed for Dubai, Abu Dhabi & beyond.
          </p>
          <div className="trust-logos">
            <div className="trust-logo"><img src="/images/Logo.png" alt="Client" /></div>
          </div>
        </div>
      </section>

      {/* Problem / Solution – redesigned */}
      <section className="stats-dark">
        <div className="stats-container">
          <div className="stats-text">
            <p className="stats-label">Why switch</p>
            <h2>
              Tired of Chasing <span>Paper Timesheets?</span>
            </h2>
            <p className="stats-lead">
              Eliminate manual errors, meet WPS requirements, and control overtime—all from one platform.
            </p>

            <div className="stats-cards">
              <article className="stats-card-item">
                <div className="stats-card-icon yellow">
                  <span aria-hidden>✓</span>
                </div>
                <div className="stats-card-body">
                  <h3>Eliminate Human Error</h3>
                  <p>Say goodbye to manual entry mistakes that cost your business thousands in payroll.</p>
                </div>
              </article>
              <article className="stats-card-item">
                <div className="stats-card-icon blue">
                  <span aria-hidden>✓</span>
                </div>
                <div className="stats-card-body">
                  <h3>WPS & Labor Law Ready</h3>
                  <p>Generate reports that are perfectly formatted for UAE Wage Protection System (WPS) requirements.</p>
                </div>
              </article>
             
            </div>
            <article className="stats-card-item mt-3">
                <div className="stats-card-icon green">
                  <span aria-hidden>✓</span>
                </div>
                <div className="stats-card-body">
                  <h3>Real-Time Overtime Tracking</h3>
                  <p>See exactly who is working overtime instantly to manage your labor costs effectively.</p>
                </div>
              </article>
          </div>

          <div className="stats-image-wrapper">
            <div className="stats-image-frame">
              <img src="/images/time1.png" alt="Timesheet dashboard preview" />
            </div>
          </div>
        </div>
      </section>




      {/* STATS + TRUST END */}


      {/* {features section } */}

      <section className="why-dark" id="about">
        <div className="container why-grid">

          {/* LEFT IMAGE */}
          <div className="why-image">
            <img
              src="/images/time2.png"
              alt="Productivity Dashboard"
            />
          </div>

          {/* RIGHT CONTENT - Core Feature Grid (Value-Based) */}
          <div className="why-content">
            <h2>
              Built for the Way <span>You Work</span>
            </h2>

            <p className="subtitle">
              Every feature is designed to save time, reduce errors, and keep you compliant.
            </p>

            <ul className="why-list">
              <li>
                <span className="icon yellow">📊</span>
                <div>
                  <h4>Project Tracking</h4>
                  <p>
                    <strong>Maximize Profitability:</strong> Assign hours to specific projects and see exactly where your budget is going in real-time.
                  </p>
                </div>
              </li>

              <li>
                <span className="icon blue">🔐</span>
                <div>
                  <h4>Bio-Metric Sync</h4>
                  <p>
                    <strong>Prevent Buddy Punching:</strong> Seamlessly integrate with your office hardware or use GPS-fenced mobile clock-ins.
                  </p>
                </div>
              </li>

              <li>
                <span className="icon green">📋</span>
                <div>
                  <h4>Leave Management</h4>
                  <p>
                    <strong>Automated Workflows:</strong> Employees request leave via the app; managers approve in one click. No more emails.
                  </p>
                </div>
              </li>

              <li>
                <span className="icon red">🌐</span>
                <div>
                  <h4>Multilingual UI</h4>
                  <p>
                    <strong>Inclusive Design:</strong> Available in Arabic, English, Hindi, and Tagalog to support the UAE&apos;s diverse workforce.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>




      {/* {features section END} */}

      {/* {PERFECT FOR INDUSTRIES} */}

      <section className="industries-visual" id="industries">
        <div className="container">

          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="section-title">
              Designed for Businesses<span> Across Sectors</span>
            </h2>
            <p className="section-subtitle">
              Tailor every feature to fit your unique business needs and UAE compliance standards.
            </p>
          </div>

          {/* Grid */}
          <div className="industries-grid">

            <div className="industry-card">
              <img src="/images/track.webp" alt="Construction & Contracting" />
              <div className="overlay">
                <h5>Track Budget</h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/manage.webp" alt="Facility Management" />
              <div className="overlay">
                <h5>Manage Leave and Payroll</h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/monitor.png" alt="IT & Software Companies" />
              <div className="overlay">
                <h5>Monitor Project Milestone</h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/plan.png" alt="Consulting Firms" />
              <div className="overlay">
                <h5>Plan Projects</h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/gps.webp" alt="Logistics & Transportation" />
              <div className="overlay">
                <h5>GPS Tracking for field workers</h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/insight.webp" alt="Healthcare & Clinics" />
              <div className="overlay">
                <h5>Insights with dashboards and analytics </h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/multi.png" alt="Manufacturing" />
              <div className="overlay">
                <h5>Mutilingual </h5>
              </div>
            </div>

            <div className="industry-card">
              <img src="/images/analys.png" alt="Trading & Retail" />
              <div className="overlay">
                <h5>Analytics</h5>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* {PERFECT FOR INDUSTRIES END} */}


      {/* DASHBOARD UI CAROUSEL SECTION */}
      <section className="ui-carousel" id="product">
        <div className="container">

          <div className="ui-header">

            <h2>
              Seamless  <span>Control at Your Fingertips</span>
            </h2>
            <p>
              Take full control of your work with effortless navigation and smart tools.
            </p>
          </div>

          <div className="carousel-wrapper">
            <button className="nav prev">‹</button>

            <div className="carousel-track">

              <div className="ui-card">
                <img src="/images/dash1.png" alt="Dashboard UI 1" />
              </div>

              <div className="ui-card">
                <img src="/images/dash2.png" alt="Dashboard UI 2" />
              </div>

              <div className="ui-card">
                <img src="/images/dash3.png" alt="Dashboard UI 3" />
              </div>

              <div className="ui-card">
                <img src="/images/dash4.png" alt="Dashboard UI 4" />
              </div>

              <div className="ui-card">
                <img src="/images/dash5.png" alt="Dashboard UI 5" />
              </div>

            </div>

            <button className="nav next">›</button>
          </div>

        </div>
      </section>






      {/* { Mobile App for Employees & Managers} */}


      <section className="mobile-app-mass">
        <div className="container">

          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="mass-title">
              Hierarchy Made  <span>Simple and Transparent </span>
            </h2>
            <p className="mass-subtitle">
              Easily define roles, streamline workflows, track accountability, and keep everyone on the same page.
            </p>
          </div>

          <div className="mass-wrapper">

            {/* LEFT – EMPLOYEE */}
            <div className="mass-card employee">
              <h5>Multi-Role Management</h5>
              <ul>
                <li>Administrators</li>
                <li>Managers</li>
                <li>Team Leads</li>
                <li>Human Resources</li>
                <li>Employees</li>
              </ul>
            </div>

            {/* CENTER – SINGLE LARGE PHONE */}
            <div className="mass-phone">
              <img
                src="/images/mob1.png"
                alt="Role Management App"
                className="main-phone"
              />
            </div>



            {/* RIGHT – MANAGER */}
            <div className="mass-card manager">
              <h5>One-Word Action Style</h5>
              <ul>
                <li>Switch</li>
                <li>Clock-in/Clock-out</li>
                <li>Track</li>
                <li>Submit/Approve</li>
                <li>Report</li>
              </ul>
            </div>

          </div>

          {/* Background shapes */}
          <span className="mass-bg yellow"></span>
          <span className="mass-bg blue"></span>

        </div>
      </section>



      {/* Mobile App for Employees & Managers END */}

      {/* Security */}
      <section className="security-plexify" id="security">
        <div className="container">

          <div className="security-plexify-wrapper">

            {/* LEFT – CONTENT */}
            <div className="security-plexify-content">
              <h2>
                Enterprise-Grade Security <span>for Peace of Mind</span>
              </h2>

              <p>
                Your data and compliance are protected with local hosting, strict access controls, and full auditability.
              </p>

              <ul>
                <li><strong>Data Residency:</strong> Your data is stored on secure, local servers with 99.9% uptime.</li>
                <li><strong>Role-Based Access:</strong> Control exactly who sees what with customizable permission levels.</li>
                <li><strong>Audit Trails:</strong> Every entry is timestamped and logged for total transparency during audits.</li>
              </ul>



            </div>


            {/* RIGHT – VISUAL */}
            <div className="security-plexify-visual">
              <img
                src="/images/secure.png"
                alt="Security Dashboard"
                className="security-dashboard"
              />

              {/* Floating stats */}
              <div className="security-float yellow">
                <strong>99.9%</strong>
                <strong>Uptime</strong>
              </div>

              <div className="security-float blue">
                <strong>Encrypted</strong>
                <strong>Data </strong>
              </div>

              <div className="security-float green">
                <strong>UAE</strong>
                <strong>Complient </strong>
              </div>
            </div>

          </div>

          {/* GLOW SHAPES */}
          <span className="plex-glow yellow"></span>
          <span className="plex-glow blue"></span>

        </div>
      </section>

      {/* Security END */}


      {/* CTA SECTION */}

      <section className="trust-pro">

        <div className="cta-image">
          {/* <img src="/images/mobile-3.jpg" className="phone main" /> */}

        </div>
        <div className="container">



          {/* BIG STATEMENT */}
          <div className="trust-header">
            <h2>
              Trusted Across Industries <span> Worldwide</span>

            </h2>

            <p>
              Supporting companies worldwide with dependable technology, consistent performance, and solutions designed to scale with growing business needs.</p>          </div>




          {/* LOGO MARQUEE
          <div className="logo-marquee">
            <div className="logo-track">
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />

              repeat for smooth loop
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
              <img src="/images/Logo.png" />
            </div>
          </div> */}

          {/* TRUST METRICS */}
          <div className="trust-metrics">
            <div>
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Accuracy</span>
            </div>
            <div>
              <strong>99%</strong>
              <span>Automated</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Productivity</span>
            </div>
          </div>

        </div>
      </section>









      {/* CTA SECTION END */}


      {/* Language section */}

      <section className="language-pro dark">
        <div className="container">

          <div className="language-grid">

            {/* LEFT CONTENT */}
            <div className="language-content">
              <h2>

                Powering Teams Across Bor
                <span>ders through Multilingual Access</span>
              </h2>

              <p>
                Designed to help global teams communicate, collaborate, and perform efficiently in their preferred language — reducing barriers, improving adoption, and enhancing productivity across regions.
              </p>

              <ul className="lang-list">
                <li>English</li>
                <li>Arabic</li>
                <li>Tamil</li>
                <li>Hindi</li>
                <li>Urdu</li>
                {/* <li>Malayalam</li> */}
              </ul>
            </div>

            {/* RIGHT VISUAL */}
            <div className="language-visual">
              <div className="globe-glow"></div>

              <img
                src="/images/globe.png"
                alt="Global Language Support"
                className="globe-img"
              />

              <span className="lang-pill p1">English</span>
              <span className="lang-pill p2">العربية</span>
              <span className="lang-pill p3">தமிழ்</span>
              <span className="lang-pill p4">हिंदी</span>
              <span className="lang-pill p5">اردو</span>
              <span className="lang-pill p6">മലയാളം</span>
            </div>

          </div>
        </div>
      </section>





      {/* Language section END */}


      {/* ENQUIRY SECTION - Lead Capture */}
      <section className="enquiry-center" id="pricing">
        <div className="container">
          <div className="enquiry-head">
            <h2>
              Ready to <span>Modernize Your Operations?</span>
            </h2>
            <p>
              Fill out the form below and an expert will reach out within 2 hours.
            </p>
          </div>

          <div className="enquiry-form-box">
            <div className="enquiry-form-box-inner">
              <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
                <div className="field">
                  <input type="text" id="lead-name" name="lead-name" placeholder=" " required />
                  <label htmlFor="lead-name">Full Name</label>
                </div>
                <div className="field">
                  <input type="email" id="lead-email" name="lead-email" placeholder=" " required />
                  <label htmlFor="lead-email">Work Email (e.g. name@company.ae)</label>
                </div>
                <div className="field">
                  <input type="text" id="lead-company" name="lead-company" placeholder=" " />
                  <label htmlFor="lead-company">Company Name</label>
                </div>
                <div className="field">
                  <select id="lead-size" name="lead-size" defaultValue="">
                    <option value="">Select size</option>
                    <option>1–50</option>
                    <option>51–200</option>
                    <option>200+</option>
                  </select>
                  <label htmlFor="lead-size">Company Size</label>
                </div>
                <div className="field">
                  <input type="tel" id="lead-phone" name="lead-phone" placeholder=" " required />
                  <label htmlFor="lead-phone">Phone Number</label>
                </div>
                <button type="submit" className="submit-btn" disabled={submitStatus === "loading"}>
                  {submitStatus === "loading" ? "Sending…" : "Get My Free Setup Guide"}
                </button>
                {submitStatus === "success" && (
                  <p className="enquiry-form-message success">{submitMessage}</p>
                )}
                {submitStatus === "error" && (
                  <p className="enquiry-form-message error">{submitMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY SECTION  END*/}



      {/* {CTA strip} */}

      <section className="footer-cta-pro">
        <div className="footer-cta-box">
          <div className="cta-left">
            <h3>How to adopt this for my team?</h3>
            <p>Customize Nickname for your team.</p>
          </div>
          <div className="cta-right">
            <a href="#" className="cta-btn primary">
              Get Started →
            </a>
            <a href="#" className="cta-btn outline">
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* {CTA strip END} */}







      {/* FOOTER */}
      <footer className="footer-dark">
        <div className="container">

          {/* Quick Trust Badges */}
          <div className="footer-quick-trust">
            <div className="trust-badge">
              <span className="trust-icon">✓</span>
              <span>MOHRE Compliance Badge</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">✓</span>
              <span>24/7 Local Support (UAE Timezone)</span>
            </div>
          </div>

          <div className="footer-grid">

            {/* COLUMN 1 – BRAND */}
            <div className="footer-brand">
              <h3 className="footer-logo">
                NickName <span>InfoTech</span>
              </h3>
              <p>
                Smart workforce management platform built for productivity,
                transparency, and enterprise-level security.
              </p>

              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-x-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            {/* COLUMN 2 – PRODUCT */}
            <div>
              <h5>Product</h5>
              <ul>
                <li><a href="#">Time Tracking</a></li>
                <li><a href="#">Project Management</a></li>
                <li><a href="#">Payroll Reports</a></li>
                <li><a href="#">Mobile App</a></li>
              </ul>
            </div>

            {/* COLUMN 3 – COMPANY */}
            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* COLUMN 4 – NEWSLETTER */}
            <div>
              <h5>Stay Updated</h5>
              <p>Subscribe for updates & product news.</p>
              <div className="newsletter">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>

          </div>
          {/* CERTIFICATIONS */}


          <div className="footer-bottom">
            <p>© 2026 NickName InfoTech. All rights reserved.</p>
          </div>

          {/* Glow Effects */}
          <span className="footer-glow blue"></span>
          <span className="footer-glow green"></span>

        </div>
      </footer>

      </main>











    </>

  );
}
