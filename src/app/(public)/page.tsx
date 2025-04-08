import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Postspage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-20 px-4">
      <p className="text-lg text-gray-600 mb-2">
        ワンちゃんとの快適な移動のために
      </p>
      <Avatar className="w-15 h-15">
        <AvatarImage src="/images/dog.jpg" />
        <AvatarFallback>dog-name</AvatarFallback>
      </Avatar>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
        Dogital Drivers
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-blue-400 mb-8 font-bold text-center">
        ワンちゃんがリラックスする音を聞かせて、<br />
        お出かけ時のストレスを軽減
      </p>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center">
        条件反射を利用したトレーニング
      </p>

      <div className="flex space-x-10 mb-30">
        <Link href="#card1">
          <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            ▶トレーニング<br />（練習）モード
          </button>
        </Link>
        <Link href="#card2">
          <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            ▶お出かけ<br />（本番）モード
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <div id="card1" className="w-full max-w-sm bg-gray-200 shadow-md p-6 rounded-full mb-8">
            <h2 className="text-xl font-bold mb-2">トレーニング（練習）モード</h2>
        </div>


        <div className="w-full max-w-sm bg-blue-100 shadow-md p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-2">pre-Step 1</h2>
            <p>ワンちゃんの準備、スタート！</p>

            <div className="flex flex-col gap-4">
              <Link href="/music">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶音楽を選ぶ
              </button>
              </Link>
              <Link href="/engine">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶エンジン音
              </button>
              </Link>
            </div>
        </div>  

        <div className="w-full max-w-sm bg-blue-100 shadow-md p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-2">pre-Step 2</h2>
            <p>タイマーセット</p>

            <div className="flex flex-col gap-4">
              {/* <Link href="/music"> */}
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ５～３０分
              </button>
              {/*</Link>*/}
             
            </div>
        </div>

        <div className="w-full max-w-sm bg-blue-100 shadow-md p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-2">pre-Step 3</h2>
            <p>カウントダウン</p>

            {/*
            <div className="flex flex-col gap-4">
              <Link href="/music">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶音楽を選ぶ
              </button>
              </Link>
              <Link href="/engine">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶エンジン音
              </button>
              </Link>
            </div>

            */}
        </div>


        <div className="w-full max-w-sm bg-blue-100 shadow-md p-6 rounded-xl mb-30">
            <h2 className="text-xl font-bold mb-2">pre-Step 4</h2>
            <p>ワンちゃんの反応は？</p>

            {/*
            <div className="flex flex-col gap-4">
              <Link href="/music">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶音楽を選ぶ
              </button>
              </Link>
              <Link href="/engine">
              <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶エンジン音
              </button>
              </Link>
            </div>

            */}
        </div>






        <div id="card2" className="w-full max-w-sm bg-gray-200 shadow-md p-6 rounded-full mb-8">
            <h2 className="text-xl font-bold mb-2">お出かけ（本番）モード</h2>
        </div>

        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 1</h2>
          <p>ワンちゃんのリラックス♫</p>

          <Link href="/music2">
          <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            ▶音楽を選ぶ
          </button>
          </Link>
        </div>  


        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 2</h2>
          <p>お出かけまで、あと何分？</p>

          {/* <Link href="/music"> */}
          <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            ５～３０分
          </button>
          { /* </Link> */}
        </div>  

        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 1</h2>
          <p>カウントダウン</p>

          {/*
          <Link href="/music">
          <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
            ▶音楽を選ぶ
          </button>
          </Link> */}
        </div> 





      </div>
    </div>
  )
}
