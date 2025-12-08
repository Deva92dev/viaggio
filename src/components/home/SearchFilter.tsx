"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  CalendarIcon,
  SearchIcon,
  MapPinIcon,
  DollarSignIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import MotionSection from "./MotionSection";

const SearchFilter = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  return (
    <MotionSection
      animation={{
        type: "slide",
        direction: "up",
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      }}
      mobile={{
        disableParallax: true,
        disableAnimations: false,
        simpleAnimation: "fade",
        breakPoint: 768,
        reducedMotion: true,
      }}
      triggerOnce={true}
      threshold={0.2}
      className={`relative p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[hsl(var(--primary))/0.1] w-full space-y-6 border border-white/20 transition-all duration-300 ${
        isPending ? "opacity-70 pointer-events-none" : ""
      }`}
    >
      {/* Decorative gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10" />
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl">
          <SearchIcon className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-black tracking-tight">
          Find Your Perfect Adventure
        </h2>
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
        <div className="flex-grow w-full space-y-2">
          <Label
            htmlFor="destination"
            className="text-sm font-semibold text-[hsl(var(--primary))] flex items-center gap-2"
          >
            <MapPinIcon className="h-4 w-4" />
            Where to?
          </Label>
          <div className="relative">
            <Input
              id="destination"
              placeholder="Enter destination or country"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-12 pl-4 pr-4 bg-white/90 border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))/0.2] rounded-xl text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-300"
            />
          </div>
        </div>
        <div className="w-full lg:w-auto space-y-2">
          <Label
            htmlFor="checkin-date"
            className="text-sm font-semibold text-[hsl(var(--primary))]"
          >
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="checkin-date"
                variant="outline"
                className={cn(
                  "w-full lg:w-[180px] h-12 justify-start text-left font-medium bg-white/90 border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/0.05] transition-all duration-300 rounded-xl",
                  !checkInDate && "text-[hsl(var(--muted-foreground))]"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-[hsl(var(--primary))]" />
                {checkInDate ? (
                  <span className="text-[hsl(var(--foreground))]">
                    {format(checkInDate, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-2 border-[hsl(var(--border))] rounded-xl shadow-xl">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
                className="bg-white rounded-xl"
                classNames={{
                  head: "flex w-full justify-between mb-2",
                  head_cell:
                    "text-[hsl(var(--muted-foreground))] w-9 font-medium text-sm",
                  row: "flex w-full mt-1",
                  cell: "text-center text-sm p-1 relative [&:has([aria-selected])]:bg-[hsl(var(--primary))/0.1]",
                  day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-[hsl(var(--primary))/0.1] hover:text-[hsl(var(--primary))] rounded-lg transition-colors",
                  day_selected:
                    "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))] hover:text-white",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full lg:w-auto space-y-2">
          <Label
            htmlFor="checkout-date"
            className="text-sm font-semibold text-[hsl(var(--primary))]"
          >
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="checkout-date"
                variant="outline"
                className={cn(
                  "w-full lg:w-[180px] h-12 justify-start text-left font-medium bg-white/90 border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/0.05] transition-all duration-300 rounded-xl",
                  !checkOutDate && "text-[hsl(var(--muted-foreground))]"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-[hsl(var(--primary))]" />
                {checkOutDate ? (
                  <span className="text-[hsl(var(--foreground))]">
                    {format(checkOutDate, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-2 border-[hsl(var(--border))] rounded-xl shadow-xl">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) =>
                  (checkInDate && date <= checkInDate) ||
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
                className="bg-white rounded-xl"
                classNames={{
                  head: "flex w-full justify-between mb-2",
                  head_cell:
                    "text-[hsl(var(--muted-foreground))] w-9 font-medium text-sm",
                  row: "flex w-full mt-1",
                  cell: "text-center text-sm p-1 relative [&:has([aria-selected])]:bg-[hsl(var(--primary))/0.1]",
                  day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-[hsl(var(--primary))/0.1] hover:text-[hsl(var(--primary))] rounded-lg transition-colors",
                  day_selected:
                    "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))] hover:text-white",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          onClick={handleSearch}
          size="lg"
          className="btn-accent w-full lg:w-auto h-12 px-8 cursor-pointer shadow-lg shadow-[hsl(var(--accent))/0.3] hover:shadow-[hsl(var(--accent))/0.5] hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          aria-label="Search destinations"
          disabled={isPending}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <SearchIcon className="h-6 w-6 lg:mr-2 relative z-10" />
          <span className="hidden lg:inline relative z-10 font-semibold">
            {isPending ? "Searching..." : "Search"}
          </span>
        </Button>
      </div>
      <div className="space-y-4 pt-6 border-t border-[hsl(var(--border))]/30">
        <Label className="text-sm font-semibold text-[hsl(var(--primary))] flex items-center gap-2">
          <DollarSignIcon className="h-4 w-4" />
          Price Range
        </Label>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            min={500}
            max={10000}
            step={500}
            onValueChange={(value) => setPriceRange(value)}
            className="cursor-pointer"
            aria-label={`Price range between $${priceRange[0]} and $${priceRange[1]}`}
          />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="bg-[hsl(var(--primary))/0.1] px-3 py-2 rounded-lg">
                <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                  Min: ${priceRange[0].toLocaleString()}
                </span>
              </div>
              <div className="bg-[hsl(var(--accent))/0.1] px-3 py-2 rounded-lg">
                <span className="text-sm font-semibold text-[hsl(var(--accent))]">
                  Max: ${priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))] text-center sm:text-right">
              Per night • USD
            </span>
          </div>
        </div>
      </div>
      {isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin" />
            <span className="text-[hsl(var(--primary))] font-medium">
              Searching amazing destinations...
            </span>
          </div>
        </div>
      )}
    </MotionSection>
  );
};

export default SearchFilter;
