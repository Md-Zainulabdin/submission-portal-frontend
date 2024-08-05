import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { Modal } from "@/components/modal/Modal";
import { useGetCoursesQuery } from "@/redux/api/ApiRoutes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  coursename: z.string().min(2, { message: "Course name is required!" }),
  city: z.string().min(2, { message: "City name is required!" }),
});

type FormValues = z.infer<typeof formSchema>;

const CourseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const { refetch } = useGetCoursesQuery(authToken?.token ?? "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coursename: "",
      city: "",
    },
  });

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      coursename: values.coursename,
      city: values.city,
    };

    try {
      const response = await axiosInstance.post(`/course/create`, formData, {
        headers: {
          Authorization: `${authToken?.token}`,
        },
      });

      if (response.statusText === "Created") {
        toast.success("Course Created");
        refetch();
        onClose();
        form.reset();
      }
    } catch (error: any) {
      console.log("Course Error", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Course"
      description="Enter Course Details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="coursename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Course name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default CourseModal;
