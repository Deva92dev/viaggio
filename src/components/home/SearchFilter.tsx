"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, SearchIcon } from "lucide-react";

const SearchFilter = () => {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[]>([500, 10000]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) {
      params.set("destination", destination);
      params.set("country", destination);
    }

    // Ensure the current date is used if only one date is selected for robustness, though UI prevents this
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const checkInToSend =
      checkInDate && checkInDate >= today ? checkInDate : undefined;
    const checkOutToSend =
      checkOutDate && checkInToSend && checkOutDate > checkInToSend
        ? checkOutDate
        : undefined;

    if (checkInToSend)
      params.set("checkIn", format(checkInToSend, "yyyy-MM-dd"));
    if (checkOutToSend)
      params.set("checkOut", format(checkOutToSend, "yyyy-MM-dd"));

    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));

    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-xl w-full space-y-6 border border-gray-200">
      {/* Inputs Row: Stacks vertically by default, row on medium screens+ */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-end">
        {/* Destination Input */}
        <div className="flex-grow w-full space-y-1.5">
          <Label
            htmlFor="destination"
            className="text-sm font-medium text-gray-700"
          >
            Where to?
          </Label>
          <Input
            id="destination"
            placeholder="enter destination or country"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Check-in Date Picker */}
        <div className="w-full md:w-auto space-y-1.5">
          <Label
            htmlFor="checkin-date"
            className="text-sm font-medium text-gray-700"
          >
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="checkin-date"
                variant={"outline"}
                className={cn(
                  "w-full md:w-[150px] lg:w-[180px] justify-start text-left font-normal cursor-pointer",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? (
                  format(checkInDate, "MMM dd, yyyy")
                ) : (
                  <span>Add date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
                className="bg-white"
                classNames={{
                  head: "flex w-full justify-between mb-2",
                  head_cell:
                    "text-muted-foreground w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-1 relative [&:has([aria-selected])]:bg-accent",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 hover:text-blue-600",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date Picker */}
        <div className="w-full md:w-auto space-y-1.5">
          <Label
            htmlFor="checkout-date"
            className="text-sm font-medium text-gray-700"
          >
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="checkout-date"
                variant={"outline"}
                className={cn(
                  "w-full md:w-[150px] lg:w-[180px] justify-start text-left font-normal cursor-pointer", // Adjusted width
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? (
                  format(checkOutDate, "MMM dd, yyyy")
                ) : (
                  <span>Add date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) =>
                  (checkInDate && date <= checkInDate) ||
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
                className="bg-white"
                classNames={{
                  head: "flex w-full justify-between mb-2",
                  head_cell:
                    "text-muted-foreground w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-1 relative [&:has([aria-selected])]:bg-accent",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 hover:text-blue-600",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          size="lg"
          className="w-full md:w-auto cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6"
          aria-label="Search"
        >
          <SearchIcon className="h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">Search</span>
        </Button>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-gray-200/80">
        <Label className="text-sm font-medium text-gray-700">Price Range</Label>
        <Slider
          value={priceRange}
          min={500}
          max={10000}
          step={500}
          onValueChange={(value) => setPriceRange(value)}
          className="cursor-pointer"
          aria-label={`Price range between $${priceRange[0]} and $${priceRange[1]}`}
        />
        {/* Price Labels: Stack vertically on small screens, row on sm+ */}
        <div className="flex flex-col text-center text-xs text-gray-500 space-y-1 sm:flex-row sm:justify-between sm:space-y-0 sm:text-sm">
          <span className="sm:text-left">Min: ${priceRange[0]}</span>
          <span className="sm:text-right">Max: ${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
