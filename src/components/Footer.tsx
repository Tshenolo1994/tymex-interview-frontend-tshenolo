import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Theme {
  surface: string;
  text: string;
  border: string;
  buttonText: string;
  gradient: string;
}

const Footer = () => {
  const [email, setEmail] = useState<string>('');
  const { theme } = useTheme() as { theme: Theme };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: theme.surface,
        color: theme.text,
        borderTop: `1px solid ${theme.border}`,
      }}
      className="py-12 px-6"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-6">NAVIGATION</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4">
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Home
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  About us
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Our teams
                </a>
              </div>

              <div className="space-y-4">
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Whitepaper
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Roadmap
                </a>
              </div>
              <div className="space-y-4">
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  FAQs
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  News
                </a>
                <a
                  href="#"
                  style={{ color: theme.text }}
                  className="block hover:opacity-80 transition"
                >
                  Community
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-6">CONTACT US</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} color={theme.text} />
                <span style={{ color: theme.text }}>01234568910</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} color={theme.text} />
                <span style={{ color: theme.text }}>tymex-talent@tyme.com</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-6">SUBSCRIBE TO RECEIVE OUR LATEST UPDATE</h2>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: 'transparent',
                  color: theme.text,
                  borderColor: theme.border,
                }}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  style={{
                    background: theme.gradient,
                    color: theme.buttonText,
                  }}
                  className="rounded px-6 py-3 font-medium hover:opacity-90 transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: theme.border }}
        >
          <p style={{ color: theme.text }}>©2023 Tyme - Edit. All Rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#security"
              style={{ color: theme.text }}
              className="hover:opacity-80 transition"
            >
              Security
            </a>
            <a href="#legal" style={{ color: theme.text }} className="hover:opacity-80 transition">
              Legal
            </a>
            <a
              href="#privacy"
              style={{ color: theme.text }}
              className="hover:opacity-80 transition"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;