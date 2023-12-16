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
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

const PostForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: "",
      image: undefined,
      location: "",
      tags: "",
    },
  });
  const { mutate: createPost, isPending: isCreatingPost } = useCreatePost();
  function onSubmit(values: z.infer<typeof PostSchema>) {
    createPost(values, {
      onSuccess(response) {
        const { data } = response;
        toast({
          title: data.message,
          variant: "primary",
        });
        navigate("/");
      },
      onError(error: AxiosError | Error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: error.response?.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Couldn't add new Post. Try again",
          });
        }
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
                <FileUploader fieldChange={field.onChange} />
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
          <Button type="submit">
            {isCreatingPost ? "Submitting.." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;