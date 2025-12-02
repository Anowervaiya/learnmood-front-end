
import LeftSiderbar from "@/components/modules/shared/home/leftSide/LeftSiderbar";
import MainFeed from "@/components/modules/shared/home/mainFeed/MainFeed";
import RightSiderbar from "@/components/modules/shared/home/rightSide/RightSiderbar";

export default function HomePage() {
  return (
    <>
      <LeftSiderbar />
      <MainFeed />
      <RightSiderbar />
    </>
  );
}
