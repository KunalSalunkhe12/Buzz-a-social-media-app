import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useCreatePost } from "@/lib/react-query/queries";
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
  console.log(action);
  const { mutate: createPost, isPending: isCreatingPost } = useCreatePost();
  function onSubmit(values: z.infer<typeof PostSchema>) {
    createPost(values, {
      onSuccess(response) {
        console.log(response);
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photo</FormLabel>
              <FormControl>
                <FileUploader
                  imageUrl={post?.imageUrl}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <Button type="submit" disabled={isCreatingPost}>
            {isCreatingPost ? "Submitting.." : action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
