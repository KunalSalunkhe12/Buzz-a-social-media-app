import * as z from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(20, { message: "Username must be at most 20 characters." })
    .toLowerCase(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const PostSchema = z.object({
  caption: z.string().max(2200, { message: "Maximum 2,200 characters" }),
  image: z.custom<File>(),
  location: z.string().max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string().max(1000, { message: "Maximum 1000 characters" }),
});

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(20, { message: "Username must be at most 20 characters." })
    .toLowerCase(),
  image: z.custom<File>(),
  bio: z.string().max(2200, "Maximum 2200 characters"),
});
