import Link from "next/link"

export default function Postspage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-20 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Dogital Drivers
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-blue-400 mb-8 font-bold text-center">
        ワンちゃんがリラックスする音を聞かせて、<br />
        お出かけ時のストレスを軽減
      </p>  
      <div className="flex space-x-8">
        <Link href="/training">
          <button className="bg-blue-300 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            トレーニング
          </button>
        </Link>
        <Link href="/odekake">
          <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            お出かけ
          </button>
        </Link>
      </div>
    </div>
  )
}
