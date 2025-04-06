import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Odekakepage() {
    return (
      <div className="text-2xl">
        <h1>トレーニングモードのエンジン音</h1>
        <p>エンジン音のページです</p>

        <Link href="/">
            <Button className="bg-green-300 text-black cursor-pointer hover:bg-green-400">
                ←　戻る
            </Button>
        </Link>
      </div>
    )
  }
  