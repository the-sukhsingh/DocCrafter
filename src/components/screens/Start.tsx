"use client"
import React from 'react'
import { useForm, Controller } from "react-hook-form";

type FormData = {
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  otherCategory?: string;
}

type StartPageProps = {
  onProjectSubmit: (data: FormData) => void;
}



const StartPage = ({ onProjectSubmit }: StartPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>()


  const validateForm = (data: FormData) => {
    const errors: Record<string, string> = {}
    if (!data.projectName || data.projectName.length < 3 || data.projectName.length > 50) {
      errors.projectName = "Project name must be between 3 and 50 characters."
    }
    if (!data.projectDescription || data.projectDescription.length < 10 || data.projectDescription.length > 800) {
      errors.projectDescription = "Project description must be between 10 and 500 characters."
    }
    if (data.projectCategory === "Pick a category") {
      errors.projectCategory = "Please select a project category."}
    if (data.projectCategory === "Other" && !data.otherCategory) {
      errors.otherCategory = "Please specify your category."
    }
    return Object.keys(errors).length ? errors : null
  }  
  
  const onSubmit = handleSubmit(async (data) => {
    const errors = validateForm(data)
    if (errors) {
      console.log(errors)
      return
    }

    data.projectCategory = data.projectCategory === "Other" ? data.otherCategory || "Uncategorized" : data.projectCategory;

    // Call the parent component's submit handler
    onProjectSubmit(data);
  })
    return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full mb-6 shadow-2xl border border-blue-500/20'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
            </svg>
          </div>          
          <h1 className='text-4xl font-bold text-white mb-3'>
            Create New Project
          </h1>
          <p className='text-gray-300 text-lg'>
            Bring your ideas to life with our project builder
          </p>
        </div>        
        {/* Form Card */}
        <div className='bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8'>
          <form onSubmit={onSubmit} className='space-y-8'>            {/* Project Name */}
            <div className='space-y-3'>
              <label htmlFor="projectname" className='block text-sm font-semibold text-gray-300 tracking-wide uppercase'>
                Project Name
              </label>
              <div className='relative'>
                <input 
                  type="text" 
                  id="projectname" 
                  placeholder="Enter your project name" 
                  className="w-full px-4 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 transition-all duration-300 outline-none text-gray-100 placeholder-gray-400" 
                  {...register("projectName",{required: "Project name is required",
                    minLength: { value: 3, message: "Project name must be at least 3 characters", },
                    maxLength: { value: 50, message: "Project name must be less than 50 characters" }})} 
                  min={3}
                  max={50} 
                />
                <div className='absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
              </div>
              {errors.projectName && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.projectName.message}
                </p>
              )}
            </div>            
            {/* Project Description */}
            <div className='space-y-3'>              
              <label htmlFor="projectdescription" className='block text-sm font-semibold text-gray-300 tracking-wide uppercase'>
                Project Description
              </label>
              <div className='relative'>
                <textarea 
                  className="w-full px-4 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 transition-all duration-300 outline-none text-gray-100 placeholder-gray-400 resize-none h-32" 
                  id='projectdescription' 
                  placeholder="Describe your project vision and goals..." 
                  minLength={10}
                  maxLength={800} 
                  {...register("projectDescription",{
                    required: "Project description is required",
                    minLength: { value: 10, message: "Project description must be at least 10 characters" },
                    maxLength: { value: 800, message: "Project description must be less than 500 characters" }
                  })}
                />
                <div className='absolute top-4 right-4 pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
                <p className='text-red-400 text-sm mt-1'>
                  {errors.projectDescription && errors.projectDescription.message}
                </p>
              </div>
            </div>            
            {/* Project Category */}
            <div className='space-y-3'>              
              <label htmlFor="projectcategory" className='block text-sm font-semibold text-gray-300 tracking-wide uppercase'>
                Project Category
              </label>
              <div className='relative'>
                <select 
                  defaultValue="Pick a category" 
                  className="w-full px-4 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 transition-all duration-300 outline-none text-gray-100 appearance-none cursor-pointer" 
                  id='projectcategory' 
                  {...register("projectCategory")}
                >
                  <option disabled={true}>Pick a Category</option>
                  <option value="AI">🤖 AI & Machine Learning</option>
                  <option value="Web Development">🌐 Web Development</option>
                  <option value="Mobile Development">📱 Mobile Development</option>
                  <option value="Data Science">📊 Data Science</option>
                  <option value="Game Development">🎮 Game Development</option>
                  <option value="IoT (Internet of Things)">🌐 IoT (Internet of Things)</option>
                  <option value="BlockChain">🔗 BlockChain</option>
                  <option value="Other">✨ Other</option>
                </select>
                <div className='absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </div>
            </div>  

            {/* Other Category */}
            {watch("projectCategory") === "Other" && (
              <div className='space-y-3'>
              <label htmlFor="othercategory" className='block text-sm font-semibold text-gray-300 tracking-wide uppercase'>
                Other Category
              </label>
              <div className='relative'>
                <input 
                type="text" 
                className="w-full px-4 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 transition-all duration-300 outline-none text-gray-100"
                id='othercategory'
                {...register("otherCategory")}
                placeholder="Please specify your category"
                />
              </div>
              </div>
            )}


            {/* Submit Button */}
            <div className='pt-4'>
              <button 
                disabled={Object.keys(errors).length > 0}
                type="submit" 
                className='w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
              >
                <span className='flex items-center justify-center space-x-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                  </svg>
                  <span>Create Project</span>
                </span>
              </button>
            </div>
          </form>
        </div>


        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-gray-400 text-sm'>
            Start building something amazing today
          </p>
        </div>
      </div>
    </div>
  )
}

export default StartPage;