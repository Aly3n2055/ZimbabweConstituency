import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { KuwadzanaWestLogo, ZimbabweFlag, ZanupfLogo } from "@/components/ui/icons";
import {
  Menu,
  X,
  User,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#",
    subItems: [
      { label: "Overview", href: "/about" },
      { label: "History", href: "/about/history" },
      { label: "Mission & Vision", href: "/about/mission" },
    ],
  },
  { label: "News & Updates", href: "/news" },
  { label: "Development Projects", href: "/projects" },
  { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary">
        <div className="container mx-auto flex justify-between items-center py-1 px-4 text-white text-sm">
          <div>
            <span className="hidden md:inline mr-4">Follow us:</span>
            <a
              href="#"
              className="mx-1 hover:text-secondary"
              aria-label="Facebook"
            >
              <Facebook size={16} className="inline" />
            </a>
            <a
              href="#"
              className="mx-1 hover:text-secondary"
              aria-label="Twitter"
            >
              <Twitter size={16} className="inline" />
            </a>
            <a
              href="#"
              className="mx-1 hover:text-secondary"
              aria-label="Instagram"
            >
              <Instagram size={16} className="inline" />
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="mailto:contact@kuwadzanawest.gov.zw"
              className="mr-4 hover:text-secondary flex items-center"
            >
              <Mail size={16} className="mr-1" />
              <span className="hidden md:inline">contact@kuwadzanawest.gov.zw</span>
            </a>
            <a
              href="tel:+263242123456"
              className="hover:text-secondary flex items-center"
            >
              <Phone size={16} className="mr-1" />
              <span className="hidden md:inline">+263 242 123 456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-4">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="flex items-center">
              <ZanupfLogo className="h-10 w-10 mr-2" />
              <KuwadzanaWestLogo className="h-12 w-12 mr-3" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-gray-900">
                Kuwadzana West
              </h1>
              <p className="text-xs text-gray-600">Constituency Official Website</p>
            </div>
          </div>
          <div className="flex items-center">
            <ZimbabweFlag className="h-6 w-10 mr-3" />
            <Link href="/auth">
              <Button
                className="bg-[#008751] hover:bg-[#006B40] text-white"
              >
                <User className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#006B40] text-white">
        <div className="container mx-auto px-4">
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-4 focus:outline-none w-full text-left flex justify-between items-center"
              aria-label="Toggle navigation menu"
            >
              <span>Menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <ul
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row`}
          >
            {navItems.map((item, index) => (
              <li key={index} className="group relative">
                {item.subItems ? (
                  <>
                    <button className="flex items-center w-full py-3 px-4 text-white hover:bg-[#008751] hover:text-white">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <ul className="hidden group-hover:block absolute bg-[#006B40] z-10 w-48 shadow-lg border border-[#008751]/20">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                                  <Link 
                            href={subItem.href} 
                            className="block py-2 px-4 text-white hover:bg-[#008751]"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className={`block py-3 px-4 text-white hover:bg-[#008751] hover:text-white ${
                      isActive(item.href) ? "bg-[#008751]" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
