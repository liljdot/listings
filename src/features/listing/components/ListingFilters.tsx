import { Button, DateRangePicker, Input, Stepper } from "@/components/ui";
import { Search } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

interface Props {
    onChange: (options: {
        search: string
        dates?: DateRange
        guests: number
    }) => void
}

const ListingFilters: React.FC<Props> = ({ onChange }) => {
    const [dates, setDates] = useState<DateRange>()
    const [guests, setGuests] = useState<number>(0)
    const [search, setSearch] = useState<string>("")

    const handleSubmit = () => {
        onChange({dates, guests, search})
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center gap-2">
                <Input
                    className="w-[400px]"
                    placeholder="Search destinations"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <DateRangePicker
                    placeholder="Add dates"
                    value={dates}
                    onChange={setDates}
                    minDate={new Date()}
                />
                <Stepper
                    label="guests"
                    value={guests}
                    onChange={setGuests}
                />
                <Button onClick={handleSubmit}>
                    <Search className="size-4" />
                </Button>
            </div>
        </>
    )
}

export default ListingFilters;