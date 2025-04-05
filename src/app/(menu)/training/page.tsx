import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Trainigpage() {
    return (
        <div className="text-2xl">
        <h1>トレーニング</h1>
        <p>練習ページです</p>

        <Link href="/">
            <Button className="bg-blue-300 text-black cursor-pointer hover:bg-blue-400">
                ←　戻る
            </Button>
        </Link>
      </div>

    )
  }
  