'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

import { baseurl } from '@/app/components/common';
import Sidebar from '@/app/components/Sidebar';

const EditEmployerProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    company_location: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    gst_number: '',
    company_pan_card: '',
    company_gst: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.success) {
          setFormData({
            name: res.data.data.name || '',
            company_name: res.data.data.company_name || '',
            company_location: res.data.data.company_location || '',
            contact_person: res.data.data.contact_person || '',
            contact_email: res.data.data.contact_email || '',
            contact_phone: res.data.data.contact_phone || '',
            gst_number: res.data.data.gst_number || '',
            company_pan_card: res.data.data.company_pan_card || '',
            company_gst: res.data.data.company_gst || '',
          });
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('employerToken');
      const res = await axios.put(`${baseurl}/employer/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success) {
        setSuccess('Profile updated successfully');
        setTimeout(() => router.push('/employer/profile'), 2000);
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
{/* //absolute inset-0 left-64 bg-gray-100 p-4 md:p-8 lg:p-12 xl:p-16' */}
     <Sidebar/>

     <div className='absolute inset-0 left-64 bg-gray-100 p-4 md:p-8 lg:p-12 xl:p-16'>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Edit Employer Profile</h2>
        
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                value={formData.company_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company_location" className="block text-sm font-medium text-gray-700">
              Company Location
            </label>
            <input
              id="company_location"
              name="company_location"
              type="text"
              value={formData.company_location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company location"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700">
                Contact Person
              </label>
              <input
                id="contact_person"
                name="contact_person"
                type="text"
                value={formData.contact_person}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter contact person"
              />
            </div>

            <div>
              <label htmlFor="contact_email"  className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                disabled={true}
                value={formData.contact_email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border bg-gray-400  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter contact email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
              Contact Phone
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="tel"
              value={formData.contact_phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter contact phone"
            />
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gst_number" className="block text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                id="gst_number"
                name="gst_number"
                type="text"
                value={formData.gst_number}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter GST number"
              />
            </div>

            <div>
              <label htmlFor="company_pan_card" className="block text-sm font-medium text-gray-700">
                Company PAN Card
              </label>
              <input
                id="company_pan_card"
                name="company_pan_card"
                type="text"
                value={formData.company_pan_card}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter company PAN card"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company_gst" className="block text-sm font-medium text-gray-700">
              Company GST
            </label>
            <input
              id="company_gst"
              name="company_gst"
              type="text"
              value={formData.company_gst}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company GST"
            />
          </div> */}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
     </div>
    </>
  );
};

export default EditEmployerProfile;