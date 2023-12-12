import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import { SignupSchema } from "@/lib/validation";
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
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/user/UserContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { saveUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof SignupSchema>) => {
    createUserAccount(values, {
      onSuccess(response) {
        const { data } = response;
        saveUser(data);
        toast({
          title: "Sign up Successful..!!",
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
            title: "Couldn't Sign up. Please try again.",
          });
        }
      },
    });
  };

  return (
    <Form {...form}>
      <div className="sm:w-[420px]">
        <h2 className="text-xl md:text-2xl font-bold text-center">
          Create your Account
        </h2>
        <p className="text-sm text-gray-400 text-center my-2">
          To use Buzz, Enter your details.
        </p>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="bg-slate-800" />
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
                  <Input type="text" {...field} className="bg-slate-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="bg-slate-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="bg-slate-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary w-full">
            {isCreatingUser ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <div className="flex justify-center gap-2 mt-4">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
