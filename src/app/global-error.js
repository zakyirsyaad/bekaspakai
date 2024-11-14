'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Error boundaries must be Client Components
export default function GlobalError() {
  const router = useRouter();

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <div className="flex gap-2">
          <Button onClick={() => reset()}>Try again</Button>
          <Button onClick={() => router.push('/')}>Home</Button>
        </div>
      </body>
    </html>
  )
}