import React from 'react'
import img from "../assets/home.jpg"

const Home = () => {
  return (
    <div className='w-full'>

      {/* ================= HERO SECTION ================= */}
      <div className='w-full bg-white mt-10 px-5'>
        <div className='max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10'>

          {/* LEFT */}
          <div className='w-full lg:w-1/2 flex flex-col items-start gap-6'>
            <span className='px-3 py-1 text-sm font-semibold rounded-full bg-[#D4F042] hover:bg-[#c4e030]'>
              NEW: AI WORKOUT PARTNER
            </span>

            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold leading-tight'>
              Stronger. <br />
              Smarter. <br />
              Consistent.
            </h1>

            <p className='text-gray-500 text-base sm:text-lg md:text-xl max-w-md'>
              Experience a personal training studio in your pocket. Advanced analytics,
              personalized nutrition, and expert coaching designed for your biology.
            </p>

            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <button className='py-3 px-6 font-semibold rounded-full bg-[#D4F042] hover:bg-[#c4e030]'>
                Join FitCore Plus
              </button>

              <button className='py-3 px-6 font-semibold rounded-full bg-white border hover:bg-slate-50 hover:border-gray-300'>
                View Demo
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className='w-full lg:w-1/2 flex justify-center'>
            <img
              src={img}
              alt="home"
              className='rounded-xl w-full max-w-md lg:max-w-full'
            />
          </div>

        </div>
      </div>


      {/* ================= FEATURES ================= */}
      <div className='w-full bg-gray-100 py-32 mt-28'>
        <div className='max-w-7xl mx-auto flex flex-col items-center gap-16 px-4'>

          <div className='text-center max-w-2xl'>
            <p className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
              Engineered for Results
            </p>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mt-6'>
              Everything you need to reach your peak performance.
            </h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>

            <div className='bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl cursor-pointer'>
              <h4 className='text-xl font-semibold mb-2'>📊 Smart Analytics</h4>
              <p className='text-gray-600'>
                Track every rep, set, and calorie with precision dashboards that
                visualize your progress over time.
              </p>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl cursor-pointer'>
              <h4 className='text-xl font-semibold mb-2'>🍏 Nutrition Engine</h4>
              <p className='text-gray-600'>
                AI-powered meal planning that adapts to your workout intensity and
                dietary preferences automatically.
              </p>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl cursor-pointer'>
              <h4 className='text-xl font-semibold mb-2'>🏅 Custom Coaching</h4>
              <p className='text-gray-600'>
                Get dynamic workout routines that evolve with your strength levels,
                ensuring you never hit a plateau.
              </p>
            </div>

          </div>
        </div>
      </div>


      {/* ================= TESTIMONIALS ================= */}
      <div className='w-full bg-white py-20'>
        <div className='max-w-7xl mx-auto flex flex-col items-center gap-16 px-4'>

          <div className='text-center max-w-2xl'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold'>
              Loved by 50,000+ athletes <br /> worldwide
            </h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>

            <div className='bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl'>
              <p className='text-gray-600'>
                "FitCore changed how I view training. The data-driven approach removed the guesswork.
                I've seen more progress in 3 months than I did in 3 years"
              </p>

              <div className='flex gap-4 mt-6 items-center'>
                <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                <div>
                  <h4 className='font-semibold'>Amar Badiger</h4>
                  <p className='text-gray-500 text-sm'>Powerlifter</p>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl'>
              <p className='text-gray-600'>
                "The nutrition engine is a game changer. It syncs perfectly with my Apple Watch
                and tells me exactly what I need to eat after a heavy lift."
              </p>

              <div className='flex gap-4 mt-6 items-center'>
                <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                <div>
                  <h4 className='font-semibold'>Amar Badiger</h4>
                  <p className='text-gray-500 text-sm'>Powerlifter</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ================= CTA SECTION ================= */}
      <div className='w-full bg-gray-50 py-20'>
        <div className='max-w-5xl mx-auto text-center px-4 flex flex-col items-center gap-6'>

          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
            Ready to transform your fitness journey?
          </h1>

          <p className='text-gray-600 text-lg max-w-2xl'>
            Join thousands of athletes using FitCore to train smarter, eat better,
            and achieve their dream physique faster.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <button className='py-3 px-8 font-semibold rounded-full bg-[#D4F042] hover:bg-[#c4e030]'>
              Get Started Free
            </button>

            <button className='py-3 px-8 font-semibold rounded-full border bg-white hover:bg-gray-100'>
              View Pricing
            </button>
          </div>

        </div>
      </div>
      <div className='w-full bg-white py-5'>
        <p className='text-center'>© 2026 FitCore Technologies. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Home