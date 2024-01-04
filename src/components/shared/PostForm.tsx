import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DevTool } from "@hookform/devtools";

import { useNavigate } from "react-router-dom";
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
import { PostSchema } from "@/lib/validation";
import FileUploader from "./FileUploader";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import { toast } from "../ui/use-toast";
import { TPost } from "@/types";

type PostFormProps = {
  post?: TPost;
  action: "Update" | "Create";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      image: undefined,
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });
  const { mutate: createPost, isPending: isCreatingPost } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdatePost();

  function onSubmit(values: z.infer<typeof PostSchema>) {
    if (action === "Update") {
      console.log(values);
      updatePost(
        { postData: values, postId: post?._id },
        {
          onSuccess(data) {
            console.log(data);
            return navigate("/");
          },
          onError(error) {
            console.log(error);
            return;
          },
        }
      );
    } else {
      createPost(values, {
        onSuccess(response) {
          const { data } = response;
          toast({
            title: data.message,
            variant: "primary",
          });
          navigate("/");
        },
        onError(error) {
          console.log(error);
          toast({
            title: "Couldn't add new Post. Try again",
            variant: "destructive",
          });
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 "
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-slate-800" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {action === "Create" && (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Photo</FormLabel>
                <FormControl>
                  <FileUploader fieldChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-slate-800" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add tags (Separated by ,)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="bg-slate-800 "
                  placeholder="React, Next.js, Javascript"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreatingPost || isUpdatingPost}>
            {isCreatingPost || isUpdatingPost ? "..." : action}
          </Button>
        </div>
      </form>

      <DevTool control={form.control} />
    </Form>
  );
};

export default PostForm;
