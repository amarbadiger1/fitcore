import React from 'react'

const EditProfile = () => {
  return (
    <div className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="w-10/12 mx-auto p-4 md:p-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-6">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            <div>
              <label className="text-sm text-gray-500">Profile pic</label>
              <input
                type="file"

                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="text"

                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>


            <div>
              <label className="text-sm text-gray-500">Firstname</label>
              <input
                type="text"

                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Lastname</label>
              <input
                type="text"

                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>








          </div>

          <button className="mt-6 w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"

          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
