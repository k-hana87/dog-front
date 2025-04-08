"use client";

import { useState, useRef, useEffect, ChangeEvent } from 'react';

export default function Home() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [currentGain, setCurrentGain] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 192000,
      });
      setAudioContext(context);
    }
  }, [audioContext]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && audioContext) {
      setFileName(file.name);
      const arrayBuffer = await file.arrayBuffer();
      const decodedData = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData);
    }
  };

  const startAudio = async () => {
    if (audioBuffer && audioContext) {
      // AudioContext が suspended 状態の場合、再生前に resume を呼ぶ
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      
      // 既存のソースがあれば停止
      if (sourceNode) {
        sourceNode.stop();
      }
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // イコライジング用フィルタ（peaking タイプ）
      const filter = audioContext.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = 8000;
      filter.gain.value = currentGain;
      filter.Q.value = 100;

      // 周波数スペクトル表示用 AnalyserNode
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048 ;

      // ノードの接続：source → filter → analyser → 出力
      source.connect(filter);
      filter.connect(analyser);
      analyser.connect(audioContext.destination);

      source.start();
      setSourceNode(source);
      setFilterNode(filter);
      setAnalyserNode(analyser);

      startSpectrumVisualization(analyser);
    }
  };

  const stopAudio = () => {
    if (sourceNode) {
      sourceNode.stop();
      setSourceNode(null);
    }
  };

  // requestAnimationFrame を使って周波数スペクトルを連続描画する関数
  const startSpectrumVisualization = (analyser: AnalyserNode) => {
    const updateFrequencySpectrum = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // canvas をクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 各ビンをバーとして描画
      const barWidth = canvas.width / bufferLength *4;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height ;
        ctx.fillStyle = 'blue';
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      }
      requestAnimationFrame(updateFrequencySpectrum);
    };

    requestAnimationFrame(updateFrequencySpectrum);
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
    <div style={{ padding: '20px' }}>
      <h1>ローカルMP3音源の再生・周波数スペクトル表示・イコライジング</h1>
      <div>
        <input type="file" accept=".mp3" onChange={handleFileChange} />
        {fileName && <p>選択したファイル: {fileName}</p>}
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={startAudio}>【再生開始】</button>
        <button onClick={stopAudio}>【停止】</button>
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => handleWanButtonClick(800)}>【ワンちゃんボタン1】</button>
        <button onClick={() => handleWanButtonClick(8000)}>【ワンちゃんボタン2】</button>
        <button onClick={() => handleWanButtonClick(80000)}>【ワンちゃんボタン3】</button>
        <button onClick={handleWanOff}>【ワンちゃんOFF】</button>
      </div>
      <div style={{ margin: '20px 0' }}>
        <h2>周波数スペクトル</h2>
        <canvas ref={canvasRef} width={500} height={100} style={{ border: '1px solid black' }} />
      </div>
    </div>
  );
}