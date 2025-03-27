
import React from "react";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A1F2C] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary rounded-md p-2 mr-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Refill</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Simplifying medication refill notifications for pharmacies and patients.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">HIPAA Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">635 USC McCarthy Way<br />Los Angeles, CA 90089</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="tel:+14246260387" className="text-gray-300 hover:text-white transition-colors">(424) 626-0387</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="mailto:sumerhir@usc.edu" className="text-gray-300 hover:text-white transition-colors">sumerhir@usc.edu</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Refill. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center justify-center md:justify-end mt-2 md:mt-0">
            Made with <Heart className="h-3 w-3 mx-1 text-destructive" /> in California
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
