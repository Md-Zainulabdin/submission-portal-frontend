import React, { useEffect, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import axiosInstance from "@/axios";
// import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { Modal } from "@/components/modal/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  status?: string;
  feedback?: string;
  points?: string;
  rejectionReason?: string;
  total_points?: string;
  canResubmit: boolean;
}

const formSchema = z.object({
  status: z.string().optional(),
  feedback: z.string().optional(),
  points: z.string().optional(),
  rejectionReason: z.string().optional(),
  canResubmit: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  id,
  status,
  feedback,
  points,
  rejectionReason,
  total_points,
  canResubmit,
}) => {
  const { authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
      feedback: "",
      points: "",
      rejectionReason: "",
      canResubmit: false,
    },
  });

  const { watch } = form;
  const selectedStatus = watch("status");

  useEffect(() => {
    form.reset({
      status: status ?? "",
      feedback: feedback ?? "",
      points: points?.toString() ?? "",
      rejectionReason: rejectionReason ?? "",
      canResubmit: canResubmit ?? false,
    });
  }, [id]);

  const submitHandler = async (values: FormValues) => {
    if (Number(values?.points) > Number(total_points ?? 0)) {
      //   toast.error("Points cannot be greater than total points");
      return;
    }

    setLoading(true);

    const formData = {
      status: values?.status,
      feedback: values?.feedback,
      points: values?.points,
      rejectionReason: values?.rejectionReason,
      canResubmit: values?.canResubmit,
    };

    try {
      const response = await axiosInstance.put(
        `/submission/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `${authToken?.token}`,
          },
        }
      );

      if (response.status == 200) {
        // toast.success("Details Updated");
        onClose();
        form.reset();
      }
    } catch (error: any) {
      console.log("Submission Error", error?.response?.data?.message);
      //   toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Review Submission"
      description="Approve or disapprove the student's submission"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="disapproved">Disapproved</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedStatus === "approved" && (
              <>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Points"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Total Points</FormLabel>
                    <FormControl>
                      <Input value={total_points} type="number" readOnly />
                    </FormControl>
                  </FormItem>
                </div>

                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Feedback" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {selectedStatus === "disapproved" && (
              <>
                <FormField
                  control={form.control}
                  name="rejectionReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rejection Reason</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Rejection Reason"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="canResubmit"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel>Allow Resubmission</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Update
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
