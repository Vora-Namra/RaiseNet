import React, { useContext, useState } from "react";
import { CrowdFundingContext } from '../Context/CroudFunding'; // Importing the CrowdFundingContext
import { Logo, Menu } from '../Components/index'; // Importing the Logo and Menu components

const NavBar = () => {
    const { currentAccount } = useContext(CrowdFundingContext); // Accessing the currentAccount from the context
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu

    const menuList = ["White Paper", "Project", "Donation", "Members"]; // List of menu items

    // Function to handle wallet connection (placeholder function)
    const connectToWallet = () => {
        // Code to connect to wallet will be placed here
        console.log("Connect wallet function triggered");
    };

    return (
        <div className="backgroundMain">
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="flex justify-between items-center">
                    <a href="/" aria-label="Company" title="Company" className="inline-flex items-center mr-8">
                        <Logo color="text-white" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">Company</span>
                    </a>

                    {/* Desktop Menu */}
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        {menuList.map((el, index) => (
                            <li key={index}>
                                <a
                                    href="/"
                                    aria-label={el}
                                    title={el}
                                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                                >
                                    {el}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Connect Wallet Button */}
                    {!currentAccount && (
                        <ul className="flex items-center hidden space-x-8 lg:flex">
                            <li>
                                <button
                                    onClick={connectToWallet}
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                    title="Connect Wallet"
                                >
                                    Connect Wallet
                                </button>
                            </li>
                        </ul>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden z-40">
                        <button
                            aria-label="Open menu"
                            title="Open menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-5 text-gray-100" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1a1,1,0,0,1,0-2H23a1,1,0,0,1,0,2Z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1A1,1,0,0,1,1,4H23a1,1,0,0,1,0,2Z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1a1,1,0,0,1,0-2H23a1,1,0,0,1,0,2Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-0 left-0 w-full z-50">
                        <div className="p-5 bg-white border rounded shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <a href="/" aria-label="Company" title="Company" className="inline-flex items-center">
                                        <Logo color="text-black" />
                                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                            Company
                                        </span>
                                    </a>
                                </div>
                                <div>
                                    <button
                                        aria-label="Close menu"
                                        title="Close menu"
                                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M18.3,5.7l-1.4-1.4L12,9.2,7.1,4.3,5.7,5.7l4.9,4.9-4.9,4.9,1.4,1.4L12,12.8l4.9,4.9,1.4-1.4-4.9-4.9Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <nav>
                                <ul className="space-y-4">
                                    {menuList.map((el, index) => (
                                        <li key={index}>
                                            <a
                                                href="/"
                                                aria-label={el}
                                                title={el}
                                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                {el}
                                            </a>
                                        </li>
                                    ))}
                                    {!currentAccount && (
                                        <li>
                                            <button
                                                onClick={connectToWallet}
                                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                                title="Connect Wallet"
                                            >
                                                Connect Wallet
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
