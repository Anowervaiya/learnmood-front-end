
import PageProfileTabs from '@/modules/seller/page/PageProfileTables';
import AffiliateBoard from '@/modules/user/profile/AffiliateBoard';
import Photos from '@/modules/user/profile/Photos';
import ProfileCard from '@/modules/user/profile/ProfileCard';


const PageDetails = async ({ params }: { params: Promise<{ pageId: string }> }) => {
  const { pageId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/page?_id=${pageId}`)
    const pageData = await res.json();


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0">
      {/* Left Side */}

      <div className="lg:col-span-5 lg:sticky lg:top-20  lg:h-[calc(100vh-80px)] overflow-y-auto space-y-6 ">
        <ProfileCard profileData={pageData?.data[0]} />
        <Photos profileData={pageData?.data[0]} />
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
