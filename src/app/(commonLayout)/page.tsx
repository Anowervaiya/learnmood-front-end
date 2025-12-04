
import LeftSiderbar from "@/components/modules/shared/home/leftSide/LeftSiderbar";
import MainFeed from "@/components/modules/shared/home/mainFeed/MainFeed";
import RightSiderbar from "@/components/modules/shared/home/rightSide/RightSiderbar";
import { getCookie } from "@/utils/tokenHandlers";
import LoginPage from "../(authLayout)/login/page";

export default async function HomePage() {
   const accessToken = await getCookie("accessToken");
  
  
    // If NOT logged in → don’t show Navbar or layout
    if (!accessToken) {
      return null // only LoginPage will show
    }
  
   
  return (
    <>
      <LeftSiderbar />
      <MainFeed />
      <RightSiderbar />
    </>
  );
}
