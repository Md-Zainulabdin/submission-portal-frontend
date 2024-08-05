import { useState } from "react";
import { Plus, RotateCcw } from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";
import { useGetCoursesQuery } from "@/redux/api/ApiRoutes";

import CourseModal from "@/components/dashboard/Courses/course-modal";
import { columns } from "@/components/dashboard/Courses/column";
import { DataTable } from "@/components/dashboard/Courses/data-table";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const { authToken } = useAuthContext();
  const [show, setShow] = useState<boolean>(false);

  const { data, refetch } = useGetCoursesQuery(authToken?.token || "");
  return (
    <div>
      <CourseModal isOpen={show} onClose={() => setShow(false)} />
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">Courses</h1>
          <p></p>
        </div>
        {authToken?.user?.role == "admin" && (
          <div className="flex items-center gap-4">
            <Button onClick={() => refetch()} variant={"outline"} size={"icon"}>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button onClick={() => setShow(true)} className="bg-green-500">
              <span className="mr-2">Create</span>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="py-8">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Courses;
