'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { baseurl } from '@/app/components/common';
import Sidebar from '@/app/components/Sidebar';

const EditEmployerProfile = () => {
  const router = useRouter();
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    company_name: '',
    company_location: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    gst_number: '',
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
        const profileRes = await axios.get(`${baseurl}/employer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.data && profileRes.data.success) {
          setProfileFormData({
            name: profileRes.data.data.name || '',
            company_name: profileRes.data.data.company_name || '',
            company_location: profileRes.data.data.company_location || '',
            contact_person: profileRes.data.data.contact_person || '',
            contact_email: profileRes.data.data.contact_email || '',
            contact_phone: profileRes.data.data.contact_phone || '',
            gst_number: profileRes.data.data.gst_number || '',
          });
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, [router]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('employerToken');
      const res = await axios.put(`${baseurl}/employer/profile`, profileFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success) {
        setSuccess('Profile updated successfully');
        setTimeout(() => router.push('/employer/profile'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white shadow-2xl rounded-xl p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Manage Your Profile
            </h1>
            <p className="text-gray-600 mb-8">
              Update your employer details below.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                {success}
              </div>
            )}

            {/* Edit Profile Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={profileFormData.name}
                      onChange={handleProfileChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
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
                      value={profileFormData.company_name}
                      onChange={handleProfileChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
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
                    value={profileFormData.company_location}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                    placeholder="Enter company location"
                  />
                </div>
                <div className="grid grid-cols-1  gap-6">
                  
                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                      Contact Email
                    </label>
                    <input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      disabled
                      value={profileFormData.contact_email}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm text-sm cursor-not-allowed"
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
                    value={profileFormData.contact_phone}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                    placeholder="Enter contact phone"
                  />
                </div>
                <div>
                  <label htmlFor="gst_number" className="block text-sm font-medium text-gray-700">
                    GST Number
                  </label>
                  <input
                    id="gst_number"
                    name="gst_number"
                    type="text"
                    value={profileFormData.gst_number}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                    placeholder="Enter GST number"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg shadow-md text-white font-medium text-sm transition duration-200 ${
                      loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployerProfile;