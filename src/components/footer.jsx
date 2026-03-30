import facebookIcon from "../assets/facebook.png";
import xIcon from "../assets/x2.png";
import appStoreBadge from "../assets/Rectangle 4 (1).png";
import googlePlayBadge from "../assets/Rectangle 5.png";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Company Section */}
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Press</a></li>
              <li><a href="/">Blog</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="footer-section">
            <h3>Need Help</h3>
            <ul>
              <li><a href="/">Visit Help Center</a></li>
              <li><a href="/">Share Feedback</a></li>
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">Account</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="/">Terms of Use</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Cookie Preferences</a></li>
              <li><a href="/">Corporate Information</a></li>
            </ul>
          </div>

          {/* Language Section */}
          <div className="footer-section">
            <h3>View Website in</h3>
            <div className="language-selector">
              <button className="language-btn">
                <span>✓</span> English
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="/" className="social-link" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="/" className="social-link" aria-label="X (Twitter)">
                <img src={xIcon} alt="X" />
              </a>
            </div>
          </div>

          {/* Download App Section */}
          <div className="footer-section">
            <h3>Download Our App</h3>
            <div className="app-badges">
              <a href="/" className="app-badge">
                <img src={appStoreBadge} alt="Download on App Store" />
              </a>
              <a href="/" className="app-badge">
                <img src={googlePlayBadge} alt="Get it on Google Play" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <div className="footer-logo">
              <a href="/">
                STREAM<span>X</span>
              </a>
            </div>
            <p className="copyright">© 2024 STREAMX. All Rights Reserved.</p>
            <div className="footer-links">
              <a href="/">Terms of Use</a>
              <a href="/">Privacy Policy</a>
              <a href="/">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
