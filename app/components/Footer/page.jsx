"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/subs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        toast.success('Subscription successful!');
      } else if (response.status === 409) {
        toast.error('Email already exists. Please use a different email.');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      toast.error('Subscription failed. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-100 w-full text-slate-600 py-10 px-4 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Image and Description */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/assets/assets_frontend/logo.svg" alt="Logo" width={150} height={150} />
          <p className="text-sm text-slate-500 mt-4 font-semibold max-w-xs">
            Your trusted healthcare partner. Empowering you to make informed decisions. Together, we navigate your health journey.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-center">
          <h2 className="text-lg font-bold text-gray-700">
            Subscribe for updates
          </h2>
          <div className="flex items-center mt-3 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`bg-green-600 text-white font-bold py-2 px-4 ml-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <CircularProgress size={20} className="text-white" /> : 'Subscribe'}
            </button>
          </div>
          <div className="mt-4 flex space-x-4">
            <Link href="#" aria-label="Facebook"><FaFacebookF size={24} className="text-blue-600 hover:text-blue-700" /></Link>
            <Link href="#" aria-label="Twitter"><FaTwitter size={24} className="text-blue-400 hover:text-blue-500" /></Link>
            <Link href="#" aria-label="Instagram"><FaInstagram size={24} className="text-pink-600 hover:text-pink-700" /></Link>
            <Link href="#" aria-label="LinkedIn"><FaLinkedinIn size={24} className="text-blue-800 hover:text-blue-900" /></Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start text-sm space-y-3">
          <h2 className="font-bold text-gray-700">Contact Us</h2>
          <div className="flex items-center">
            <FaMapMarkerAlt size={20} className="mr-2 text-gray-600" />
            <p>123 Healthcare St, City, Country</p>
          </div>
          <div className="flex items-center">
            <FaPhone size={20} className="mr-2 text-orange-900" />
            <Link href="tel:+1234567890" className="hover:text-blue-400">(+123) 456-7890</Link>
          </div>
          <div className="flex items-center">
            <FaEnvelope size={20} className="mr-2 text-blue-600" />
            <Link href="mailto:info@healthcare.com" className="hover:text-blue-400">info@healthcare.com</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm border-t pt-4">
        <p>© {new Date().getFullYear()} Healthcare. All Rights Reserved.</p>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
