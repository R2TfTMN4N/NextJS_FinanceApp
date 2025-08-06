import { AccountFilter } from "./account-filter"
import { DateFilter } from "./date-filter"

export const Filters = () => {
    return(
        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-2 lg:gap-y-0 lg:gap-x-4">
            <AccountFilter />
            <DateFilter />
        </div>
    )
}