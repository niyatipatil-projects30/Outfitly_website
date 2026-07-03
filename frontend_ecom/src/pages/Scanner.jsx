import React, { useState, useRef } from 'react';
import Groq from 'groq-sdk';

// Initialize Groq (Note: In Vite, use import.meta.env.VITE_GROQ_API_KEY)
// For local testing, you can paste your string key, but don't commit it to GitHub!
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required to run directly on the frontend
});

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1. Samples color from image canvas
  // 2. Sends hex code to Groq AI for custom fashion analysis
  const analyzeWithGroq = () => {
    if (!image) return;
    setIsScanning(true);

    const imgElements = new Image();
    imgElements.src = image;
    imgElements.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgElements.width;
      canvas.height = imgElements.height;
      
      ctx.drawImage(imgElements, 0, 0);
      const sampleX = Math.floor(canvas.width / 2);
      const sampleY = Math.floor(canvas.height / 3); 
      const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data;
      
      const [r, g, b] = pixel;
      const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

      try {
        // Querying Groq Cloud using Llama 3.3
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are a Gen-Z fashion stylist AI. The user will provide a skin tone Hex color code. 
              Analyze the tone and respond ONLY with a raw JSON object matching this schema precisely:
              {
                "title": "A short trendy Gen-Z style title with an emoji",
                "bgGradient": "from-purple-600 to-pink-600", (choose any cool tailwind gradient based on their tone vibe)
                "bestColors": ["Color 1", "Color 2", "Color 3"],
                "avoid": ["Color to avoid 1", "Color to avoid 2"],
                "fits": ["Gen-Z outfit piece 1", "Gen-Z outfit piece 2", "Gen-Z outfit piece 3"]
              }`
            },
            {
              role: "user",
              content: `My detected skin tone hex code is: ${hex}`
            }
          ],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" }
        });

        const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);
        
        setResult({
          rgb: `rgb(${r}, ${g}, ${b})`,
          ...aiResponse
        });
      } catch (error) {
        console.error("Groq API Error:", error);
        alert("Failed to connect to Groq AI. Check your API Key!");
      } finally {
        setIsScanning(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="text-center mb-8">

        <br/>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          DRIP AI
        </h1>
        <br/>
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">Powered by Llama 3.3 Inference</p>
      </div>

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div 
          onClick={() => !isScanning && fileInputRef.current.click()}
          className="border-2 border-dashed border-zinc-700 hover:border-cyan-400 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative"
        >
          {image ? (
            <>
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              {isScanning && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="absolute w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] top-0 left-0 animate-bounce" />
                  <p className="font-mono text-cyan-400 tracking-widest animate-pulse">LLAMA IS COOKING...</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-4">
              <span className="text-4xl mb-2 block">📸</span>
              <br/>
              <p className="font-medium text-zinc-300">Drop your selfie here</p>
            </div>
          )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

        {image && !result && !isScanning && (
          <button
            onClick={analyzeWithGroq}
            className="w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black py-4 rounded-xl tracking-wider text-sm uppercase"
          >
            🔥 Run Groq AI Scan
          </button>
        )}
      </div>

      {result && (
        <div className="w-full max-w-md mt-8">
          <div className={`p-1 rounded-3xl bg-gradient-to-r ${result.bgGradient || 'from-cyan-500 to-blue-500'}`}>
            <div className="bg-zinc-950 p-6 rounded-[22px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Groq Analysis</span>
                <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: result.rgb }} />
              </div>

              <h2 className="text-2xl font-black mb-4">{result.title}</h2>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Colors that clear:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.bestColors?.map((color, i) => (
                    <span key={i} className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-1.5 rounded-full">
                      ✨ {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Colors that ain't it:</h3>
                <p className="text-sm text-zinc-400">{result.avoid?.join(', ')}</p>
              </div>

              <hr className="border-zinc-800 my-4" />

              <div>
                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">Recommended Pieces:</h3>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  {result.fits?.map((fit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-xs text-yellow-400">⚡</span> {fit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}