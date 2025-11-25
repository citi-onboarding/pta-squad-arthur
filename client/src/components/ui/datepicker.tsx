"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from '@/assets'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Calendar22Props {
  selectedDate?: Date
  onDateChange: (date: Date | undefined) => void
}

export function Calendar22({ selectedDate, onDateChange }: Calendar22Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-28 h-12 flex items-center justify-between font-bold px-3"
            >
            {selectedDate ? (
                selectedDate.toLocaleDateString()
            ) : (
                <div className="flex-1 flex justify-center">
                <img src={CalendarIcon.src} alt="Calendar" className="w-5 h-5" />
                </div>
            )}
  <ChevronDownIcon />
</Button>
        </PopoverTrigger>

        <PopoverContent className="w-[17rem] overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              onDateChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}