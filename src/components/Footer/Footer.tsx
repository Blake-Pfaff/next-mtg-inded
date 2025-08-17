"use client";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-4 py-4">
        <div className="flex flex-col items-center space-y-2">
          {/* API Attribution */}
          <div className="text-center">
            <p className="text-sm text-text-muted">
              Powered by{" "}
              <a
                href="https://docs.magicthegathering.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Magic: The Gathering API
              </a>
            </p>
          </div>

          {/* Developer Info */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-text-secondary">
              Built by{" "}
              <span className="font-semibold text-text-primary">
                Blake Pfaff
              </span>
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/blake-a-pfaff/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-muted hover:text-primary-600 transition-colors"
                aria-label="Blake Pfaff on LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>

              <span className="text-text-subtle">•</span>

              <a
                href="https://github.com/Blake-Pfaff"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-muted hover:text-primary-600 transition-colors"
                aria-label="Blake Pfaff on GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-text-subtle">
              © {new Date().getFullYear()} Blake Pfaff. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
