"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Instagram, Music2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Web3Forms API - sign up at https://web3forms.com/ for your access key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New contact form submission from Phatsima Organic",
          from_name: "Phatsima Organic Website",
          replyto: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Web3Forms error:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
                Contact Information
              </h2>
              <p className="font-body text-slate-600 mb-6">
                Feel free to reach out to us through any of the channels below. We're here to help!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-slate-900 mb-1">Email</h3>
                  <a
                    href="mailto:phatsimainnovations@gmail.com"
                    className="font-body text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    phatsimainnovations@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-slate-900 mb-1">Phone</h3>
                  <a
                    href="tel:+26774745282"
                    className="font-body text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    +267 74 745 282
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Music2 className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-slate-900 mb-1">Social Media</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://tiktok.com/@phatsimaorganic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-slate-600 hover:text-brand-600 transition-colors"
                    >
                      <Music2 className="w-4 h-4" />
                      TikTok
                    </Link>
                    <Link
                      href="https://www.instagram.com/phatsimaorganic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-slate-600 hover:text-brand-600 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <div className="bg-slate-200 rounded-xl h-64 w-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019613441752!2d25.90882931531788!3d-24.628234684693515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb2391e9d85e3e7%3A0xbd44e8b7b3e2e9e7!2sGaborone%2C%20Botswana!5e0!3m2!1sen!2s!4v1647867891234!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Phatsima Organic Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden fields for Web3Forms */}
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <input type="hidden" name="subject" value="New contact form submission from Phatsima Organic" />
              <input type="hidden" name="from_name" value="Phatsima Organic Website" />
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-body font-medium text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-body font-medium text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-body font-medium text-slate-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  Oops! Something went wrong. Please try again later or contact us directly via email.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-body font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}