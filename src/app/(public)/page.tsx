"use client";

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from "react";

export default function Postspage() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [index, setIndex] = useState<number>(-1); // 最初は空欄状態
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const searchParams = useSearchParams();
  const musicId = searchParams.get('musicId');  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/numbers");
        const data = await res.json();
        setNumbers(data);
      } catch (error) {
        console.error("fetch error:", error);
      }
    };

    fetchData();
  }, []);



  const handleClick = () => {
    const nextIndex = (index + 1) % (numbers.length + 1); // 最後は空欄
    setIndex(nextIndex);
  };

  const display = index === numbers.length ? "" : numbers[index];

  // タイマーを開始する
  const handleStartTimer = () => {
    if (display) {
      const seconds = display * 60;
      setTimeLeft(seconds);
      setTimerActive(true);
      setTimerFinished(false);
    }
  };

  // タイマーのカウントダウン処理
  useEffect(() => {
    if (!timerActive || timeLeft === null) return;

    if (timeLeft === 0) {
      setTimerActive(false);
      setTimerFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => (prev ?? 0) - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  // 分:秒 にフォーマット
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };




  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
  }, []);

  
  useEffect(() => {
    const fetchAudio = async () => {
      if (!musicId || !audioContext) return;
      const res = await fetch(`http://localhost:8000/music/${musicId}`);
      const arrayBuffer = await res.arrayBuffer();
      const decoded = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decoded);
    };
    fetchAudio();
  }, [musicId, audioContext]);


  const startAudio = () => {
    if (audioBuffer && audioContext) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      sourceRef.current = source;
    }
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
  };



  


  
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

        <div className="w-full max-w-sm bg-blue-100 shadow-md p-6 rounded-xl mb-30">
            <h2 className="text-xl font-bold mb-2">pre-Step 2</h2>
            <p>ワンちゃんの反応は？</p>

            {/*  写真orイラストを埋め込む？？       */}
        </div>



{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}
{/* //ここから本番モード！！/// */}



        <div id="card2" className="w-full max-w-sm bg-gray-200 shadow-md p-6 rounded-full mb-8">
            <h2 className="text-xl font-bold mb-2">お出かけ（本番）モード</h2>
        </div>

        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 1</h2>
          <p>ワンちゃんのリラックス♫</p>
          
          <div id="card3">
            <div className="flex flex-col gap-4">
              <Link href="/music2">
              <button className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶音楽を選ぶ
              </button>
              </Link>



{/* ///STEP1のコーナー、上↑が音楽を選んでデータをもってくる部分 */}
{/* 下↓　再生ボタン　と　停止ボタンです */}
{/* ////再生ボタン//// */}
              <button 
                onClick={startAudio}
                className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                ▶再生
              </button>
{/* ////タイマーが機能しないので、停止処理//// */}              
              <button onClick={stopAudio}>停止</button>
            </div>
          </div>    
        </div>  



{/* STEP2のコーナー、タイマーセット　　お出かけまで、あと何分？ */}
{/* ////偽物タイマー。５～２０までの数字を返して、表示させているだけ//// */} 
        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 2</h2>
          <p>お出かけまで、あと何分？</p>
          <div className="text-4xl text-center font-bold mb-4">
              {display ? `${display} 分` : "　"}  {/* 空白 or 表示 */}
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleClick}
                className="bg-green-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
                 セット
              </button>             
            </div>
        </div>    



{/* STEP3のコーナー、カウントダウン　タイマースタート */}
{/* “開始時の▶タイマースタートと、終了時のさぁ！お出かけ”はお遊びなので、無くても大丈夫です */}

        <div className="w-full max-w-sm bg-green-100 shadow-md p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Step 3</h2>
          <p>カウントダウン</p>
          <button
              onClick={handleStartTimer}
              className={`font-bold px-6 py-3 rounded-full text-lg cursor-pointer ${
                timerFinished ? "animate-blink bg-green-400" : "bg-green-300"}`}>
              {timerFinished ? "さぁ！お出かけ ♪" : "▶タイマースタート"}
            </button>

          {timerActive && timeLeft !== null && (
            <div className="text-3xl font-bold text-blue-700">
              残り: {formatTime(timeLeft)}
            </div>
          )}
        </div>



      </div>
    </div>
  )
}
