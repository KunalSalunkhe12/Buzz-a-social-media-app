import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { useGetCurrentUser, useUpdateProfile } from "@/lib/react-query/queries";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";

const UpdateProfile = () => {
  const { data: user, isSuccess } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user?.username,
      name: user?.name,
      bio: user?.bio,
      profile: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    updateProfile(
      { ...values, imageId: user?.imageId || "" },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated Successfully",
            variant: "primary",
          });
          navigate(`/profile/${user?._id}`);
        },
        onError: () => {
          toast({
            title: "Couldn't update Profile",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <h2 className="text-sm md:text-xl font-semibold">Update Profile</h2>
        {isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ProfileUploader
                        mediaUrl={user?.imageUrl}
                        fieldChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input className="bg-slate-800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="bg-slate-800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input className="bg-slate-800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4 justify-end">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader /> : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
