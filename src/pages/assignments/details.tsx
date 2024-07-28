import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Assignment } from "@/types";
import axiosInstance from "@/axios";
import { useAuthContext } from "@/context/AuthContext";
import SubmitModal from "@/components/dashboard/Submission/submit-modal";
import { Skeleton } from "@/components/ui/skeleton";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { authToken } = useAuthContext();

  const [state, setState] = useState<{
    data: Assignment | null;
    loading: boolean;
  }>({ data: null, loading: true });
  const [show, setShow] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true });
    try {
      const response = await axiosInstance.get(`/assignment/${id}`, {
        headers: { Authorization: `${authToken?.token}` },
      });
      if (response.data) {
        setState({ data: response.data, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ data: null, loading: false });
    }
  }, [id, authToken?.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const breadcrumb = useMemo(
    () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link to="/dashboard/assignments">Assignment</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    []
  );

  const skeleton = useMemo(
    () => (
      <>
        <Skeleton className="w-[120px] h-[20px] rounded-full" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <Skeleton className="w-[50%] h-[20px] rounded-full" />
        <Skeleton className="w-[150px] h-[20px] rounded-full" />
      </>
    ),
    []
  );

  const { data, loading } = state;

  return (
    <div>
      <SubmitModal id={id ?? ""} isOpen={show} onClose={() => setShow(false)} />
      <div className="flex items-center justify-between">
        {breadcrumb}
        <div className="flex items-center gap-3">
          <Button onClick={() => setShow(true)}>Submit</Button>
        </div>
      </div>
      <section className="mt-6 space-y-3">
        {loading ? (
          skeleton
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              {data?.title}
            </h1>
            <p className="text-lg text-muted-foreground">{data?.description}</p>
            {data?.link && (
              <Link to={data.link} target="_blank">
                Link
              </Link>
            )}
            <p className="text-lg font-semibold">
              Total Points:{" "}
              <span className="font-medium text-primary">{data?.points}</span>
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default AssignmentDetails;
