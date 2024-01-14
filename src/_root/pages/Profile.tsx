import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/user/UserContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const {
    data: currentUser,
    isPending,
    isSuccess,
    isError,
  } = useGetUserById(id || "");

  if (isError) {
    throw new Error();
  }

  return (
    <>
      {isPending && <Loader />}
      {isSuccess && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover"
                src={
                  currentUser.imageUrl
                    ? currentUser.imageUrl
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile picture"
              />
              <div className="flex flex-col gap-1 md:gap-2">
                <p className="text-sm md:text-2xl font-semibold">
                  {currentUser.name}
                </p>
                <p className="text-xm text-slate-500">
                  @{currentUser.username}
                </p>
                <p className="text-xs md:text-sm">{currentUser.bio}</p>
              </div>
            </div>
            {user._id === currentUser._id && (
              <Link to={`/update-profile/${currentUser._id}`}>
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit post"
                  className="h-5 w-5"
                />
              </Link>
            )}
          </div>
          <hr />
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/posts.svg" alt="posts" />
            <h2>Posts</h2>
          </div>
          {isSuccess && <GridPostList posts={currentUser.posts} />}
        </>
      )}
    </>
  );
};

export default Profile;
