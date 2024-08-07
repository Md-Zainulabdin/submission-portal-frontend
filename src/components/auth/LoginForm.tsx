import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react";

import axiosInstance from "@/axios";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email is required!",
    })
    .max(50),
  password: z
    .string()
    .min(2, {
      message: "Password is required!",
    })
    .max(50),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { setAuthToken } = useAuthContext();

  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Spinner
  const Icons = {
    spinner: Loader2,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axiosInstance.post(`/auth/login`, formData);

      if (response.status === 200) {
        setAuthToken(response?.data);
        toast.success("Login Successfull");
      }
    } catch (error: any) {
      console.log("Login Error", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <Card className="w-[500px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
                      <div className="relative">
                        <Input
                          placeholder="Enter password"
                          type={isShow ? "text" : "password"}
                          {...field}
                        />
                        {isShow ? (
                          <EyeOff
                            onClick={toggleShow}
                            className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
                          />
                        ) : (
                          <Eye
                            onClick={toggleShow}
                            className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button disabled={loading} className="button" type="submit">
              {loading ? (
                <span className="flex w-full items-center justify-center">
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm mt-2">
          Don't have an account?{" "}
          <Link to={"/auth/register"} className="underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
