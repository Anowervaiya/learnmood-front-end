import LeftSiderbar from "@/modules/shared/LeftSiderbar";
import MainFeed from "@/modules/shared/MainFeed";
import Navbar from "@/modules/shared/Navbar";
import RightSiderbar from "@/modules/shared/RightSiderbar";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex mx-auto max-w-7xl px-4 py-6 gap-6">
        <LeftSiderbar />
        <MainFeed/>
        <RightSiderbar/>
      </main>
    </div>
  );
}
