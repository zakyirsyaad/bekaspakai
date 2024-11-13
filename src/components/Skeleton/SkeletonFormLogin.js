import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonFormLogin() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-4 lg:h-6" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
