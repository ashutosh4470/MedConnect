import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-blue-50 text-blue-800 mt-10 border-t border-blue-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="/medical-home.png" alt="MedConnect Logo" className="w-8 h-8" />
                            <span className="text-xl font-bold">MedConnect</span>
                        </div>
                        <p className="text-sm text-blue-600">Bridging healthcare with technology for a better tomorrow.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-blue-500">Home</a></li>
                            <li><a href="/about" className="hover:text-blue-500">About</a></li>
                            <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
                            <li><a href="/services" className="hover:text-blue-500">Services</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/faq" className="hover:text-blue-500">FAQs</a></li>
                            <li><a href="/help" className="hover:text-blue-500">Help Center</a></li>
                            <li><a href="/privacy" className="hover:text-blue-500">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-blue-500">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Contact Us</h3>
                        <p className="text-sm">📍 Pune, Maharashtra, India</p>
                        <p className="text-sm">📞 +91 77560 94735</p>
                        <p className="text-sm">✉️ support@medconnect.com</p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-blue-500">
                    <p>&copy; {new Date().getFullYear()} MedConnect. All rights reserved.</p>
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <a href="https://www.linkedin.com/in/ashutosh-mahale4470"
                            target="_blank"
                            className="hover:text-blue-700">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer