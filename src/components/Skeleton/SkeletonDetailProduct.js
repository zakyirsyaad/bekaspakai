import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDetailProduct() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-[200px] lg:h-[300px] 2xl:h-[400px]" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
