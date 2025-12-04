
import PageProfileTabs from '@/components/modules/seller/page/PageProfileTables';
import AffiliateBoard from '@/components/modules/user/profile/AffiliateBoard';
import Photos from '@/components/modules/user/profile/Photos';
import ProfileCard from '@/components/modules/user/profile/ProfileCard';
import { getPageInfo } from '@/server/moderator/page.server';
import { getUserInfo } from '@/server/user/user.server';


const PageDetails = async ({ params }: { params: Promise<{ pageId: string }> }) => {
  const { pageId } = await params;

  const pageData = await getPageInfo(pageId);
  const pageProfile = pageData.data[0];
  const { data: loggedinUserInfo } = await getUserInfo();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0">
      {/* Left Side */}

      <div className="lg:col-span-5 lg:sticky lg:top-20  lg:h-[calc(100vh-80px)] overflow-y-auto space-y-6 ">
        <ProfileCard entityType="page" profileData={pageProfile} loggedinUserInfo={loggedinUserInfo} />
        <Photos  profileData={pageProfile} />
      </div>
      {/* Right Side */}
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        {/* Affiliate Board */}
        <AffiliateBoard />
        <PageProfileTabs pageData={pageData?.data[0]} />
      </div>
    </div>
  )
}

export default PageDetails
