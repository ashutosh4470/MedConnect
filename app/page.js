'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left py-24 px-6 relative gap-10 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl font-extrabold text-blue-800 drop-shadow-lg"
          >
            Welcome to{' '}
            <motion.span
              className="text-blue-600 inline-block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              MedConnect
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg sm:text-xl text-gray-700 max-w-xl mt-6"
          >
            💊 A bridge between medical stores and medicine agencies. Quick, easy and powerful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-4 mt-10 z-10 justify-center md:justify-start"
          >
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started 🚀
            </Link>
            <Link
              href="/login"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl shadow hover:shadow-md transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        </div>

        {/* Right Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex-1 flex justify-center"
        >
          
          <img
            src="/medicine.png"
            alt="Healthcare connection"
            className="w-80 md:w-96 drop-shadow-2xl"
          />
        </motion.div>

        {/* Floating Emojis */}
        <motion.div
          className="absolute top-40 right-1/4 text-4xl"
          animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <img src='./pills.png' alt='logo' className='h-20'/>
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/3 text-4xl"
          animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          💊
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/4 text-4xl"
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🌟
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-white rounded-t-3xl shadow-inner z-10 relative"
      >
        {/* Soft background shapes */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-2xl z-0" />
        <div className="absolute bottom-0 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl z-0" />

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 relative z-10">
          Why MedConnect?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-6 rounded-2xl shadow hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

const features = [
  {
    emoji: '📥',
    title: 'Easy Requests',
    description: 'Medical stores can raise medicine requests in seconds.',
  },
  {
    emoji: '⚡',
    title: 'Fast Delivery',
    description: 'Agencies get notified instantly and deliver rapidly.',
  },
  {
    emoji: '🩺',
    title: 'Verified Agencies',
    description: 'Only trusted and verified agencies can respond to requests.',
  },
  {
    emoji: '📊',
    title: 'Live Tracking',
    description: 'Track your requests and deliveries in real-time.',
  },
  {
    emoji: '🔒',
    title: 'Secure Platform',
    description: 'Your data is protected with end-to-end encryption.',
  },
  {
    emoji: '📦',
    title: 'Order History',
    description: 'Easily view and manage past requests and deliveries.',
  },
  {
    emoji: '💬',
    title: 'In-App Chat',
    description: 'Chat with agencies directly for urgent clarifications.',
  },
  {
    emoji: '🕒',
    title: 'Real-Time Updates',
    description: 'Stay updated with request status and delivery ETA.',
  },
  {
    emoji: '🌐',
    title: 'Multi-City Support',
    description: 'Use MedConnect across multiple locations seamlessly.',
  },
];
