import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { Assignment } from "@/types";
import axiosInstance from "@/axios";
import { useAuthContext } from "@/context/AuthContext";
import SubmitModal from "@/components/dashboard/Submission/submit-modal";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { authToken } = useAuthContext();

  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<Assignment>();

  useEffect(() => {
    axiosInstance
      .get(`/assignment/${id}`, {
        headers: {
          Authorization: `${authToken?.token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <SubmitModal id={id ?? ""} isOpen={show} onClose={() => setShow(false)} />
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Link to="/dashboard">Assignment</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={() => setShow(true)}>Submit</Button>
      </div>
      <section className="mt-6 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">{data?.title}</h1>
        <p>{data?.description}</p>
        {data?.link && (
          <Link to={data.link} target="_blank">
            Link
          </Link>
        )}
      </section>
    </div>
  );
};

export default AssignmentDetails;
