export interface LoginResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  
  export interface Student {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    gender: string;
    role: string;
    cnic: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    campus: string;
    course: string;
    picture: string;
    hasLaptop: boolean;
  }
  
  export interface Assignment {
    _id: string;
    title: string;
    description: string;
    status: string;
    assignedBy: string;
    link: string;
    deadline: string;
    points: number;
    submissions: Submission[]
  }
  
  export interface Submission {
    _id: string;
    url: string;
    assignment: {
      _id: string;
      title: string;
      description: string;
      points: string;
    };
    student: {
      _id: string;
      fullname: string;
      email: string;
    };
    isSeen: boolean;
    status: string;
    isApproved: boolean;
    canResubmit: boolean;
    updatedAt: string;
    feedback: string;
    points: string;
    rejectionReason: string;
  }
  