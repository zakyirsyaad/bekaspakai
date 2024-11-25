"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function BankList({ onSelectBank }) { // Tambahkan onSelectBank sebagai prop
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [banks, setBanks] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    // Fetch bank data from API on component mount
    React.useEffect(() => {
        const fetchBanks = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/xendit/bank`)
                if (response.ok) {
                    const data = await response.json()
                    setBanks(data.data || [])
                } else {
                    console.error("Failed to fetch banks")
                }
            } catch (error) {
                console.error("Error fetching banks:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchBanks()
    }, [])

    const handleSelect = (bankCode) => {
        setValue(bankCode)
        setOpen(false)
        onSelectBank(bankCode) // Kirim data bank yang dipilih ke komponen induk
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? banks.find((bank) => bank.channel_code === value)?.channel_name
                        : "Nama Bank"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-96 lg:w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Cari Bank..." />
                    <CommandList>
                        {loading ? (
                            <CommandEmpty>Loading...</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {banks.map((bank) => (
                                    <CommandItem
                                        key={bank.channel_code}
                                        value={bank.channel_code}
                                        onSelect={() => handleSelect(bank.channel_code)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === bank.channel_code ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {bank.channel_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
