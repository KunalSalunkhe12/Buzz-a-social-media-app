import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import { SigninSchema } from "@/lib/validation";
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
import { useSignInAccount } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/user/UserContext";
import { useEffect } from "react";

const SignupForm = () => {
  const { toast } = useToast();
  const { mutate: signInAccount, isPending: isSigning } = useSignInAccount();
  const { saveToken } = useUserContext();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  useEffect(() => {
    if (locationState) {
      toast({
        title: locationState?.message,
      });
    }
  }, []);

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof SigninSchema>) => {
    signInAccount(values, {
      onSuccess(response) {
        const { data } = response;
        saveToken(data.result);
        toast({
          title: "Sign in Successful",
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
            title: "Couldn't Sign in. Please try again.",
          });
        }
      },
    });
  };

  return (
    <Form {...form}>
      <div className="sm:w-[420px]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 my-4">
            <img
              src="/assets/icons/favicon.png"
              alt="Logo"
              className="h-8 w-8"
            />
            <p className="font-bold text-2xl">Buzz!</p>
          </div>
          <h2 className="text-lg md:text-xl font-bold">
            Sign In to your Account
          </h2>
          <p className="text-xs text-gray-400 my-1">Welcome Back!</p>
        </div>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
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
            {isSigning ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <div className="flex justify-center gap-2 mt-4 text-sm">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-secondary">
            Sign up
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
