import React, { useState } from "react";
import { z } from "zod";
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
import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/modal/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitModal: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { authToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const submitHandler = async (values: FormValues) => {
    setLoading(true);

    const formData = {
      url: values.url,
      assignmentId: id,
    };

    try {
      const response = await axiosInstance.post(
        `/submission/create`,
        formData,
        {
          headers: {
            Authorization: `${authToken?.token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Assignment Submitted");
        onClose();
        form.reset();
        navigate(-1);
      }
    } catch (error: any) {
      console.log("Submission Error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Submit"
      description="Please provide a link to submit"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    You can provide either a GitHub URL, Drive link, or any
                    other link.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default SubmitModal;
