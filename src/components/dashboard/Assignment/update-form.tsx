import { z } from "zod";
import axiosInstance from "@/axios";
// import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAssignmentsQuery } from "@/redux/api/ApiRoutes";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100),
  points: z.string().min(1, { message: "Points is required!" }).max(100),
  status: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500),
  deadline: z.string().min(1, { message: "Deadline is required!" }),
  link: z.string().url({ message: "Link must be a valid URL" }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AssignmentUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const { refetch, data } = useGetAssignmentsQuery(authToken?.token || "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      link: "",
      points: "",
      status: "",
    },
  });

  useEffect(() => {
    if (data) {
      const find = data?.find((row) => row._id == id);
      if (find) {
        form.reset({
          title: find?.title,
          description: find?.description,
          deadline: format(new Date(find?.deadline), "yyyy-MM-dd"),
          link: find?.link,
          points: find?.points?.toString(),
          status: find?.status,
        });
      }
    }
  }, [id]);

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      title: values.title,
      description: values.description,
      deadline: format(new Date(values.deadline), "dd MMMM yyyy"),
      link: values.link,
      points: values.points,
      status: values.status,
    };

    try {
      const response = await axiosInstance.put(
        `/assignment/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `${authToken?.token}`,
          },
        }
      );

      if (response.statusText === "OK") {
        // toast.success("Assignment Updated successfully");
        refetch();
        navigate("/dashboard/assignments");
      }
    } catch (error: any) {
      console.log("Assignment Update Error", error?.response?.data?.message);
      //   toast.error(error?.response?.data?.message);
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
                    <Link to={"/dashboard/assignments"}>Assignments</Link>
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
              <Button type="submit" disabled={loading}>
                {loading && <LoaderCircle className="animate-spin" />}
                <span className="ml-2">Update</span>
              </Button>
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Update Assignment</CardTitle>
              <CardDescription>
                Update the assignment details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Points"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="http://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default AssignmentUpdateForm;
