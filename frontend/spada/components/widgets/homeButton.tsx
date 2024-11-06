import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
 
export default function HomeButton() {
    return (
      <Button 
        className="p-4 m-4 [&_svg]:size-7 w-10 h-10"
      >
        <Link href="/home"><Home className=""/></Link>
      </Button>
    )
  }