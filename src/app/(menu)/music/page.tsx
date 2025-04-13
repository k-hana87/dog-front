"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect, useRef } from 'react';


export default function mucispage() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode | null>(null);
  const [currentGain, setCurrentGain] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const [musicId, setMusicId] = useState("");
  const sourceRef = useRef(null);

  useEffect(() => {
    const initAudio = async () => {
      const context = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 192000,
      });
      setAudioContext(context);
    };

    initAudio();
  }, []);


  // 音楽IDに応じて音声ファイルを取得
  const fetchAudio = async () => {
    if (!musicId || !audioContext) return;

    try {
      const res = await fetch(`http://localhost:8000/music/${musicId}`);
      
      // const res = await fetch(`https://app-002-step3-2-py-oshima9.azurewebsites.net/${musicId}`);
      if (!res.ok) throw new Error("音楽が見つかりません");

      const arrayBuffer = await res.arrayBuffer();
      const decoded = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decoded);
      setFileName(`music ID: ${musicId}`);
    } catch (err) {
      console.error("音声の取得に失敗しました", err);
      alert("音楽が見つかりませんでした");
    }
  };

  // 取得済みのaudioBufferを再生（フィルター付き）
  const startAudio = async () => {
    if (audioBuffer && audioContext) {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      if (sourceNode) {
        sourceNode.stop();
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // イコライザ（filter）
      const filter = audioContext.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = 8000;
      filter.gain.value = currentGain;
      filter.Q.value = 100;

      // AnalyserNode
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      // ノード接続
      source.connect(filter);
      filter.connect(analyser);
      analyser.connect(audioContext.destination);

      source.start();

      setSourceNode(source);
      setFilterNode(filter);
    }
  };

  const stopAudio = () => {
      if (sourceNode) {
        sourceNode.stop();
        setSourceNode(null);
      }
    };

  

    const handleWanButtonClick = (amplificationPercentage: number) => {
      if (filterNode && audioContext) {
        const gainInDB = 20 * Math.log10(1 + amplificationPercentage / 100);
        filterNode.gain.setValueAtTime(gainInDB, audioContext.currentTime);
        setCurrentGain(gainInDB);
      }
    };

    const handleWanOff = () => {
      if (filterNode && audioContext) {
        filterNode.gain.setValueAtTime(0, audioContext.currentTime);
        setCurrentGain(0);
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
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold mb-2">音楽を選ぶ</h2>
                <div>
                  <Link href="/#card1">
                      <Button className="bg-blue-100 text-black cursor-pointer hover:bg-blue-200 rounded-full">
                          ←　ホームに戻る
                      </Button>
                  </Link>
                </div>
            </div>
          </div>
        </div>




        <div className="w-full max-w-sm bg-blue-100 p-6 rounded-xl mb-2">          
    
          <h2 className="text-xl font-bold mb-2">ワンちゃんへのおすすめ</h2>
          
          <input
          type="text"
          value={musicId}
          onChange={(e) => setMusicId(e.target.value)}
          placeholder="音楽IDを入力（例: 002）"
          style={{ padding: "0.5rem", marginRight: "1rem" }}
          />
          <button onClick={fetchAudio}>確定！</button>
          
          <div style={{ margin: '20px 0' }}>
            <button 
              onClick={startAudio}
              className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">【再生開始】</button>
          </div>


          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => handleWanButtonClick(800)}
              className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その１
            </button>
            
            <button 
              onClick={() => handleWanButtonClick(8000)}
              className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その２
            </button>
            
            <button 
              onClick={() => handleWanButtonClick(80000)}            
              className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ワンちゃんモード　その３
            </button>
            
            <button 
              onClick={handleWanOff}
              className="bg-blue-200 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              【ワンちゃんOFF】
            </button>
            <div style={{ margin: '20px 0' }}>
            <button onClick={stopAudio}>【停止】</button>
            </div>


          </div>

        </div>

        <div className="w-full max-w-sm bg-blue-100 p-6 rounded-xl mb-8">          
    
          <h2 className="text-xl font-bold mb-3">ワンちゃんのお気に入り</h2>
          
          <div className="flex flex-col items-center gap-5">
            <button 
              onClick={() => setMusicId("001")}
              className="bg-blue-300 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              １　ワンダホー How we move dog
            </button>
           
            <button 
              onClick={() => setMusicId("002")}
              className="bg-blue-300 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ２　Peace & Honda
            </button>
           
            <button 
              onClick={() => setMusicId("003")}
              className="bg-blue-300 font-bold px-6 py-3 rounded-full text-lg cursor-pointer">
              ３　The Power of Reggae
            </button>
           
          </div>

        </div>



        <div>
          <Link href="/#card1">
              <Button className="bg-blue-300 text-black cursor-pointer hover:bg-blue-400 rounded-full">
                  ←　戻る
              </Button>
          </Link>
        </div>
      </div>




    )
  }
  