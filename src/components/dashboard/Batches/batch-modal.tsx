import { z } from "zod";
import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Modal } from "@/components/modal/Modal";

import { useAuthContext } from "@/context/AuthContext";
import { useGetBatchesQuery, useGetCoursesQuery } from "@/redux/api/ApiRoutes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  course: z.string().min(2, { message: "Course is required!" }),
  batchname: z.string().min(2, { message: "Batch name is required!" }),
  batchcode: z.string().min(2, { message: "Batch code is required!" }),
  time: z.string().min(2, { message: "Time is required!" }),
});

type FormValues = z.infer<typeof formSchema>;

const BatchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const { data: courses } = useGetCoursesQuery(authToken?.token ?? "");
  const { refetch } = useGetBatchesQuery(authToken?.token ?? "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      batchname: "",
      batchcode: "",
      time: "",
    },
  });

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      course: values.course,
      batchname: values.batchname,
      batchcode: values.batchcode,
      time: values.time,
    };

    try {
      const response = await axiosInstance.post(`/batch/create`, formData, {
        headers: {
          Authorization: `${authToken?.token}`,
        },
      });

      if (response.statusText === "Created") {
        toast.success("Batch Created");
        refetch();
        onClose();
        form.reset();
      }
    } catch (error: any) {
      console.log("Batch Error", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Batch"
      description="Enter Batch Details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={(value) => form.setValue("course", value)}
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
              name="batchname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Batch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batchcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Batch Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Time" {...field} />
                  </FormControl>
                  <FormDescription>Example: 4pm to 6pm</FormDescription>
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

export default BatchModal;
