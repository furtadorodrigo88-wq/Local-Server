import { format } from "date-fns"

export function formatData (date: Date) {
    return format (date, "yyy-MM-dd")
}

// format date string from dd-mm-yyyy to yyyy-mm-dd
export function formatDataDDMMYY (date: string) {
    const [day, month, year] = date.split("-")
    return `${year}-${month}-${day}`
}