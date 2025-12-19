import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-charcoal-800 to-terracotta-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Info</h2>
              
              <div className="space-y-6">

                <div className="flex items-start gap-4">
                  <div className="bg-terracotta-100 p-3 rounded-lg">
                    <MapPin className="text-terracotta-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Basant Lok, Vasant Vihar<br />
                      New Delhi, India
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="bg-terracotta-100 p-3 rounded-lg">
                    <Phone className="text-terracotta-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 123 456 7890</p>
                    <p className="text-gray-600">+91 098 765 4321</p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="bg-terracotta-100 p-3 rounded-lg">
                    <Mail className="text-terracotta-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@furnix.com</p>
                    <p className="text-gray-600">support@furnix.com</p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="bg-terracotta-100 p-3 rounded-lg">
                    <Clock className="text-terracotta-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1089392398646!2d77.15303631508034!3d28.62087158241985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d033bcfe7fb3d%3A0x4b1b1b1b1b1b1b1b!2sVasant%20Vihar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>


          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>


                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    placeholder="How can we help?"
                  />
                </div>


                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>


                <button
                  type="submit"
                  className="w-full bg-terracotta-600 text-white py-3 rounded-lg hover:bg-terracotta-700 transition font-medium shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="bg-terracotta-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-terracotta-600" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">Available 24/7</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="bg-terracotta-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-terracotta-600" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">Quick Response</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="bg-terracotta-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-terracotta-600" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">Come Say Hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;