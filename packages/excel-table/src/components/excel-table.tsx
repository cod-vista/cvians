"use client";

import * as React from "react";
import type { ReactNode } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Calendar,
  Clock,
  CalendarDays,
} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "../lib/utils";
import {
  TableContext,
  type TableContextType,
  type DataType,
  type SortDirection,
  type DateFilter,
  type RelativeDateType,
  type DateFilterType,
} from "./excel-table-context";

// Re-export types for convenience
export type { DataType, SortDirection, DateFilter };

// Utility functions for date filtering
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const parseDate = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

const getRelativeDate = (
  type: RelativeDateType
): { start: Date; end: Date } => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (type) {
    case "today":
      return { start: today, end: today };
    case "yesterday": {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: yesterday, end: yesterday };
    }
    case "tomorrow": {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { start: tomorrow, end: tomorrow };
    }
    case "thisWeek": {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return { start: startOfWeek, end: endOfWeek };
    }
    case "lastWeek": {
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      return { start: lastWeekStart, end: lastWeekEnd };
    }
    case "thisMonth": {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { start: startOfMonth, end: endOfMonth };
    }
    case "lastMonth": {
      const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start: lastMonthStart, end: lastMonthEnd };
    }
    case "thisYear": {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      return { start: startOfYear, end: endOfYear };
    }
    case "lastYear": {
      const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
      const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
      return { start: lastYearStart, end: lastYearEnd };
    }
    default:
      return { start: today, end: today };
  }
};

const matchesDateFilter = (dateValue: Date, filter: DateFilter): boolean => {
  switch (filter.type) {
    case "equals": {
      if (!filter.value) return false;
      const targetDate = parseDate(filter.value);
      return dateValue.toDateString() === targetDate.toDateString();
    }
    case "before": {
      if (!filter.value) return false;
      const beforeDate = parseDate(filter.value);
      return dateValue < beforeDate;
    }
    case "after": {
      if (!filter.value) return false;
      const afterDate = parseDate(filter.value);
      return dateValue > afterDate;
    }
    case "between": {
      if (!filter.startDate || !filter.endDate) return false;
      const startDate = parseDate(filter.startDate);
      const endDate = parseDate(filter.endDate);
      return dateValue >= startDate && dateValue <= endDate;
    }
    case "relative": {
      if (!filter.relative) return false;
      const { start, end } = getRelativeDate(filter.relative);
      return dateValue >= start && dateValue <= end;
    }

    default:
      return false;
  }
};

// Excel-style hierarchical date structure
interface DateHierarchy {
  year: number;
  months: {
    month: number;
    monthName: string;
    days: {
      day: number;
      fullDate: string;
      selected: boolean;
    }[];
    selected: boolean;
  }[];
  selected: boolean;
}

// Date Filter Component
interface DateFilterPopoverProps {
  columnIndex: number;
  uniqueValues: string[];
}

