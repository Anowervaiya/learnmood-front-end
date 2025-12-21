
import PostDetailsModal from "@/components/modules/shared/posts/PostDetailsModal";
import { getPostDetailsInfo } from "@/server/user/post.server";



const PostDetailsPage = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  const {data} = await getPostDetailsInfo(postId);
  return (
    <PostDetailsModal postData={data}/>
  )
  

  
};

export default PostDetailsPage;
