import Navbar from "@/modules/shared/layout/Navbar";


export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
         <Navbar />
   
         {/* Main container */}
         <main className="flex mx-auto max-w-7xl px-4 mt-6 gap-6">
           {children}
         </main>
       </div>
  );
}
