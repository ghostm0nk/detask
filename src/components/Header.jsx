import { supabase } from '../lib/supabase'

export default function Header() {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Detask</h1>
            <span className="ml-2 text-sm text-gray-500">Sky悟空</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}