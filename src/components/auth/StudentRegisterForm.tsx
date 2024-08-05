import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
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
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is required!",
    })
    .max(50),
  cnic: z
    .string()
    .regex(/^[0-9]{5}-[0-9]{7}-[0-9]$/, {
      message: "CNIC No must follow the XXXXX-XXXXXXX-X format!",
    })
    .min(2, {
      message: "CNIC is required!",
    })
    .max(50),
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

const StudentRegisterForm = () => {
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
      name: "",
      cnic: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      name: values.name,
      cnic: values.cnic,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axiosInstance.post(`/auth/`, formData);

      if (response.status === 200) {
        setAuthToken(response?.data);
        toast.success("Registration Successfull");
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
    <Card className="w-[800px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cnic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC</FormLabel>
                    <FormControl>
                      <Input placeholder="XXXXX-XXXXXXX-X" {...field} />
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
                            className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground"
                          />
                        ) : (
                          <Eye
                            onClick={toggleShow}
                            className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground"
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
                "Register"
              )}
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentRegisterForm;
