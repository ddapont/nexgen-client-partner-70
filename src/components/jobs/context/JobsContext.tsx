
import { createContext, useContext, ReactNode } from "react";
import { Job } from "@/components/jobs/JobTypes";
import { DateRange } from "react-day-picker";
import { AmountRange } from "@/components/jobs/AmountFilter";
import { PaymentMethod } from "@/components/jobs/JobTypes";

// Define the context type
interface JobsContextType {
  // Modals state
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  
  // Filter popovers state
  datePopoverOpen: boolean;
  setDatePopoverOpen: (open: boolean) => void;
  techPopoverOpen: boolean;
  setTechPopoverOpen: (open: boolean) => void;
  sourcePopoverOpen: boolean;
  setSourcePopoverOpen: (open: boolean) => void;
  amountPopoverOpen: boolean;
  setAmountPopoverOpen: (open: boolean) => void;
  paymentPopoverOpen: boolean;
  setPaymentPopoverOpen: (open: boolean) => void;
  
  // Jobs data 
  jobs: Job[];
  filteredJobs: Job[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // Filters
  selectedTechnicians: string[];
  selectedCategories: string[];
  selectedJobSources: string[];
  date: DateRange | undefined;
  amountRange: AmountRange | null;
  paymentMethod: PaymentMethod | null;
  hasActiveFilters: boolean;
  
  // Filter operations
  toggleTechnician: (techName: string) => void;
  toggleCategory: (category: string) => void;
  toggleJobSource: (sourceName: string) => void;
  setDate: (date: DateRange | undefined) => void;
  setAmountRange: (range: AmountRange | null) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  selectAllTechnicians: () => void;
  deselectAllTechnicians: () => void;
  selectAllJobSources: () => void;
  deselectAllJobSources: () => void;
  clearFilters: () => void;
  
  // Job operations
  handleAddJob: (job: Job) => void;
  handleCancelJob: (jobId: string, cancellationReason?: string) => void;
  handleCompleteJob: (jobId: string, actualAmount: number) => void;
  handleRescheduleJob: (jobId: string, newDate: Date, isAllDay: boolean) => void;
  
  // Job status modal
  selectedJob: Job | null;
  isStatusModalOpen: boolean;
  openStatusModal: (job: Job) => void;
  closeStatusModal: () => void;
  
  // Job source operations
  toggleJobSourceSidebar: () => void;
}

// Create the context with a default undefined value
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Context provider component
export const JobsProvider = ({ children, value }: { children: ReactNode, value: JobsContextType }) => {
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

// Custom hook to use the context
export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobsContext must be used within a JobsProvider");
  }
  return context;
};
