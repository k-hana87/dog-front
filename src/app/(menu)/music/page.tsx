import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function mucispage() {
    return (
      <div className="flex flex-col items-center py-10 px-4">

        <div className="flex items-center gap-4">
          <h1 className="sm:text-4xl md:text-5xl font-bold mb-20">
            Dogital Drivers
          </h1>          
          <Avatar className="w-15 h-15">
            <AvatarImage src="images/dog.jpg" />
            <AvatarFallback>dog-name</AvatarFallback>
          </Avatar>
          <p className="text-lg text-gray-600 mb-2">
           ワンちゃんとの快適な移動のために
          </p>      
        </div>

        <div className="w-full max-w-sm mb-2">
          <div className="bg-gray-200 p-6 rounded-full mb-2">
                <h2 className="text-xl font-bold mb-2">音楽を選ぶ</h2>
          </div>
        </div>

        <div className="w-full max-w-sm bg-blue-100 p-6 rounded-xl mb-2">          
    
          <h2 className="text-xl font-bold mb-8">ワンちゃんへのおすすめ</h2>
          
          <div className="flex flex-col items-center gap-5">
            <Link href="/music">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その１
            </button>
            </Link>
            <Link href="/engine">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その２
            </button>
            </Link>
            <Link href="/engine">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その３
            </button>
            </Link>
          </div>

        </div>

        <div className="w-full max-w-sm bg-blue-100 p-6 rounded-xl mb-8">          
    
          <h2 className="text-xl font-bold mb-8">楽曲を指定する</h2>
          
          <div className="flex flex-col items-center gap-5">
            <Link href="/music">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ？？？
            </button>
            </Link>
            <Link href="/engine">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ？？？
            </button>
            </Link>
            <Link href="/engine">
            <button className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ？？？
            </button>
            </Link>
          </div>

        </div>



        <div>
          <Link href="/">
              <Button className="bg-blue-300 text-black cursor-pointer hover:bg-blue-400 rounded-full">
                  ←　戻る
              </Button>
          </Link>
        </div>
      </div>




    )
  }
  