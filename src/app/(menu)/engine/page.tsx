'use client'

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function enginepage() {
    const audio1Ref = useRef<HTMLAudioElement | null>(null);
    const audio2Ref = useRef<HTMLAudioElement | null>(null);
    const audio3Ref = useRef<HTMLAudioElement | null>(null);

    const playAudio = (ref: React.RefObject<HTMLAudioElement | null>) => {
      if (ref.current) {
        ref.current.currentTime = 0;
        ref.current.play();
      }
    };

    const stopAudio = (ref: React.RefObject<HTMLAudioElement | null>) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    };



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
                <h2 className="text-xl font-bold mb-2">エンジン音</h2>
          </div>
        </div>

        <div className="w-full max-w-sm bg-blue-100 p-6 rounded-xl mb-8">          
    
          <h2 className="text-xl font-bold mb-8">車の音に慣れよう</h2>
          
          <audio ref={audio1Ref} src="/sound/engin1.mp3" preload="auto" />
          <audio ref={audio2Ref} src="/sound/come.mp3" preload="auto" />
          <audio ref={audio3Ref} src="/sound/happy.mp3" preload="auto" />
      


          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-8">
              <button 
                onClick={() => playAudio(audio1Ref)}
                className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                エンジン音-その１
              </button>
              <button 
                onClick={() => stopAudio(audio1Ref)}
                className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                  停止
                </button>
            </div>  

            <div className="flex gap-8">
              <button 
                onClick={() => playAudio(audio2Ref)}
                className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                エンジン音-その２
              </button>
              <button 
                onClick={() => stopAudio(audio2Ref)}
                className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                  停止
              </button>
            </div>

            <div className="flex gap-8">
              <button 
                onClick={() => playAudio(audio3Ref)}
                className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                エンジン音-その３
              </button>
              <button 
                  onClick={() => stopAudio(audio3Ref)}
                  className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                    停止
              </button>
            </div>

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
  