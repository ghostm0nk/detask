import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (error) {
      setMessage(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column: Hero content */}
          <div className="space-y-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white lg:text-5xl">
                Detask
              </h1>
              <p className="text-lg text-white/80">
                Professional task management tool designed for development teams. Track tasks, manage branches, and schedule merges all in one place.
              </p>
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setIsSignUp(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 text-base font-medium"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 transition-colors duration-200 text-base font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">
                Why teams choose Detask
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M8.414 4.293a1 1 0 011.414 0L11 8V4a1 1 0 012 0v4l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Branch Integration</h3>
                    <p className="text-white/80">Automatically detect and link tasks to your Git branches</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M8.414 4.293a1 1 0 011.414 0L11 8V4a1 1 0 012 0v4l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Merge Scheduling</h3>
                    <p className="text-white/80">Plan and automate merge windows with team approval workflows</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M8.414 4.293a1 1 0 011.414 0L11 8V4a1 1 0 012 0v4l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Team Collaboration</h3>
                    <p className="text-white/80">Real-time updates, comments, and notifications keep everyone aligned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Auth form */}
          <div className="space-y-8">
            <div className="bg-white/50 rounded-lg shadow-lg p-8 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {isSignUp ? 'Create your account' : 'Sign in to Detask'}
              </h2>
              <p className="text-center text-gray-600 mb-6">
                {isSignUp 
                  ? 'Join thousands of development teams using Detask to streamline their workflow'
                  : 'Access your dashboard to manage tasks and merge schedules'}
              </p>
              
              <form className="space-y-6" onSubmit={handleAuth}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {message && (
                  <div className="text-sm text-center text-red-600">{message}</div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                  >
                    {loading ? 'Loading...' : (isSignUp ? 'Sign up' : 'Sign in')}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="text-center text-gray-500">
              <p className="text-sm">
                By continuing, you agree to our 
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> 
                and 
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}