import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

import {
  useGetBatchesQuery,
  useGetCoursesQuery,
  useGetTeachersQuery,
} from "@/redux/api/ApiRoutes";

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
  gender: z.string().min(1, { message: "Gender is required!" }),
  course: z.string().min(1, { message: "Course is required!" }),
  batch: z.string().min(1, { message: "Batch is required!" }),
  city: z.string().min(1, { message: "City is required!" }),
  teacher: z.string().min(1, { message: "Teacher is required!" }),
  hasLaptop: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const StudentRegisterForm = () => {
  const navigate = useNavigate();
  const { setAuthToken, authToken } = useAuthContext();

  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: courses } = useGetCoursesQuery(authToken?.token ?? "");
  const { data: batches } = useGetBatchesQuery(authToken?.token ?? "");
  const { data: teachers } = useGetTeachersQuery(authToken?.token ?? "");

  // Spinner
  const Icons = {
    spinner: Loader2,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cnic: "",
      course: "",
      batch: "",
      gender: "",
      city: "",
      teacher: "",
      hasLaptop: false,
    },
  });

  const { watch } = form;
  const selectedCourse = watch("course");
  const selectedBatch = watch("batch");
  const selectedCity = watch("city");

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      fullname: values.name,
      cnic: values.cnic,
      email: values.email,
      password: values.password,
      course: values.course,
      batch: values.batch,
      gender: values.gender,
      city: values.city,
      teacher: values.teacher,
      hasLaptop: values.hasLaptop,
    };
    try {
      const response = await axiosInstance.post(`/student/register`, formData);

      if (response.status === 201) {
        setAuthToken(response?.data);
        navigate("/auth/login");
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
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </div>
          <div>
            <Badge>Students Only</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("gender", value)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
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

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        onValueChange={(value) => form.setValue("city", value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(
                            new Set(courses?.map((row) => row.city))
                          ).map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("course", value)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses
                            ?.filter((row) => row.city == selectedCity)
                            ?.map((course) => (
                              <SelectItem key={course._id} value={course._id}>
                                {course.coursename}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch</FormLabel>
                      <Select
                        onValueChange={(value) => form.setValue("batch", value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Batch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {batches
                            ?.filter((row) => row.course._id == selectedCourse)
                            ?.map((batch) => (
                              <SelectItem key={batch._id} value={batch._id}>
                                {batch?.batchname}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("teacher", value)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Teacher" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachers
                            ?.filter(
                              (row) =>
                                row.course._id == selectedCourse &&
                                row.batch._id == selectedBatch
                            )
                            ?.map((teacher) => (
                              <SelectItem key={teacher._id} value={teacher._id}>
                                {teacher.fullname}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="hasLaptop"
                render={({ field }) => (
                  <FormItem className="flex space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Do you have own Laptop ?</FormLabel>
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
      <CardFooter className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default StudentRegisterForm;
