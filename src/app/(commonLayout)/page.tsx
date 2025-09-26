
import LeftSiderbar from "@/modules/shared/home/leftSide/LeftSiderbar";
import MainFeed from "@/modules/shared/home/mainFeed/MainFeed";
import RightSiderbar from "@/modules/shared/home/rightSide/RightSiderbar";

export default function HomePage() {
  return (
    <>
      <LeftSiderbar />
      <MainFeed />
      <RightSiderbar />
    </>
  );
}
