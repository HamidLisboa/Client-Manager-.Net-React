import { Save, RotateCcw } from "lucide-react";

const ClientForm = ({ methods, onFormReset, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      style={{ marginBottom: "5px" }}
    >
      <div className="space-y-4">
        <form className="flex flex-col sm:flex-row gap-4">
          <input type="hidden" {...register("id")} />
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name*
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter first name"
              {...register("firstName", {
                required: true,
                maxLength: 30,
              })}
            />

            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.firstName?.type === "required" &&
                "First Name is required"}
              {errors.firstName?.type === "maxLength" &&
                "First Name cannot exceed 30 characters"}
            </p>
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name*
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: true,
                maxLength: 30,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter last name"
            />
            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.lastName?.type === "required" && "Last Name is required"}
              {errors.lastName?.type === "maxLength" &&
                "Last Name cannot exceed 30 characters"}
            </p>
          </div>
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email*
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter email"
            />
            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Please enter a valid email"}
            </p>
          </div>
          <div className="flex-1">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age*
            </label>
            <input
              type="number"
              {...register("age", {
                required: true,
                min: 18,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter age"
            />
            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.age?.type === "required" && "Age is required"}
              {errors.age?.type === "min" && "Age must be more than 18"}
            </p>
          </div>
          <div className="flex-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address*
            </label>
            <input
              type="text"
              {...register("address", {
                required: true,
                maxLength: 100,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter address"
            />
            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.address?.type === "required" && "Address is required"}
              {errors.address?.type === "maxLength" &&
                "Address cannot exceed 100 characters"}
            </p>
          </div>
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone*
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: true,
                pattern: /^\d{10}$/,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter phone number"
            />
            <p className="mt-1 text-sm text-red-600 flex items-center">
              {errors.phone?.type === "required" && "Phone is required"}
              {errors.phone?.type === "pattern" &&
                "Please enter a valid phone number (10 digits)"}
            </p>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            onClick={handleSubmit(onFormSubmit)}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-4 h-4 mr-2" />
          </button>

          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
