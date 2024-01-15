import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  const { saveToken } = useUserContext();
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
        saveToken(data.result);
        toast({
          title: "Sign up Successful..!!",
          variant: "primary",
        });
        navigate("/");
      },
      onError() {
        toast({
          title: "Couldn't Sign up. Please try again.",
          variant: "destructive",
        });
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
          <h2 className="text-lg md:text-xl font-bold ">Create your Account</h2>
          <p className="text-xs text-gray-400 my-1">
            To use Buzz, Enter your details.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="space-y-4 text"
        >
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
        <div className="flex justify-center gap-2 mt-4 text-sm">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-secondary">
            Sign in
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
