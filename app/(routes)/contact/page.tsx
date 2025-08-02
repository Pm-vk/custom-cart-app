'use client'

import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:prashantmishra9873@gmail.com";
  };

  const handleGmailClick = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=prashantmishra9873@gmail.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our print-on-demand services? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                {/* Email Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">prashantmishra9873@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleEmailClick}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button 
                      onClick={handleGmailClick}
                      variant="outline"
                      className="flex-1"
                    >
                      Open Gmail
                    </Button>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">Available on request</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">India</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Response Time</h3>
                  <p className="text-blue-700">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleEmailClick();
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ContactPage; 