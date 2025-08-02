'use client'

import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6">
            <Link 
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:prashantmishra9873@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>prashantmishra9873@gmail.com</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Print-on-Demand Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 