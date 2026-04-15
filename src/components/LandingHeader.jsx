import { supabase } from '../lib/supabase'

   export default function LandingHeader() {
     return (
       <header className="bg-white shadow-sm border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-16">
             <div className="flex items-center">
               <h1 className="text-2xl font-bold text-gray-900">Detask</h1>
               <span className="ml-2 text-sm text-gray-500">Sky悟空</span>
             </div>
             <div className="hidden md:block">
               {/* Placeholder for navigation links if needed */}
             </div>
           </div>
         </div>
       </header>
     )
   }