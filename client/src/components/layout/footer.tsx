import { Link } from "wouter";
import { KuwadzanaWestLogo } from "@/components/ui/icons";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">About Kuwadzana West</h3>
            <p className="text-gray-400 mb-4">
              The official website of Kuwadzana West Constituency, providing transparent information, 
              community updates, and engagement opportunities for all residents.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white">
                  Development Projects
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-gray-400 hover:text-white">
                  Leadership Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-white">
                  Community Engagement
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Government Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Constituency Reports</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Public Documents</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Funding Opportunities</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Emergency Contacts</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary" size={18} />
                <span className="text-gray-400">
                  Kuwadzana West Constituency Office, Main Road, Harare, Zimbabwe
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary" size={18} />
                <span className="text-gray-400">+263 242 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary" size={18} />
                <span className="text-gray-400">contact@kuwadzanawest.gov.zw</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-3 text-primary" size={18} />
                <span className="text-gray-400">Mon - Fri: 8:00 AM - 4:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Kuwadzana West Constituency. All rights reserved.
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                <a href="#" className="hover:text-white">Privacy Policy</a> | 
                <a href="#" className="hover:text-white"> Terms of Service</a> | 
                <a href="#" className="hover:text-white"> Accessibility</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
