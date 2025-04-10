
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobsTable from "./JobsTable";
import { Job } from "./JobTypes";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import UpdateJobStatusModal from "./UpdateJobStatusModal";

export interface JobTabsProps {
  jobs: Job[];
  searchTerm: string;
  onCancelJob: (jobId: string, cancellationReason?: string) => void;
  onCompleteJob: (jobId: string, actualAmount: number) => void;
  onRescheduleJob?: (jobId: string, newDate: Date, isAllDay: boolean) => void;
  onSearchChange?: (term: string) => void;
  selectedJob: Job | null;
  isStatusModalOpen: boolean;
  openStatusModal: (job: Job) => void;
  closeStatusModal: () => void;
  setDatePopoverOpen?: (open: boolean) => void;
  setTechPopoverOpen?: (open: boolean) => void;
  setSourcePopoverOpen?: (open: boolean) => void;
  setAmountPopoverOpen?: (open: boolean) => void;
  setPaymentPopoverOpen?: (open: boolean) => void;
}

const JobTabs = ({ 
  jobs, 
  searchTerm, 
  onCancelJob,
  onCompleteJob,
  onRescheduleJob,
  onSearchChange,
  selectedJob,
  isStatusModalOpen,
  openStatusModal,
  closeStatusModal
}: JobTabsProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const getJobsByStatus = (status: string) => {
    if (status === "all") {
      return jobs;
    }
    return jobs.filter(job => job.status === status);
  };

  // Count jobs by status
  const scheduledJobsCount = jobs.filter(job => job.status === "scheduled").length;
  const inProgressJobsCount = jobs.filter(job => job.status === "in_progress").length;
  const completedJobsCount = jobs.filter(job => job.status === "completed").length;
  const cancelledJobsCount = jobs.filter(job => job.status === "cancelled").length;
  const allJobsCount = jobs.length;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            All
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-800 rounded-full font-medium">
              {allJobsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="scheduled"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
          >
            Scheduled
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
              {scheduledJobsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="in_progress"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            In Progress
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
              {inProgressJobsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Completed
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full font-medium">
              {completedJobsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="cancelled"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            Cancelled
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full font-medium">
              {cancelledJobsCount}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <div className="relative mb-4">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
        
        <TabsContent value="all">
          <JobsTable 
            jobs={getJobsByStatus("all")} 
            searchTerm={searchTerm}
            onOpenStatusModal={openStatusModal}
          />
        </TabsContent>
        
        <TabsContent value="scheduled">
          <JobsTable 
            jobs={getJobsByStatus("scheduled")} 
            searchTerm={searchTerm}
            onOpenStatusModal={openStatusModal}
          />
        </TabsContent>
        
        <TabsContent value="in_progress">
          <JobsTable 
            jobs={getJobsByStatus("in_progress")} 
            searchTerm={searchTerm}
            onOpenStatusModal={openStatusModal}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <JobsTable 
            jobs={getJobsByStatus("completed")} 
            searchTerm={searchTerm}
            onOpenStatusModal={openStatusModal}
          />
        </TabsContent>
        
        <TabsContent value="cancelled">
          <JobsTable 
            jobs={getJobsByStatus("cancelled")} 
            searchTerm={searchTerm}
            onOpenStatusModal={openStatusModal}
          />
        </TabsContent>
      </Tabs>

      <UpdateJobStatusModal
        open={isStatusModalOpen}
        onOpenChange={closeStatusModal}
        job={selectedJob}
        onCancel={onCancelJob}
        onComplete={onCompleteJob}
        onReschedule={onRescheduleJob}
      />
    </div>
  );
};

export default JobTabs;
