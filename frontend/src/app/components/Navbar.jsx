"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaSpinner, FaTimes, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { baseurl } from "./common";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [useOtpLogin, setUseOtpLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("employerToken") || localStorage.getItem("port_tok");
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/${localStorage.getItem("employerToken") ? "employer/profile" : "candidate/profile"}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.success) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Not logged in or invalid token", err);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // Handle OTP sending
  const handleOtp = async () => {
    setLoading(true);
    setError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = loginType === "Employer" ? "employer/send-otp" : "send-otp";
      const payload = loginType === "Employer" ? { contact_email: email } : { email };
      localStorage.setItem("emp-email", email);
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);
      console.log(response.data);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  // Handle OTP verification
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = loginType === "Employer" ? "employer/verify-otp" : "verify-otp";
      const payload = loginType === "Employer" ? { contact_email: email, otp } : { email, otp };
      const response = await axios.post(`${baseurl}/${endpoint}`, payload);

      if (response.data.success) {
        if (loginType === "Employer") {
          const sessionToken = response.data.session_token;
          if (sessionToken) {
            localStorage.setItem("employerToken", sessionToken);
            setOtpSent(false);
            setShowModal(false);
            window.location.href = "employer/dashboard";
          } else {
            setOtpSent(false);
            setShowModal(false);
            router.push("/employer/onboarding");
          }
        } else {
          const sessionToken = response.data.token;
          localStorage.setItem("port_tok", sessionToken);
          setShowModal(false);
          setOtpSent(false);
          router.push("/candidate/dashboard");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again.");
    }
    setLoading(false);
  };

  // Handle Employer password login
  const handleEmployerLogin = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/employer/login`, {
        contact_email: email,
        password,
      });

      if (response.data.success) {
        const token = response.data.session_token;
        localStorage.setItem("employerToken", token);
        setShowModal(false);
        window.location.href = "/employer/dashboard";
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials.");
    }
    setLoading(false);
  };

  // Handle Candidate password login
  const handleCandidateLogin = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/candidate/login`, { email, password });
      const responseData = await response.data;

      if (responseData.success) {
        localStorage.setItem("port_tok", responseData.token);
        setShowModal(false);
        setLoginType("");
        router.push("/candidate/dashboard");
      } else {
        setError(responseData.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Candidate login error:", error);
      setError("Failed to login. Please check your credentials.");
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("port_tok");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md sticky top-0 z-50 px-[8%]">
        <div className="mx-auto flex justify-between items-center">
          <div className="text-black text-2xl font-bold">
            <Link href="/">MyCompany</Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="text-black hover:text-gray-600">
                  Home
                </Link>
                <Link href="/about" className="text-black hover:text-gray-600">
                  About
                </Link>
                <Link href="/jobs" className="text-black hover:text-gray-600">
                  Jobs
                </Link>
                <Link href="/contact" className="text-black hover:text-gray-600">
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setLoginType("Employer");
                    setShowModal(true);
                  }}
                  className="text-black font-semibold border-2 border-green-500 px-4 py-2 rounded-lg hover:bg-green-50 transition"
                >
                  Employer Login
                </button>
                <button
                  onClick={() => {
                    setLoginType("Candidate");
                    setShowModal(true);
                  }}
                  className="text-white font-semibold bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Candidate Login
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href={loginType == "Employer" ? "/candidate/dashboard" : "/employer/dashboard"} className="text-black hover:text-gray-600">
                  Dashboard
                </Link>
                <Link href={loginType == "Employer" ? "/candidate/dashboard" : "/employer/profile"}>
                  <FaUserCircle className="text-2xl text-green-600" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <Link href="/" className="text-black hover:text-gray-600">
              Home
            </Link>
            <Link href="/about" className="text-black hover:text-gray-600">
              About
            </Link>
            <Link href="/jobs" className="text-black hover:text-gray-600">
              Jobs
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-600">
              Contact
            </Link>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setLoginType("Employer");
                    setShowModal(true);
                  }}
                  className="text-black font-semibold border-2 border-green-500 px-4 py-2 rounded-lg"
                >
                  Employer Login
                </button>
                <button
                  onClick={() => {
                    setLoginType("Candidate");
                    setShowModal(true);
                  }}
                  className="text-white bg-green-500 px-4 py-2 rounded-lg"
                >
                  Candidate Login
                </button>
              </>
            ) : (
              <>
                <Link href={loginType === "Employer" ? "/employer/dashboard" : "/candidate/dashboard"} className="text-black hover:text-gray-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => {
                setShowModal(false);
                setOtpSent(false);
                setEmail("");
                setPassword("");
                setOtp("");
                setError("");
                setUseOtpLogin(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-2xl mb-6 font-bold text-gray-800">
              {loginType} Login
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent}
                />
              </div>

              {!otpSent && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useOtpLogin}
                    onChange={() => setUseOtpLogin(!useOtpLogin)}
                    className="mr-2"
                  />
                  <label className="text-gray-600">Login with OTP</label>
                </div>
              )}

              {!otpSent && !useOtpLogin && (
                <div className="relative">
                  <RiLockPasswordFill className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {otpSent && (
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <p className="text-gray-500 text-sm">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setOtpSent(false);
                    setEmail("");
                    setPassword("");
                    setOtp("");
                    setError("");
                    setUseOtpLogin(false);
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  onClick={
                    otpSent
                      ? handleSendOtp
                      : useOtpLogin
                      ? handleOtp
                      : loginType === "Employer"
                      ? handleEmployerLogin
                      : handleCandidateLogin
                  }
                  disabled={loading}
                >
                  {loading && <FaSpinner className="animate-spin mr-2" />}
                  {loading
                    ? "Processing..."
                    : otpSent
                    ? "Verify OTP"
                    : useOtpLogin
                    ? "Send OTP"
                    : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}