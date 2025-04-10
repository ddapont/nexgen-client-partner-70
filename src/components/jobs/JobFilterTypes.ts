
import { DateRange } from "react-day-picker";
import { Job } from "./JobTypes";

export type DateFilterType = 
  | "today" 
  | "tomorrow" 
  | "yesterday" 
  | "thisWeek" 
  | "nextWeek"
  | "lastWeek"
  | "thisMonth"
  | "nextMonth"
  | "lastMonth"
  | "custom";

export interface JobFilters {
  searchTerm: string;
  technicianFilter: string;
  dateFilter: DateFilterType;
  customDateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export interface JobFilterProps {
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
  technicians: { id: string; name: string }[];
  resetFilters: () => void;
}

export interface FilteredJobsResult {
  jobs: Job[];
  totalCount: number;
}
