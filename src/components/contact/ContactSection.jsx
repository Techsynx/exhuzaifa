import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactData } from "../../data/portfolioData";
import "../../styles/contact.css";

gsap.registerPlugin(ScrollTrigger);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const headlineEmRef = useRef(null);
  const cardRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const textareaRef = useRef(null);
  const successTimerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: contactData.topics[0],
    message: "",
  });
  const [botChecked, setBotChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // --- Textarea auto-resize ---
  const handleMessageChange = (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, message: val }));
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 260)}px`;
    }
    if (touched.message) validateField("message", val);
  };

  // --- Field validation ---
  const validateField = (field, value) => {
    let err = "";
    if (field === "name") {
      if (!value.trim()) err = "Name is required";
    } else if (field === "email") {
      if (!value.trim()) err = "Email is required";
      else if (!EMAIL_RE.test(value.trim())) err = "Please enter a valid email address";
    } else if (field === "message") {
      if (!value.trim()) err = "Message is required";
      else if (value.trim().length < 10) err = "Message must be at least 10 characters";
    }
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
    return !err;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
    if (touched[field]) validateField(field, value);
  };

  // --- Chip keyboard navigation ---
  const handleChipKeyDown = (e, idx) => {
    const total = contactData.topics.length;
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (idx + 1) % total;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (idx - 1 + total) % total;
    }
    if (next !== idx) {
      setForm((prev) => ({ ...prev, topic: contactData.topics[next] }));
      const chip = document.getElementById(`topic-chip-${next}`);
      chip?.focus();
    }
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setTouched({ name: true, email: true, message: true });
    const nameOk = validateField("name", form.name);
    const emailOk = validateField("email", form.email);
    const messageOk = validateField("message", form.message);

    if (!nameOk || !emailOk || !messageOk) {
      if (!nameOk) nameInputRef.current?.focus();
      else if (!emailOk) emailInputRef.current?.focus();
      else textareaRef.current?.focus();
      return;
    }

    // Honeypot: silently "succeed" to fool bots
    if (botChecked) {
      console.warn("[ContactForm] Bot detected via honeypot.");
      setStatus("success");
      setForm({ name: "", email: "", topic: contactData.topics[0], message: "" });
      setBotChecked(false);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 3000);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const subjectText = `Portfolio Message: ${form.topic} (from ${form.name.trim()})`;
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(
      `Hi Huzaifa,\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nTopic: ${form.topic}\n\nMessage:\n${form.message.trim()}\n`
    );
    const mailtoUrl = `mailto:exhuzaifa@gmail.com?subject=${subject}&body=${body}`;

    try {
      let ok = false;

      // Primary submission via verified Web3Forms access key (delivers directly to exhuzaifa@gmail.com)
      try {
        const formData = new FormData();
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "17b7edb6-d0af-461f-b19f-d59407576076");
        formData.append("name", form.name.trim());
        formData.append("email", form.email.trim());
        formData.append("topic", form.topic);
        formData.append("subject", subjectText);
        formData.append("message", form.message.trim());
        formData.append("from_name", `${form.name.trim()} (Portfolio)`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          ok = true;
        } else {
          console.warn("[ContactForm] Web3Forms response:", data);
        }
      } catch (e) {
        console.warn("[ContactForm] Web3Forms delivery attempt failed:", e);
      }

      if (ok) {
        setStatus("success");
        setForm({ name: "", email: "", topic: contactData.topics[0], message: "" });
        setBotChecked(false);
        setTouched({});
        setErrors({});
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        if (successTimerRef.current) clearTimeout(successTimerRef.current);
        successTimerRef.current = setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 6000);
      } else {
        // Fallback: automatically launch the pre-filled mail client so message is never lost
        window.location.href = mailtoUrl;
        setStatus("fallback");
      }
    } catch (err) {
      console.error("[ContactForm] Error, launching fallback:", err);
      window.location.href = mailtoUrl;
      setStatus("fallback");
    }
  };

  // --- GSAP animations ---
  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const leftChildren = leftColRef.current?.children ? Array.from(leftColRef.current.children) : [];
    const targets = [...leftChildren, rightColRef.current].filter(Boolean);

    const tl = gsap.from(targets, {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
      onComplete: () => {
        headlineEmRef.current?.classList.add("shimmer-active");
      },
    });

    const card = cardRef.current;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let onMove = null;
    let onLeave = null;

    if (card && !isTouch) {
      onMove = (e) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const rx = (dx / (r.width / 2)) * 6;
        const ry = (dy / (r.height / 2)) * 6;
        gsap.to(card, { x: rx, y: ry, duration: 0.3, ease: "power2.out" });
      };
      onLeave = () => {
        gsap.to(card, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    }

    return () => {
      tl?.kill();
      if (card && onMove) {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      }
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const currentMailtoUrl = `mailto:exhuzaifa@gmail.com?subject=${encodeURIComponent(
    `Portfolio Message: ${form.topic} (from ${form.name.trim() || "Visitor"})`
  )}&body=${encodeURIComponent(
    `Hi Huzaifa,\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nTopic: ${form.topic}\n\nMessage:\n${form.message.trim()}\n`
  )}`;

  const currentWhatsappUrl = `https://wa.me/923268282409?text=${encodeURIComponent(
    `Hi Huzaifa, I am ${form.name.trim() || "Visitor"}${form.email.trim() ? ` (${form.email.trim()})` : ""}. Regarding ${form.topic}:\n${form.message.trim()}`
  )}`;

  return (
    <section id="contact" className="contact-section-wrapper" ref={sectionRef}>
      <div className="contact-bg-glow" aria-hidden="true" />
      <div className="contact-dust-dot dust-1" aria-hidden="true" />
      <div className="contact-dust-dot dust-2" aria-hidden="true" />
      <div className="contact-dust-dot dust-3" aria-hidden="true" />
      <div className="contact-dust-dot dust-4" aria-hidden="true" />

      <div className="contact-container">
        {/* LEFT COLUMN: Info */}
        <div className="contact-left-col" ref={leftColRef}>
          <div className="contact-label-row">
            <span className="contact-label-dash">-</span>
            <span className="contact-label-text">{contactData.label}</span>
          </div>

          <h2 className="contact-headline">
            Let&apos;s build something{" "}
            <em ref={headlineEmRef}>remarkable</em>.
          </h2>

          <p className="contact-bio-paragraph">{contactData.bio}</p>

          <div className="contact-info-list" role="list">
            {/* Email */}
            <a
              href={`mailto:${contactData.email}`}
              className="contact-info-row"
              role="listitem"
              aria-label={`Send email to ${contactData.emailDisplay}`}
            >
              <div className="contact-info-left">
                <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div className="contact-info-text">
                  <span className="contact-info-label">Email</span>
                  <span className="contact-info-val">{contactData.emailDisplay}</span>
                </div>
              </div>
              <svg className="contact-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contactData.phone.replace(/[^\d+]/g, "")}`}
              className="contact-info-row"
              role="listitem"
              aria-label={`Call ${contactData.phoneDisplay}`}
            >
              <div className="contact-info-left">
                <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="contact-info-text">
                  <span className="contact-info-label">Phone</span>
                  <span className="contact-info-val">{contactData.phoneDisplay}</span>
                </div>
              </div>
              <svg className="contact-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Location */}
            <div className="contact-info-row" role="listitem">
              <div className="contact-info-left">
                <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="contact-info-text">
                  <span className="contact-info-label">Location</span>
                  <span className="contact-info-val">{contactData.location}</span>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-row"
              role="listitem"
              aria-label="Visit GitHub Profile"
            >
              <div className="contact-info-left">
                <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <div className="contact-info-text">
                  <span className="contact-info-label">GitHub</span>
                  <span className="contact-info-val">{contactData.githubDisplay}</span>
                </div>
              </div>
              <svg className="contact-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-row"
              role="listitem"
              aria-label="Visit LinkedIn Profile"
            >
              <div className="contact-info-left">
                <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <div className="contact-info-text">
                  <span className="contact-info-label">LinkedIn</span>
                  <span className="contact-info-val">{contactData.linkedinDisplay}</span>
                </div>
              </div>
              <svg className="contact-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Dotted bridge line */}
        <div className="contact-dotted-bridge" aria-hidden="true">
          <svg className="contact-curved-svg-line" viewBox="0 0 140 120" fill="none">
            <path className="contact-bridge-path" d="M 10,20 C 60,10 80,100 130,90" />
          </svg>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="contact-right-col" ref={rightColRef}>
          <div className="contact-glass-card" ref={cardRef}>
            <div className="contact-card-header">
              <span className="contact-card-mono">/ 05</span>
              <span className="contact-card-line" aria-hidden="true" />
            </div>

            {/* Screen-reader live region */}
            <div aria-live="polite" className="visually-hidden-field">
              {status === "sending" && "Sending..."}
              {status === "success" && "Message sent"}
              {status === "error" && (errorMsg || "Something went wrong. Please try again, or email me directly.")}
            </div>

            <form name="contact" onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="visually-hidden-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={botChecked}
                onChange={(e) => setBotChecked(e.target.checked)}
                style={{ display: "none" }}
              />

              {/* Name */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Your Name *</label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`form-input ${errors.name && touched.name ? "input-error" : ""}`}
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                  disabled={status === "sending"}
                />
                {errors.name && touched.name && (
                  <span id="name-error" className="field-error-msg" role="alert">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address *</label>
                <input
                  ref={emailInputRef}
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`form-input ${errors.email && touched.email ? "input-error" : ""}`}
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  disabled={status === "sending"}
                />
                {errors.email && touched.email && (
                  <span id="email-error" className="field-error-msg" role="alert">{errors.email}</span>
                )}
              </div>

              {/* Topic Chips */}
              <div className="form-group">
                <span className="chips-group-label">What do you need?</span>
                <div className="chips-row" role="radiogroup" aria-label="Topic selection">
                  {contactData.topics.map((topic, i) => (
                    <button
                      key={topic}
                      id={`topic-chip-${i}`}
                      type="button"
                      role="radio"
                      aria-checked={form.topic === topic}
                      tabIndex={form.topic === topic ? 0 : -1}
                      className={`chip-btn${form.topic === topic ? " chip-active chip-selected" : ""}`}
                      onClick={() => handleChange("topic", topic)}
                      onKeyDown={(e) => handleChipKeyDown(e, i)}
                      disabled={status === "sending"}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message *</label>
                <textarea
                  ref={textareaRef}
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleMessageChange}
                  onBlur={() => handleBlur("message")}
                  className={`form-textarea ${errors.message && touched.message ? "input-error" : ""}`}
                  aria-invalid={errors.message && touched.message ? "true" : "false"}
                  aria-describedby={errors.message && touched.message ? "message-error" : "char-counter"}
                  disabled={status === "sending"}
                />
                <span id="char-counter" className="char-counter">
                  {form.message.trim().length} chars (min 10)
                </span>
                {errors.message && touched.message && (
                  <span id="message-error" className="field-error-msg" role="alert">{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              <div className="contact-submit-wrap">
                <button
                  type="submit"
                  className={`btn-pill-submit contact-submit-btn${status === "sending" ? " is-sending" : ""}${status === "success" ? " is-success" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : status === "success" ? "Message sent" : "Send message"}
                  <span className="submit-arrow-badge submit-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
                {status === "success" && (
                  <div
                    className="contact-success-box"
                    role="status"
                    style={{
                      marginTop: "1rem",
                      padding: "0.85rem 1.25rem",
                      background: "rgba(34, 197, 94, 0.12)",
                      border: "1px solid rgba(34, 197, 94, 0.35)",
                      borderRadius: "14px",
                      color: "#4ade80",
                      fontSize: "0.92rem",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span>✓</span>
                    <span>Message delivered directly to Huzaifa! I&apos;ll get back to you shortly.</span>
                  </div>
                )}
                {status === "fallback" && (
                  <div className="contact-fallback-box" role="status">
                    <p className="contact-fallback-title">
                      Launching your email app to send directly to <strong>exhuzaifa@gmail.com</strong>...
                    </p>
                    <div className="contact-fallback-actions">
                      <a href={currentMailtoUrl} className="btn-pill-mail">
                        ✉ Open in Email App
                      </a>
                      <a href={currentWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-pill-wa">
                        💬 Send via WhatsApp
                      </a>
                    </div>
                  </div>
                )}
                {status === "error" && (
                  <p className="contact-submit-error" role="alert" aria-live="polite">
                    {errorMsg || "Something went wrong. Please try again, or email me directly."}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
