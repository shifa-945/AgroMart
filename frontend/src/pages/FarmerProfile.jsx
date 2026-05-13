import React, { useEffect,useState } from "react";
import {
  Bell,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
function FarmerProfile() {

  const [profileImage, setProfileImage] = useState("/farmer.png");
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  // ✅ ALL FORM DATA IN STATE (FIX)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    gender: "",
    date_of_birth: "",

    village: "",
    state: "",
    district: "",
    pincode: "",

    farm_name: "",
    farming_type: "",
    experience: "",
    farm_size: "",
    main_products: "",

    bio: "",

    bank_name: "",
    account_number: "",
    ifsc_code: "",
    account_holder: ""
  });
const farmerId = localStorage.getItem("farmerId")

useEffect(() => {

  const fetchFarmerProfile = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/farmers/${farmerId}/`
      );

      // LOAD ALL DATA
      setFormData((prev) => ({
        ...prev,
        ...res.data
      }));

      // LOAD SAVED IMAGE
      if (res.data.profile_photo) {

        setProfileImage(res.data.profile_photo);

      } else {

        setProfileImage("/farmer.png");

      }

    } catch (err) {

      console.log(err);

    }

  };

  fetchFarmerProfile();

}, []);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {

    // IMAGE PREVIEW
    setProfileImage(URL.createObjectURL(file));

    // REAL FILE FOR DATABASE
    setProfilePhotoFile(file);
  }
};
  // INPUT CHANGE HANDLER (HOOK FIX)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SAVE FUNCTION (FIXED)
  const handleSaveProfile = async () => {
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

       if (profilePhotoFile) {
      form.append("profile_photo", profilePhotoFile);
    }

      const res = await axios.patch(
        `http://127.0.0.1:8000/api/farmers/${farmerId}/`,
        
        form,
        
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
        
      );
     console.log(res.data);

      alert("Profile Saved Successfully!");
      console.log(res.data);

    } catch (err) {
      console.log(err.response?.data);
      alert("Save Failed");
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-3 sm:p-5 lg:p-8 min-h-screen overflow-y-auto">

      {/* MAIN CARD */}
      <div className="bg-white rounded-[30px] shadow-md border border-gray-200 overflow-hidden min-h-[100vh]">

        {/* TOP HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-6 border-b border-gray-200">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Farmer Profile
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your personal and farm information
            </p>
          </div>

          {/* RIGHT HEADER */}
          <div className="flex items-center gap-5">

            <Bell className="text-gray-600" size={22} />

            <div className="flex items-center gap-3">
              <img
                src={profileImage}
                alt="farmer"
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div>
              <h3 className="font-semibold text-gray-800">
  {formData.full_name}
</h3>

                <p className="text-sm text-gray-500">
                  Farmer
                </p>
              </div>

              <ChevronDown size={18} className="text-gray-500" />
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-4 lg:p-6">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* PROFILE PHOTO */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="font-semibold text-gray-800 mb-6">
                Profile Photo
              </h2>

              <div className="flex flex-col items-center">

                <img
                  src={profileImage}
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-green-100"
                />

                {/* HIDDEN FILE INPUT */}
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* UPLOAD BUTTON */}
                <label
                  htmlFor="profileUpload"
                  className="mt-5 border border-green-600 text-green-700 px-5 py-2 rounded-xl hover:bg-green-50 transition cursor-pointer"
                >
                  Upload Photo
                </label>

                <p className="text-xs text-gray-400 mt-3">
                  JPG, PNG (Max. 2MB)
                </p>

              </div>

            </div>

            {/* PERSONAL INFORMATION */}
            <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-green-700 font-semibold text-lg mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
  type="text"
  name="full_name"
  value={formData.full_name}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gender
                  </label>

                  <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
>
  <option>Male</option>
  <option>Female</option>
  <option>Other</option>
</select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>

                 <input
  type="date"
  name="date_of_birth"
  value={formData.date_of_birth}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
/>
                </div>

              </div>

            </div>

          </div>

          {/* ADDRESS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-5">

            <h2 className="text-green-700 font-semibold text-lg mb-6">
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Village
                </label>

                <input
  type="text"
  name="village"
  value={formData.village}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3"
/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  state
                </label>

                <input
  type="text"
  name="state"
  value={formData.state}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3"
/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

            </div>

          </div>

          {/* LOWER GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

            {/* FARM DETAILS */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-green-700 font-semibold text-lg mb-6">
                Farm / Business Details
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Farm Name
                  </label>

                  <input
                    type="text"
                    name="farm_name"
                    value={formData.farm_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Farming Type
                  </label>

                  <select
                    name="farming_type"
                    value={formData.farming_type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  >
                    <option>Organic</option>
                    <option>Natural</option>
                    <option>Traditional</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Experience
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Farm Size
                    </label>

                    <input
                      type="text"
                      name="farm_size"
                      value={formData.farm_size}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>

                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Main Products
                  </label>

                  <input
                    type="text"
                    name="main_products"
                    value={formData.main_products}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-5">

              {/* ABOUT */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <h2 className="text-green-700 font-semibold text-lg mb-6">
                  About You
                </h2>

                <textarea
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>

              </div>

              {/* DOCUMENTS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <h2 className="text-green-700 font-semibold text-lg mb-6">
                  Documents & Verification
                </h2>

                <div className="space-y-5">

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      ID Proof
                    </label>

                    <input
                      type="file"
                      className="w-full border border-gray-300 rounded-xl p-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gallery
                    </label>

                    <input
                      type="file"
                      multiple
                      className="w-full border border-gray-300 rounded-xl p-3"
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* BANK DETAILS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-5">

            <h2 className="text-green-700 font-semibold text-lg mb-6">
              Bank Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Bank Name
                </label>

                <input
  type="text"
  name="bank_name"
  value={formData.bank_name}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-3"
/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Number
                </label>

                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  IFSC Code
                </label>

                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Holder
                </label>

                <input
                  type="text"
                  name="account_holder"
                  value={formData.account_holder}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

            </div>

          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-center mt-8">

            <button
  onClick={handleSaveProfile}
  className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition"
>
  Save Profile
</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FarmerProfile;