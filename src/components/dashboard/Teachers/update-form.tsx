import { z } from "zod";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
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
import { useAuthContext } from "@/context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetBatchesQuery,
  useGetCoursesQuery,
  useGetTeachersQuery,
} from "@/redux/api/ApiRoutes";

const formSchema = z.object({
  fullname: z.string().min(2, { message: "Name is required!" }).max(100),
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email is required!",
    })
    .max(50),
  gender: z.string().min(1, { message: "Gender is required!" }),
  course: z.string().min(1, { message: "Course is required!" }),
  batch: z.string().min(1, { message: "Batch is required!" }),
  cnic: z
    .string()
    .regex(/^[0-9]{5}-[0-9]{7}-[0-9]$/, {
      message: "CNIC No must follow the XXXXX-XXXXXXX-X format!",
    })
    .min(2, {
      message: "CNIC is required!",
    })
    .max(50),
});

type FormValues = z.infer<typeof formSchema>;

const TeacherUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const { refetch, data: teachers } = useGetTeachersQuery(
    authToken?.token ?? ""
  );
  const { data: courses } = useGetCoursesQuery(authToken?.token ?? "");
  const { data: batches } = useGetBatchesQuery(authToken?.token ?? "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      cnic: "",
      course: "",
      batch: "",
      gender: "",
    },
  });

  const { watch } = form;
  const selectedCourse = watch("course");

  useEffect(() => {
    if (teachers) {
      const foundTeacher = teachers.find((teacher) => teacher._id === id);

      if (foundTeacher) {
        form.reset({
          fullname: foundTeacher.fullname,
          email: foundTeacher.email,
          cnic: foundTeacher.cnic,
          course: foundTeacher.course._id,
          batch: foundTeacher.batch._id,
          gender: foundTeacher.gender,
        });
      }
    }
  }, [id, teachers]);

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      fullname: values.fullname,
      email: values.email,
      cnic: values.cnic,
      course: values.course,
      batch: values.batch,
      gender: values.gender,
    };

    try {
      const response = await axiosInstance.put(`/teacher/update`, formData, {
        headers: {
          Authorization: `${authToken?.token}`,
        },
      });

      if (response.status == 201) {
        toast.success("New Teacher Created");
        navigate("/dashboard/teachers");
        refetch();
        form.reset();
      }
    } catch (error: any) {
      console.log("Assignment Creation Error", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link to={"/dashboard/teachers"}>Teachers</Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Update</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <Link to="/dashboard/assignments">
                <Button variant={"outline"}>
                  <span className="">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="bg-green-500">
                {loading && <LoaderCircle className="animate-spin mr-2" />}
                <span>Update</span>
              </Button>
            </div>
          </div>
          <Card className="mt-6 pb-3">
            <CardHeader>
              <CardTitle>Update Teacher</CardTitle>
              <CardDescription>
                Update the teacher details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fullname</FormLabel>
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
                </div>

                <div className="grid grid-cols-2 gap-6">
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
                            {courses?.map((course) => (
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
                          onValueChange={(value) =>
                            form.setValue("batch", value)
                          }
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Batch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {batches
                              ?.filter(
                                (row) => row.course._id == selectedCourse
                              )
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
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default TeacherUpdateForm;
