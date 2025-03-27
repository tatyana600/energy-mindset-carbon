
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-12 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-energy-blue to-energy-teal flex items-center justify-center text-white font-semibold text-sm">EM</div>
              <span className="font-semibold text-lg tracking-tight">Ecotrack</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering individuals to monitor, reduce, and take control of their energy consumption.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
              <li><Link to="/calculator" className="text-muted-foreground hover:text-foreground transition-colors">Calculator</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Articles</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Videos</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Webinars</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Energy Saving Tips</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Ecotrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