function DateFilterPopover({
  columnIndex,
  uniqueValues,
}: DateFilterPopoverProps) {
  const context = React.useContext(TableContext);
  if (!context)
    throw new Error("DateFilterPopover must be used within ExcelTable");

  // Get current filters from context instead of local state
  const currentFilters = React.useMemo(
    () => context.dateFilters[String(columnIndex)] || [],
    [context.dateFilters, columnIndex]
  );
  const hasActiveFilter = currentFilters.length > 0;
  const [filterMode, setFilterMode] = React.useState<
    "hierarchy" | "relative" | "custom"
  >("hierarchy");
  const [customDate, setCustomDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [selectedRelative, setSelectedRelative] =
    React.useState<RelativeDateType>("today");
  const [selectedFilters, setSelectedFilters] =
    React.useState<DateFilter[]>(currentFilters);

  // Sync selectedFilters with context when currentFilters change
  React.useEffect(() => {
    setSelectedFilters(currentFilters);
  }, [currentFilters]);
  const [_selectedDates, _setSelectedDates] = React.useState<Set<string>>(
    new Set()
  );
  const [dateHierarchy, setDateHierarchy] = React.useState<DateHierarchy[]>([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const relativeOptions: {
    value: RelativeDateType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { value: "today", label: "Today", icon: <Calendar className="h-3 w-3" /> },
    {
      value: "yesterday",
      label: "Yesterday",
      icon: <Calendar className="h-3 w-3" />,
    },
    {
      value: "thisWeek",
      label: "This Week",
      icon: <CalendarDays className="h-3 w-3" />,
    },
    {
      value: "lastWeek",
      label: "Last Week",
      icon: <CalendarDays className="h-3 w-3" />,
    },
    {
      value: "thisMonth",
      label: "This Month",
      icon: <CalendarDays className="h-3 w-3" />,
    },
    {
      value: "lastMonth",
      label: "Last Month",
      icon: <CalendarDays className="h-3 w-3" />,
    },
    {
      value: "thisYear",
      label: "This Year",
      icon: <CalendarDays className="h-3 w-3" />,
    },
    {
      value: "lastYear",
      label: "Last Year",
      icon: <CalendarDays className="h-3 w-3" />,
    },
  ];

  // Build hierarchical date structure from unique values
  React.useEffect(() => {
    // Use callback to avoid reading from dateHierarchy state directly
    setDateHierarchy((prevHierarchy) => {
      const hierarchy: DateHierarchy[] = [];
      const yearMap = new Map<number, DateHierarchy>();

      // Create a map of existing state to preserve selection
      const existingState = new Map<string, { selected: boolean }>();
      prevHierarchy.forEach((year: DateHierarchy) => {
        existingState.set(`year-${year.year}`, { selected: year.selected });
        year.months.forEach((month: DateHierarchy["months"][0]) => {
          existingState.set(`month-${year.year}-${month.month}`, {
            selected: month.selected,
          });
          month.days.forEach((day: DateHierarchy["months"][0]["days"][0]) => {
            existingState.set(`day-${day.fullDate}`, {
              selected: day.selected,
            });
          });
        });
      });

      uniqueValues.forEach((dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return;

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        if (!yearMap.has(year)) {
          const existingYearState = existingState.get(`year-${year}`);
          const yearData: DateHierarchy = {
            year,
            months: [],
            selected: existingYearState?.selected || false,
          };
          yearMap.set(year, yearData);
          hierarchy.push(yearData);
        }

        const yearData = yearMap.get(year)!;
        let monthData = yearData.months.find((m) => m.month === month);

        if (!monthData) {
          const existingMonthState = existingState.get(
            `month-${year}-${month}`
          );
          monthData = {
            month,
            monthName: monthNames[month],
            days: [],
            selected: existingMonthState?.selected || false,
          };
          yearData.months.push(monthData);
        }

        const existingDayState = existingState.get(`day-${dateStr}`);
        monthData.days.push({
          day,
          fullDate: dateStr,
          selected: existingDayState?.selected || false,
        });
      });

      // Sort everything
      hierarchy.sort((a, b) => b.year - a.year); // Most recent first
      hierarchy.forEach((year) => {
        year.months.sort((a, b) => b.month - a.month); // Most recent first
        year.months.forEach((month) => {
          month.days.sort((a, b) => b.day - a.day); // Most recent first
        });
      });

      return hierarchy;
    });
  }, [uniqueValues]);

  // Handle year selection
  const handleYearToggle = React.useCallback(
    (yearIndex: number, checked?: boolean | "indeterminate") => {
      setDateHierarchy((prev: DateHierarchy[]) => {
        const newHierarchy = [...prev];
        const yearData = newHierarchy[yearIndex];
        yearData.selected =
          checked === true
            ? true
            : checked === false
            ? false
            : !yearData.selected;

        // Update all months and days
        yearData.months.forEach((month: DateHierarchy["months"][0]) => {
          month.selected = yearData.selected;
          month.days.forEach((day: DateHierarchy["months"][0]["days"][0]) => {
            day.selected = yearData.selected;
          });
        });

        return newHierarchy;
      });
    },
    []
  );

  // Handle month selection
  const handleMonthToggle = React.useCallback(
    (
      yearIndex: number,
      monthIndex: number,
      checked?: boolean | "indeterminate"
    ) => {
      setDateHierarchy((prev: DateHierarchy[]) => {
        const newHierarchy = [...prev];
        const yearData = newHierarchy[yearIndex];
        const monthData = yearData.months[monthIndex];
        monthData.selected =
          checked === true
            ? true
            : checked === false
            ? false
            : !monthData.selected;

        // Update all days in this month
        monthData.days.forEach((day: DateHierarchy["months"][0]["days"][0]) => {
          day.selected = monthData.selected;
        });

        // Update year selection based on months
        yearData.selected = yearData.months.every(
          (m: DateHierarchy["months"][0]) => m.selected
        );

        return newHierarchy;
      });
    },
    []
  );

  // Handle day selection
  const handleDayToggle = React.useCallback(
    (
      yearIndex: number,
      monthIndex: number,
      dayIndex: number,
      checked?: boolean | "indeterminate"
    ) => {
      setDateHierarchy((prev: DateHierarchy[]) => {
        const newHierarchy = [...prev];
        const yearData = newHierarchy[yearIndex];
        const monthData = yearData.months[monthIndex];
        const dayData = monthData.days[dayIndex];
        dayData.selected =
          checked === true
            ? true
            : checked === false
            ? false
            : !dayData.selected;

        // Update month selection based on days
        monthData.selected = monthData.days.every(
          (d: DateHierarchy["months"][0]["days"][0]) => d.selected
        );

        // Update year selection based on months
        yearData.selected = yearData.months.every(
          (m: DateHierarchy["months"][0]) => m.selected
        );

        return newHierarchy;
      });
    },
    []
  );

  // Note: Expand/collapse is now handled by Accordion components

  const [filterType, setFilterType] =
    React.useState<DateFilterType>("relative");

  const handleAddFilter = React.useCallback(() => {
    const newFilter: DateFilter = {
      type: filterType,
      ...(filterType === "equals" && { value: customDate }),
      ...(filterType === "before" && { value: customDate }),
      ...(filterType === "after" && { value: customDate }),
      ...(filterType === "between" && { startDate, endDate }),
      ...(filterType === "relative" && { relative: selectedRelative }),
    };

    if (
      filterType === "relative" ||
      (filterType === "between" && startDate && endDate) ||
      (["equals", "before", "after"].includes(filterType) && customDate)
    ) {
      setSelectedFilters((prev) => [...prev, newFilter]);
    }
  }, [filterType, customDate, startDate, endDate, selectedRelative]);

  const removeFilter = (index: number) => {
    setSelectedFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const applyFilters = () => {
    if (filterMode === "hierarchy") {
      const selectedDates: string[] = [];

      dateHierarchy.forEach((year: DateHierarchy) => {
        year.months.forEach((month: DateHierarchy["months"][0]) => {
          month.days.forEach((day: DateHierarchy["months"][0]["days"][0]) => {
            if (day.selected) {
              selectedDates.push(day.fullDate);
            }
          });
        });
      });

      // Always apply filters - if no dates selected, pass empty array to clear filters
      const filters: DateFilter[] = selectedDates.map((date) => ({
        type: "equals",
        value: date,
      }));
      context.setDateFilter(String(columnIndex), filters);
    } else {
      context.setDateFilter(String(columnIndex), selectedFilters);
    }
  };

  const clearAllFilters = React.useCallback(() => {
    setSelectedFilters([]);
    setDateHierarchy((prev: DateHierarchy[]) => {
      return prev.map((year: DateHierarchy) => ({
        ...year,
        selected: false,
        months: year.months.map((month: DateHierarchy["months"][0]) => ({
          ...month,
          selected: false,
          days: month.days.map(
            (day: DateHierarchy["months"][0]["days"][0]) => ({
              ...day,
              selected: false,
            })
          ),
        })),
      }));
    });
    context.setDateFilter(String(columnIndex), []);
  }, [context, columnIndex]);

  const getFilterDescription = (filter: DateFilter): string => {
    switch (filter.type) {
      case "equals":
        return `Equals: ${filter.value}`;
      case "before":
        return `Before: ${filter.value}`;
      case "after":
        return `After: ${filter.value}`;
      case "between":
        return `Between: ${filter.startDate} - ${filter.endDate}`;
      case "relative": {
        const option = relativeOptions.find(
          (opt) => opt.value === filter.relative
        );
        return option?.label || filter.relative || "";
      }
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Date Filter
        </h4>
        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 px-2"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Mode Selector */}
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant={filterMode === "hierarchy" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterMode("hierarchy")}
            className="text-xs"
          >
            <CalendarDays className="h-3 w-3 mr-1" />
            Dates
          </Button>
          <Button
            variant={filterMode === "relative" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterMode("relative")}
            className="text-xs"
          >
            <Clock className="h-3 w-3 mr-1" />
            Quick
          </Button>
          <Button
            variant={filterMode === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterMode("custom")}
            className="text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Custom
          </Button>
        </div>

        {filterMode === "hierarchy" ? (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">
              Select Dates:
            </label>
            <div className="max-h-64 overflow-y-auto">
              {/* @ts-ignore - Radix UI accordion type issue */}
              <Accordion type="multiple" className="w-full">
                {dateHierarchy.map((year: DateHierarchy, yearIndex: number) => (
                  <AccordionItem key={year.year} value={`year-${year.year}`}>
                    <div className="flex items-center space-x-2 px-3">
                      <Checkbox
                        checked={year.selected}
                        onCheckedChange={(checked: boolean) =>
                          handleYearToggle(yearIndex, checked)
                        }
                        className="w-4 h-4"
                      />
                      {/* @ts-ignore - Radix UI accordion type issue */}
                      <AccordionTrigger className="flex-1 text-sm font-medium py-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{year.year}</span>
                        </div>
                      </AccordionTrigger>
                    </div>
                    {/* @ts-ignore - Radix UI accordion type issue */}
                    <AccordionContent>
                      <div className="pl-6 space-y-1">
                        {/* @ts-ignore - Radix UI accordion type issue */}
                        <Accordion type="multiple" className="w-full">
                          {year.months.map(
                            (
                              month: DateHierarchy["months"][0],
                              monthIndex: number
                            ) => (
                              <AccordionItem
                                key={month.month}
                                value={`month-${year.year}-${month.month}`}
                              >
                                <div className="flex items-center space-x-2 px-3">
                                  <Checkbox
                                    checked={month.selected}
                                    onCheckedChange={(checked: boolean) =>
                                      handleMonthToggle(
                                        yearIndex,
                                        monthIndex,
                                        checked
                                      )
                                    }
                                    className="w-4 h-4"
                                  />
                                  {/* @ts-ignore - Radix UI accordion type issue */}
                                  <AccordionTrigger className="flex-1 text-sm py-2">
                                    <div className="flex items-center space-x-2">
                                      <CalendarDays className="h-4 w-4" />
                                      <span>{month.monthName}</span>
                                    </div>
                                  </AccordionTrigger>
                                </div>
                                {/* @ts-ignore - Radix UI accordion type issue */}
                                <AccordionContent>
                                  <div className="pl-6 space-y-1 max-h-32 overflow-y-auto">
                                    {month.days.map(
                                      (
                                        day: DateHierarchy["months"][0]["days"][0],
                                        dayIndex: number
                                      ) => (
                                        <label
                                          key={`${day.day}-${day.fullDate}`}
                                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-sm"
                                        >
                                          <Checkbox
                                            checked={day.selected}
                                            onCheckedChange={(
                                              checked: boolean
                                            ) =>
                                              handleDayToggle(
                                                yearIndex,
                                                monthIndex,
                                                dayIndex,
                                                checked
                                              )
                                            }
                                            className="w-4 h-4"
                                          />
                                          <span className="text-gray-600">
                                            {day.day} -{" "}
                                            {new Date(
                                              day.fullDate
                                            ).toLocaleDateString()}
                                          </span>
                                        </label>
                                      )
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            )
                          )}
                        </Accordion>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ) : filterMode === "relative" ? (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">
              Quick Filters:
            </label>
            <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
              {relativeOptions.map((option) => (
                <button
                  key={option.value}
                  className={cn(
                    "text-left px-2 py-1 text-xs rounded hover:bg-gray-100 flex items-center space-x-2",
                    selectedRelative === option.value &&
                      "bg-blue-100 text-blue-700"
                  )}
                  onClick={() => setSelectedRelative(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <Button size="sm" onClick={handleAddFilter} className="w-full">
              Add Quick Filter
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1">
              {["equals", "before", "after", "between"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type as DateFilterType)}
                  className="text-xs capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>

            {filterType === "between" ? (
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    From:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    To:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Date:
                </label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded"
                />
              </div>
            )}

            <Button size="sm" onClick={handleAddFilter} className="w-full">
              Add Custom Filter
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-gray-600">
            Active Filters:
          </label>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 px-2 py-1 rounded text-xs"
              >
                <span className="text-blue-700">
                  {getFilterDescription(filter)}
                </span>
                <button
                  onClick={() => removeFilter(index)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-2 border-t">
        <Button size="sm" onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={clearAllFilters}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// Utility function to extract cell value
const extractCellValue = (
  cell: ReactNode,
  dataType: DataType
): string | number | boolean | Date => {
  if (typeof cell === "string" || typeof cell === "number") {
    const content = cell;
    switch (dataType) {
      case "number":
        return parseFloat(String(content)) || 0;
      case "date": {
        const date = new Date(String(content));
        return isNaN(date.getTime()) ? new Date() : date;
      }
      case "boolean": {
        // For filtering, treat booleans as strings
        if (typeof content === "boolean") return String(content);
        const strContent = String(content).toLowerCase();
        if (strContent === "true" || strContent === "1") return "true";
        if (strContent === "false" || strContent === "0") return "false";
        return String(Boolean(content));
      }
      default:
        return String(content);
    }
  }

  if (React.isValidElement(cell) && cell.props.children) {
    const content = cell.props.children;
    if (typeof content === "string" || typeof content === "number") {
      switch (dataType) {
        case "number":
          return parseFloat(String(content)) || 0;
        case "date": {
          const date = new Date(String(content));
          return isNaN(date.getTime()) ? new Date() : date;
        }
        case "boolean": {
          // For filtering, treat booleans as strings
          if (typeof content === "boolean") return String(content);
          const strContent = String(content).toLowerCase();
          if (strContent === "true" || strContent === "1") return "true";
          if (strContent === "false" || strContent === "0") return "false";
          return String(Boolean(content));
        }
        default:
          return String(content);
      }
    }
  }
  return "";
};

// Main ExcelTable Component
interface ExcelTableProps extends React.ComponentPropsWithoutRef<"table"> {
  children: ReactNode;
  className?: string;
}

export function ExcelTable({ children, className, ...props }: ExcelTableProps) {
  const [filters, setFilters] = React.useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = React.useState<
    Record<string, DateFilter[]>
  >({});
  const [sorts, setSorts] = React.useState<Record<string, SortDirection>>({});
  const [columnTypes, setColumnTypes] = React.useState<
    Record<string, DataType>
  >({});
  const [rawRows, setRawRows] = React.useState<ReactNode[]>([]);
  const [headerRefs, setHeaderRefs] = React.useState<
    Record<string, HTMLElement>
  >({});

  const setFilter = React.useCallback((column: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [column]: values }));
  }, []);

  const setDateFilter = React.useCallback(
    (column: string, filters: DateFilter[]) => {
      setDateFilters((prev) => ({ ...prev, [column]: filters }));
    },
    []
  );

  const setSort = React.useCallback(
    (column: string, direction: SortDirection) => {
      setSorts((prev) => {
        // Excel-style: Clear other sorts when sorting a new column
        if (direction === null) {
          // If clearing this column, remove it from sorts
          const newSorts = { ...prev };
          delete newSorts[column];
          return newSorts;
        } else {
          // If setting a direction, clear all other sorts and set this one
          return { [column]: direction };
        }
      });
    },
    []
  );

  const registerColumn = React.useCallback(
    (column: string, dataType: DataType) => {
      setColumnTypes((prev) => ({ ...prev, [column]: dataType }));
    },
    []
  );

  const setHeaderRef = React.useCallback(
    (index: string, element: HTMLElement) => {
      setHeaderRefs((prev) => ({ ...prev, [index]: element }));
    },
    []
  );

  const getFilteredAndSortedData = React.useCallback((): ReactNode[] => {
    let processedRows = [...rawRows];

    // Apply regular filters
    Object.entries(filters).forEach(([columnIndex, filterValues]) => {
      if (filterValues.length === 0) return;

      processedRows = processedRows.filter((row) => {
        if (!React.isValidElement(row)) return true;

        const cells = React.Children.toArray(row.props.children);
        const cellValue = extractCellValue(
          cells[parseInt(columnIndex)],
          columnTypes[columnIndex] || "string"
        );

        return filterValues.includes(String(cellValue));
      });
    });

    // Apply date filters
    Object.entries(dateFilters).forEach(([columnIndex, filterList]) => {
      if (filterList.length === 0) return;

      processedRows = processedRows.filter((row) => {
        if (!React.isValidElement(row)) return true;

        const cells = React.Children.toArray(row.props.children);
        const cellValue = extractCellValue(
          cells[parseInt(columnIndex)],
          columnTypes[columnIndex] || "string"
        );

        if (columnTypes[columnIndex] === "date") {
          if (cellValue instanceof Date && !isNaN(cellValue.getTime())) {
            return filterList.some((filter) =>
              matchesDateFilter(cellValue, filter)
            );
          }
          // If it's a date column but not a valid date, exclude it from results
          return false;
        }

        return true;
      });
    });

    // Apply sorting - now single column only (Excel-style)
    const sortEntries = Object.entries(sorts).filter(
      ([, direction]) => direction !== null && direction !== undefined
    );
    if (sortEntries.length > 0) {
      // Should only be one entry now due to Excel-style single column sorting
      const [columnIndex, direction] = sortEntries[0];

      processedRows.sort((a, b) => {
        if (!React.isValidElement(a) || !React.isValidElement(b)) return 0;

        const aCells = React.Children.toArray(a.props.children);
        const bCells = React.Children.toArray(b.props.children);

        const aValue = extractCellValue(
          aCells[parseInt(columnIndex)],
          columnTypes[columnIndex] || "string"
        );
        const bValue = extractCellValue(
          bCells[parseInt(columnIndex)],
          columnTypes[columnIndex] || "string"
        );

        // Improved comparison logic to handle different types better
        let comparison = 0;

        // Handle null/undefined values - put them at the end
        if (aValue == null && bValue == null) comparison = 0;
        else if (aValue == null) comparison = 1;
        else if (bValue == null) comparison = -1;
        else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          // String comparison
          const aStr = String(aValue).toLowerCase();
          const bStr = String(bValue).toLowerCase();
          if (aStr < bStr) comparison = -1;
          else if (aStr > bStr) comparison = 1;
          else comparison = 0;
        }

        return direction === "desc" ? -comparison : comparison;
      });
    }

    return processedRows;
  }, [rawRows, filters, dateFilters, sorts, columnTypes]);

  const contextValue: TableContextType = React.useMemo(
    () => ({
      filters,
      dateFilters,
      sorts,
      setFilter,
      setDateFilter,
      setSort,
      registerColumn,
      getFilteredAndSortedData,
      rawRows,
      setRawRows,
      columnTypes,
      headerRefs,
      setHeaderRef,
    }),
    [
      filters,
      dateFilters,
      sorts,
      rawRows,
      columnTypes,
      headerRefs,
      getFilteredAndSortedData,
      setFilter,
      setDateFilter,
      setSort,
      registerColumn,
      setRawRows,
      setHeaderRef,
    ]
  ); // Include all callback dependencies

  return (
    <TableContext.Provider value={contextValue}>
      <div className={cn("rounded-md border", className)}>
        <Table>{children}</Table>
      </div>
    </TableContext.Provider>
  );
}

// ExcelTableHeader Component
interface ExcelTableHeaderProps extends React.ComponentPropsWithoutRef<"th"> {
  children: ReactNode;
  className?: string;
}

export function ExcelTableHeader({
  children,
  className,
  ...props
}: ExcelTableHeaderProps) {
  return (
    <TableHeader
      className={className}
      {...(props as React.ComponentPropsWithoutRef<"thead">)}
    >
      {children}
    </TableHeader>
  );
}

// ExcelTableHead Component
interface ExcelTableHeadProps extends React.ComponentPropsWithoutRef<"thead"> {
  children: ReactNode;
  filterable?: boolean;
  sortable?: boolean;
  dataType?: DataType;
}

export function ExcelTableHead({
  children,
  filterable = false,
  sortable = false,
  dataType = "string",
  ...props
}: ExcelTableHeadProps) {
  const context = React.useContext(TableContext);
  const [columnIndex, setColumnIndex] = React.useState<string>("");
  const [uniqueValues, setUniqueValues] = React.useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [headerElement, setHeaderElement] = React.useState<HTMLElement | null>(
    null
  );

  // Find column index dynamically
  React.useEffect(() => {
    if (!context || !headerElement) return;

    const headerRow = headerElement.parentElement;
    if (headerRow) {
      const headers = Array.from(headerRow.children) as HTMLElement[];
      const index = headers.indexOf(headerElement).toString();
      if (index !== columnIndex) {
        setColumnIndex(index);
        context.registerColumn(index, dataType);
        context.setHeaderRef(index, headerElement);
      }
    }
  }, [headerElement, dataType, context, columnIndex]); // Include columnIndex to prevent unnecessary updates

  // Extract unique values for filtering - use a ref to track previous length
  const previousRowsLength = React.useRef(0);
  React.useEffect(() => {
    if (!context || !columnIndex || !context.rawRows) return;

    // Only update if the number of rows changed to avoid unnecessary recalculations
    const currentLength = context.rawRows.length;

    if (
      currentLength === previousRowsLength.current &&
      previousRowsLength.current > 0
    )
      return;

    previousRowsLength.current = currentLength;

    const values = new Set<string>();
    context.rawRows.forEach((row) => {
      if (React.isValidElement(row)) {
        const cells = React.Children.toArray(row.props.children);
        const cellValue = extractCellValue(
          cells[parseInt(columnIndex)],
          dataType
        );
        if (
          dataType === "date" &&
          cellValue instanceof Date &&
          !isNaN(cellValue.getTime())
        ) {
          // normalize date values to YYYY-MM-DD for consistent parsing later
          values.add(formatDate(cellValue));
        } else {
          values.add(String(cellValue));
        }
      }
    });
    const sortedValues = Array.from(values).sort();
    setUniqueValues(sortedValues);
  }, [context?.rawRows?.length, columnIndex, dataType]); // Only depend on length, not the full array

  // Sync selectedFilters with context filters - use ref to prevent infinite loops
  const previousFilters = React.useRef<string[]>([]);
  React.useEffect(() => {
    if (!context || !columnIndex) return;
    const contextFilters = context.filters[columnIndex] || [];

    // Only update if the filters actually changed
    if (
      JSON.stringify(contextFilters) !== JSON.stringify(previousFilters.current)
    ) {
      previousFilters.current = contextFilters;
      setSelectedFilters(contextFilters);
    }
  }, [context?.filters?.[columnIndex], columnIndex]); // Only monitor this specific column's filters

  const handleSort = () => {
    if (!context || !columnIndex) return;

    const currentSort = context.sorts[columnIndex];
    let newDirection: SortDirection;

    // Three-state cycle: null → asc → desc → null
    if (currentSort === null || currentSort === undefined) {
      newDirection = "asc";
    } else if (currentSort === "asc") {
      newDirection = "desc";
    } else {
      newDirection = null;
    }

    context.setSort(columnIndex, newDirection);
  };

  const handleFilter = () => {
    if (!context || !columnIndex) return;
    context.setFilter(columnIndex, selectedFilters);
    setIsPopoverOpen(false);
  };

  const clearFilter = () => {
    if (!context || !columnIndex) return;
    setSelectedFilters([]);
    context.setFilter(columnIndex, []);
  };

  const currentSort = context?.sorts[columnIndex];
  const hasActiveFilter = (context?.filters[columnIndex]?.length ?? 0) > 0;
  const hasActiveDateFilter = (context?.dateFilters[columnIndex]?.length ?? 0) > 0;

  return (
    <TableHead ref={setHeaderElement as React.Ref<HTMLTableCellElement>} {...(props as React.ThHTMLAttributes<HTMLTableCellElement>)}>
      <div className="flex items-center space-x-2">
        <span>{children}</span>

        {(filterable || sortable) && (
          <div className="flex items-center space-x-1">
            {sortable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleSort}
              >
                {currentSort === "asc" ? (
                  <ChevronUp className="h-3 w-3" />
                ) : currentSort === "desc" ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3 opacity-50" />
                )}
              </Button>
            )}

            {filterable && dataType === "date" ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                {/* @ts-ignore - Radix UI popover type issue */}
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-6 w-6 p-0",
                      hasActiveDateFilter && "text-blue-600"
                    )}
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="max-h-[300px] overflow-auto">
                    <DateFilterPopover
                      columnIndex={Number(columnIndex)}
                      uniqueValues={uniqueValues}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            ) : filterable ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                {/* @ts-ignore - Radix UI popover type issue */}
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-6 w-6 p-0",
                      hasActiveFilter && "text-blue-600"
                    )}
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Filter</h4>
                      {hasActiveFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilter}
                          className="h-6 px-2"
                        >
                          <X className="h-3 w-3" />
                          Clear
                        </Button>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-2 py-1 text-sm border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {uniqueValues
                        .filter(value => 
                          String(value).toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((value) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`filter-${value}`}
                            checked={selectedFilters.includes(value)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setSelectedFilters((prev) => [...prev, value]);
                              } else {
                                setSelectedFilters((prev) =>
                                  prev.filter((v) => v !== value)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`filter-${value}`}
                            className="text-sm cursor-pointer flex-1 truncate"
                          >
                            {dataType === "boolean"
                              ? value === "true" ||
                                value === "yes" ||
                                value === "Yes"
                                ? "✓ True"
                                : value === "false" ||
                                  value === "no" ||
                                  value === "No"
                                ? "✗ False"
                                : value
                              : value || "(Empty)"}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2 mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        onClick={handleFilter}
                        className="flex-1"
                      >
                        Apply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsPopoverOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        )}
      </div>
    </TableHead>
  );
}

// ExcelTableBody Component
interface ExcelTableBodyProps extends React.ComponentPropsWithoutRef<"tbody"> {
  children: ReactNode;
}

export function ExcelTableBody({ children, ...props }: ExcelTableBodyProps) {
  const context = React.useContext(TableContext);

  // Use useMemo to memoize the rows array to prevent unnecessary updates
  const rows = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // Use a ref to track if we've already set the rows to prevent infinite loops
  const rowsSetRef = React.useRef(false);
  const lastRowsRef = React.useRef<ReactNode[]>([]);

  React.useEffect(() => {
    if (context) {
      // Only update if the count of rows actually changed - avoid JSON.stringify on React elements
      const currentRowCount = rows.length;
      const _currentChildrenCount = React.Children.count(children);

      if (
        currentRowCount !== lastRowsRef.current.length ||
        !rowsSetRef.current
      ) {
        lastRowsRef.current = rows;
        rowsSetRef.current = true;
        context.setRawRows(rows);
      }
    }
  }, [rows, context]);

  if (!context) return null;

  const processedRows = React.useMemo(
    () => context.getFilteredAndSortedData(),
    [context]
  );

  return <TableBody {...props}>{processedRows}</TableBody>;
}

// ExcelTableRow Component
interface ExcelTableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  children: ReactNode;
}

export function ExcelTableRow({ children, ...props }: ExcelTableRowProps) {
  return <TableRow {...props}>{children}</TableRow>;
}

// ExcelTableCell Component
interface ExcelTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: ReactNode;
}

export function ExcelTableCell({ children, ...props }: ExcelTableCellProps) {
  return <TableCell {...props}>{children}</TableCell>;
}
