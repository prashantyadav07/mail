import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// --- UPDATED: Naya icon import kiya gaya hai ---
import { ArrowRight, Wand2, PieChart, Users2, CalendarClock } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  return (
    // Main container jo sabko center mein rakhta hai
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4 py-16 sm:py-24">
      
      {/* Wrapper jo content ki max-width set karta hai */}
      <div className="max-w-6xl w-full mx-auto"> {/* Max-width thodi badhai hai */}

        {/* --- Hero Content --- */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">CommunicateAI</span>
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-slate-600 sm:text-xl">
            Revolutionize your data collection. Create beautiful, intelligent forms and unlock actionable insights with the power of AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-center items-center gap-4">
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-slate-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* --- Feature Boxes (in the same container) --- */}
        {/* --- UPDATED: Grid layout ko 4 columns ke liye adjust kiya gaya hai --- */}
        <div 
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          
          {/* Feature 1: AI Builder */}
          <div className="bg-white text-center p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-5 mx-auto">
              <Wand2 className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">AI-Assisted Creation</h3>
            <p className="mt-2 text-slate-500">
              Let our AI suggest questions and generate forms from a simple text prompt.
            </p>
          </div>

          {/* --- NEW FEATURE BOX --- */}
          <div className="bg-white text-center p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-5 mx-auto">
              <CalendarClock className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Automated Communication</h3>
            <p className="mt-2 text-slate-500">
              Send bulk emails to your users and schedule them for the perfect time to maximize engagement.
            </p>
          </div>
          {/* --- END OF NEW FEATURE --- */}

          {/* Feature 3: Analytics */}
          <div className="bg-white text-center p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-5 mx-auto">
              <PieChart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Intelligent Analytics</h3>
            <p className="mt-2 text-slate-500">
              Our AI analyzes data to show you trends, sentiment analysis, and key insights.
            </p>
          </div>

          {/* Feature 4: Collaboration */}
          <div className="bg-white text-center p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-5 mx-auto">
              <Users2 className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Seamless Collaboration</h3>
            <p className="mt-2 text-slate-500">
              Work with your team, share forms, and integrate with your favorite tools.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;