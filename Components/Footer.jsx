// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Column 1 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-bold">CRYPTO KING</h2>
            <p className="mt-4 text-sm">
              Here you can use rows and columns to organize your footer content.
            </p>
          </div>
          {/* Column 2 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-bold">PRODUCTS</h2>
            <ul className="mt-4 text-sm">
              <li className="mb-2">
                <a href="#" className="hover:underline">Market</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">ERC20 Token</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Donation</a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-bold">USEFUL LINKS</h2>
            <ul className="mt-4 text-sm">
              <li className="mb-2">
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Company Bio</a>
              </li>
            </ul>
          </div>
          {/* Column 4 */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold">CONTACT</h2>
            <ul className="mt-4 text-sm">
              <li className="mb-2">
                <a href="mailto:support@cryptoking.com" className="hover:underline">support@cryptoking.com</a>
              </li>
              <li className="mb-2">
                <a href="mailto:info@example.com" className="hover:underline">info@example.com</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
