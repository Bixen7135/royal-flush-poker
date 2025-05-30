import React from 'react';
import Navbar from './Navbar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  fullWidth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false,
  fullWidth = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Navbar />
      
      {title && (
        <div className="bg-gray-900 border-b border-gray-800">
          <div className={`container mx-auto px-4 py-4 ${fullWidth ? 'max-w-none' : 'max-w-7xl'}`}>
            <div className="flex items-center">
              {showBackButton && (
                <button 
                  onClick={() => navigate(-1)}
                  className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-400" />
                </button>
              )}
              <h1 className="text-2xl font-serif text-gradient">{title}</h1>
            </div>
          </div>
        </div>
      )}
      
      <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto max-w-7xl px-4 py-6'}`}>
        {children}
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-serif text-gradient">Royal Flush Poker Lounge</h2>
              <p className="text-gray-400 text-sm mt-1">The ultimate premium poker experience</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Royal Flush Poker Lounge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;