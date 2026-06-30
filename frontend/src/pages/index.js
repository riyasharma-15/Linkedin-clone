import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>ProConnect | Professional Networking Platform</title>
        <meta
          name="description"
          content="Welcome to ProConnect, your professional community. Connect with colleagues, search for jobs, post updates, and build a premium network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <span>Pro</span>
            <span style={{ color: "var(--color-accent)" }}>Connect</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/discover" className={styles.navLink}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M23 16v-2h-3v-3h-2v3h-3v2h3v3h2v-3h3zm-9.3 2H2V6h18v4.1c1-.1 2 .1 3 .6V5c0-1.1-.9-2-2-2H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h11.7c-.5-.9-.7-2-.7-3zM2 8h18v3H2V8zm0 5h10v3H2v-3z" fill="currentColor"></path>
              </svg>
              <span>Discover</span>
            </Link>
            <Link href="/network" className={styles.navLink}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"></path>
              </svg>
              <span>Network</span>
            </Link>
            <Link href="/jobs" className={styles.navLink}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="currentColor"></path>
              </svg>
              <span>Jobs</span>
            </Link>
            <div className={styles.navDivider}></div>
            <div className={styles.navActions}>
              <Link href="/register" className={styles.btnJoin}>Create Account</Link>
              <Link href="/login" className={styles.btnSignIn}>Sign in</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTagline}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
              </svg>
              <span>Connect with professionals worldwide</span>
            </div>

            <h1 className={styles.heroTitle}>
              Build Your Professional Network.<br />
              <span className={styles.heroTitleAccent}>Connect, Collaborate, and Grow.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Discover jobs, make meaningful connections, upload your resume, and stay updated with your professional circle.
            </p>

            <div className={styles.heroCtas}>
              <div className={styles.heroButtons}>
                <Link href="/register" className={styles.btnPrimary}>
                  Join Now
                </Link>
                <Link href="/login" className={styles.btnSecondary}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Visual Presentation Area */}
          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <svg viewBox="0 0 500 500" width="100%" height="100%" aria-hidden="true" style={{ background: 'transparent' }}>
                <defs>
                  <linearGradient id="illustrationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary-subtle)" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.06" />
                  </filter>
                </defs>
                <rect width="500" height="500" rx="20" fill="url(#illustrationGrad)" />
                {/* Central connection graphic */}
                <circle cx="250" cy="250" r="10" fill="var(--color-primary)" />
                <circle cx="250" cy="250" r="60" fill="none" stroke="var(--color-primary-light)" strokeWidth="1" strokeDasharray="5,5" />
                <circle cx="250" cy="250" r="120" fill="none" stroke="var(--color-primary-light)" strokeWidth="1" strokeDasharray="10,10" />

                {/* Connected nodes */}
                <line x1="250" y1="250" x2="150" y2="180" stroke="var(--color-primary)" strokeWidth="1.5" />
                <line x1="250" y1="250" x2="350" y2="210" stroke="var(--color-primary)" strokeWidth="1.5" />
                <line x1="250" y1="250" x2="280" y2="360" stroke="var(--color-primary)" strokeWidth="1.5" />

                <circle cx="150" cy="180" r="8" fill="var(--color-accent)" />
                <circle cx="350" cy="210" r="8" fill="var(--color-primary)" />
                <circle cx="280" cy="360" r="8" fill="var(--color-primary)" />
              </svg>
            </div>

            {/* Floating Card 1 */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingCardContent}>
                <div className={styles.floatingAvatar} style={{ backgroundColor: 'var(--color-primary)' }}>
                  SW
                </div>
                <div className={styles.floatingCardText}>
                  <span className={styles.floatingCardTitle}>Sarah Wilson</span>
                  <span className={styles.floatingCardSub}>Frontend Engineer</span>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingCardContent}>
                <div className={styles.floatingAvatar} style={{ backgroundColor: 'var(--color-accent)' }}>
                  RS
                </div>
                <div className={styles.floatingCardText}>
                  <span className={styles.floatingCardTitle}>Rahul Sharma</span>
                  <span className={styles.floatingCardSub}>Backend Developer</span>
                </div>
              </div>
            </div>

            {/* Floating Card 3 */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingCardContent}>
                <div className={styles.floatingAvatar} style={{ backgroundColor: '#e7a33e' }}>
                  EJ
                </div>
                <div className={styles.floatingCardText}>
                  <span className={styles.floatingCardTitle}>Emily Johnson</span>
                  <span className={styles.floatingCardSub}>UI/UX Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Registered Users</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5K+</div>
              <div className={styles.statLabel}>Professional Connections</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1K+</div>
              <div className={styles.statLabel}>Job Listings</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Hiring Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Explore Section */}
      <section className={styles.exploreSection}>
        <div className={styles.exploreContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Why Choose ProConnect?</span>
            <h2 className={styles.sectionTitle}>Everything You Need to Grow Your Career</h2>
            <p className={styles.sectionSubtitle}>
              Explore our range of features designed to kickstart your career and expand your outreach.
            </p>
          </div>

          <div className={styles.exploreGrid}>
            {/* Feature 1 */}
            <div className={styles.exploreCard}>
              <div className={styles.exploreCardIcon} style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3 className={styles.exploreCardTitle}>Find Jobs</h3>
              <p className={styles.exploreCardDesc}>
                Connect with recruiters, search thousands of job listings, and get referral opportunities from your network.
              </p>
              <Link href="/jobs" className={styles.exploreCardLink}>
                Explore Jobs
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className={styles.exploreCard}>
              <div className={styles.exploreCardIcon} style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <h3 className={styles.exploreCardTitle}>Build Profile & PDF</h3>
              <p className={styles.exploreCardDesc}>
                Showcase your skills, update your work history, and instantly compile your profile into a professional PDF resume.
              </p>
              <Link href="/register" className={styles.exploreCardLink}>
                Create Profile
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className={styles.exploreCard}>
              <div className={styles.exploreCardIcon} style={{ backgroundColor: '#fff3cd', color: '#e7a33e' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
              </div>
              <h3 className={styles.exploreCardTitle}>Post & Engage</h3>
              <p className={styles.exploreCardDesc}>
                Share updates, discuss industry topics with post media, comment on colleagues' feed, and leave likes.
              </p>
              <Link href="/login" className={styles.exploreCardLink}>
                Join Discussion
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connect/Network Section */}
      <section className={styles.connectSection}>
        <div className={styles.connectContainer}>
          <div className={styles.connectContent}>
            <h2 className={styles.connectTitle}>Build Meaningful Professional Connections</h2>
            <p className={styles.connectDesc}>
              Building your professional community is the single best way to unlock new doors, discover opportunities, and share knowledge.
            </p>
            <div className={styles.connectFeatures}>
              <div className={styles.connectFeature}>
                <div className={styles.connectFeatureIcon} style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 8 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                </div>
                <div className={styles.connectFeatureText}>
                  <h4>Expand Your Reach</h4>
                  <p>Send and accept connection requests with people in similar fields or local industries.</p>
                </div>
              </div>

              <div className={styles.connectFeature}>
                <div className={styles.connectFeatureIcon} style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
                </div>
                <div className={styles.connectFeatureText}>
                  <h4>Discuss Topics</h4>
                  <p>Comment on posts and exchange feedback with professionals around the globe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.connectVisual}>
            <div className={styles.networkGraph}>
              <div className={`${styles.networkNode} ${styles.networkNodeCenter}`} style={{ backgroundColor: 'var(--color-primary)', left: 'calc(50% - 40px)', top: 'calc(50% - 40px)' }}>
                You
              </div>
              <div className={styles.networkNode} style={{ backgroundColor: 'var(--color-accent)', left: '10%', top: '20%' }}>
                Tech
              </div>
              <div className={styles.networkNode} style={{ backgroundColor: '#e7a33e', right: '15%', top: '15%' }}>
                HR
              </div>
              <div className={styles.networkNode} style={{ backgroundColor: '#cc1016', left: '20%', bottom: '15%' }}>
                Dev
              </div>
              <div className={styles.networkNode} style={{ backgroundColor: '#8f8f8f', right: '10%', bottom: '20%' }}>
                Design
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to grow your professional network?</h2>
          <p className={styles.ctaDesc}>Join thousands of professionals already using ProConnect.</p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.btnCtaPrimary}>
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <span>Pro</span>
                <span style={{ color: "var(--color-accent)" }}>Connect</span>
              </Link>
              <p className={styles.footerBrandDesc}>
                ProConnect is a premium professional community platform designed to connect people, foster collaboration, and accelerate career growth.
              </p>
              <div className={styles.footerSocials}>
                <Link href="#" className={styles.footerSocialLink} aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                </Link>
                <Link href="#" className={styles.footerSocialLink} aria-label="Twitter">
                  <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.3 1.83l-.97-.05A12.06 12.06 0 0 0 8 21c7.22 0 11.16-6 11.16-11.16 0-.17 0-.34-.01-.5A8.09 8.09 0 0 0 22.46 6z" /></svg>
                </Link>
                <Link href="#" className={styles.footerSocialLink} aria-label="GitHub">
                  <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                </Link>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>General</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Browse</h4>
              <ul>
                <li><Link href="/jobs">Jobs</Link></li>
                <li><Link href="/salary">Salary</Link></li>
                <li><Link href="/mobile">Mobile App</Link></li>
                <li><Link href="/services">Services</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Solutions</h4>
              <ul>
                <li><Link href="/talent">Talent Solutions</Link></li>
                <li><Link href="/marketing">Marketing</Link></li>
                <li><Link href="/sales">Sales Solutions</Link></li>
                <li><Link href="/learning">Learning</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <ul>
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/privacy-terms">Privacy & Terms</Link></li>
                <li><Link href="/safety">Trust & Safety</Link></li>
                <li><Link href="/contact">Contact Support</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.footerCopyright}>
              &copy; {new Date().getFullYear()} ProConnect. All rights reserved.
            </span>
            <div className={styles.footerBottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">User Agreement</Link>
              <Link href="/cookies">Cookie Policy</Link>
              <Link href="/copyright">Copyright Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}