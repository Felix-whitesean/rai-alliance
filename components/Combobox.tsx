import React from 'react'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem
} from "@/components/ui/select";

import { ROLE_TYPES, select_groups } from "@/constants";
import {useFormContext} from "react-hook-form";

interface DynamicSelectProps {
    selectGroupKey: keyof typeof select_groups; // "roles" or "editors"
    field: any;
}
const groupOptionsMap: Record<keyof typeof select_groups, Record<string, string>> = {
    roles: ROLE_TYPES,
    editors: ROLE_TYPES, // Replace if you have a different set for editors
};

export function Combobox({ selectGroupKey, field }: DynamicSelectProps) {
    const { control } = useFormContext();
    const options = groupOptionsMap[selectGroupKey];

    return (
        <Select onValueChange={field.onChange} value={field.value || ""}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={`Select ${select_groups[selectGroupKey].toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{select_groups[selectGroupKey]}</SelectLabel>
                    {Object.entries(options).map(([label, value]) => (
                        <SelectItem key={value} value={value}>
                            {label.replace(/_/g, " ")}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

