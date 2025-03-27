import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, BarChart, BookOpen, Calculator, Users, LogIn, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const getNavItems = (isAuthenticated: boolean) => {
  const publicItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/community', label: 'Community', icon: Users },
  ];
  
  const privateItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/calculator', label: 'Calculator', icon: Calculator },
  ];

  return isAuthenticated 
    ? [...publicItems, ...privateItems]
    : publicItems;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = getNavItems(!!user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 glassmorphism" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="/nature.png" alt="" height={30} width={30} />
            <span className="font-semibold text-lg tracking-tight">EcoTrack</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => cn(
                  "nav-link flex items-center gap-1.5",
                  isActive ? "active" : ""
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Hello, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 glassmorphism py-4 md:hidden animate-fade-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 py-2 px-4 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
            
            {/* Mobile Auth Buttons */}
            {user ? (
              <div className="border-t border-border mt-4 pt-4">
                <div className="px-4 py-2 text-sm text-muted-foreground mb-2">
                  Logged in as {user.name}
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 px-4 w-full rounded-lg text-left hover:bg-secondary text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 border-t border-border mt-4 pt-4">
                <Link 
                  to="/login"
                  className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-secondary"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <User className="w-5 h-5" />
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;