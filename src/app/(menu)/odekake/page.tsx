import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Odekakepage() {
    return (
      <div className="text-2xl">
        <h1>お出かけ</h1>
        <p>本番ページです</p>

        <Link href="/">
            <Button className="bg-green-300 text-black cursor-pointer hover:bg-green-400">
                ←　戻る
            </Button>
        </Link>
      </div>
    )
  }
  