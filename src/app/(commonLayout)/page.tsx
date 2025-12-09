
import LeftSiderbar from "@/components/modules/shared/home/leftSide/LeftSiderbar";
import MainFeed from "@/components/modules/shared/home/mainFeed/MainFeed";
import RightSiderbar from "@/components/modules/shared/home/rightSide/RightSiderbar";
import { getCookie } from "@/utils/tokenHandlers";
import LoginPage from "../(authLayout)/login/page";

export default async function HomePage() {

   
  return (
    <>
      <LeftSiderbar />
      <MainFeed />
      <RightSiderbar />
    </>
  );
}
