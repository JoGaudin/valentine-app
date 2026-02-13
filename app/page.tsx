'use client'

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: null, left: null });
  const [mounted, setMounted] = useState(false);

  // URLs des images
  const startImage = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWhwZDZ5ZmV4Z2x4Z2x4Z2x4Z2x4Z2x4Z2x4Z2x4Z2x4Z2x4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T86i6yDyOYz7J6dPhf/giphy.gif";
  const successImage = "/1000044236.gif";

  // Génération des cœurs d'arrière-plan uniquement côté client pour éviter les erreurs d'hydratation
  const [bgHearts, setBgHearts] = useState([]);

  useEffect(() => {
    setMounted(true);
    const hearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Position horizontale %
      delay: Math.random() * 5, // Délai d'animation
      duration: Math.random() * 10 + 10, // Durée de flottement
      size: Math.random() * 30 + 10, // Taille
    }));
    setBgHearts(hearts);
  }, []);

  const moveButton = () => {
    // On récupère les dimensions de la fenêtre
    const width = window.innerWidth;
    const height = window.innerHeight;

    // NOUVELLE LOGIQUE : On définit une zone centrale pour éviter que le bouton parte trop loin
    // On garde une marge de sécurité importante (25% de chaque côté)
    const paddingX = width * 0.25;
    const paddingY = height * 0.25;

    // Calcul d'une position aléatoire dans cette zone "safe" centrale
    // Le bouton restera globalement au milieu de l'écran
    const x = paddingX + Math.random() * (width - paddingX * 2);
    const y = paddingY + Math.random() * (height - paddingY * 2);

    setNoBtnPosition({ top: y, left: x });
  };

  const handleYesClick = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const colors = ['#ff0000', '#ff69b4', '#ffd700', '#ff1493'];
    for (let i = 0; i < 70; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = Math.random() * 15 + 'px';
      confetti.style.height = Math.random() * 15 + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%'; // Confettis ronds
      confetti.style.transition = 'top 3s ease-in, transform 3s ease-in-out';
      confetti.style.zIndex = '9999';
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.style.top = '110vh';
        confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px)`;
      }, 100);

      setTimeout(() => confetti.remove(), 3000);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 flex flex-col items-center justify-center overflow-hidden relative selection:bg-pink-400 selection:text-white font-sans">

        {/* --- Arrière-plan animé (Cœurs flottants) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && bgHearts.map((heart) => (
              <div
                  key={heart.id}
                  className="absolute text-pink-400/40 animate-float"
                  style={{
                    left: `${heart.left}%`,
                    bottom: '-50px',
                    fontSize: `${heart.size}px`,
                    animationDuration: `${heart.duration}s`,
                    animationDelay: `${heart.delay}s`,
                  }}
              >
                <Heart fill="currentColor" />
              </div>
          ))}
        </div>

        <div className="z-10 text-center p-8 max-w-2xl w-full min-h-180 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-white/80 transform hover:scale-[1.01] transition-transform duration-500">
          {accepted ? (
              // --- ÉCRAN DE SUCCÈS ---
              <div className="flex flex-col items-center justify-center animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-pink-600 mb-6 drop-shadow-sm font-serif">
                  Yaaay ! 💖
                </h1>
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200 transform hover:rotate-2 transition-transform duration-300">
                  <img
                      src={successImage}
                      alt="Excited bear"
                      className="w-full h-full object-cover"
                  />
                  {/* Overlay petits cœurs sur l'image */}
                  <div className="absolute top-2 right-2 text-pink-500 animate-pulse"><Heart size={30} fill="currentColor" /></div>
                  <div className="absolute bottom-2 left-2 text-pink-500 animate-pulse delay-75"><Heart size={30} fill="currentColor" /></div>
                </div>
                <p className="text-2xl text-pink-800 font-bold mb-2">
                  Je t'aime ! 🥰
                </p>
                <p className="text-lg text-pink-600 font-medium">
                  (Rendez-vous le 14 Février 🌹)
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 text-sm text-pink-400 hover:text-pink-600 underline decoration-pink-300"
                >
                  Recommencer
                </button>
              </div>
          ) : (
              // --- ÉCRAN DE DEMANDE ---
              <div className="flex flex-col items-center transition-all duration-500">
                <div className="relative w-56 h-56 md:w-72 md:h-72 mb-4 animate-bounce-slow">
                  <img
                      src={startImage}
                      alt="Cute asking bear"
                      className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-pink-600 mb-10 font-serif leading-tight drop-shadow-sm">
                  Est-ce que tu veux être ma Valentine ?
                  <span className="block text-6xl mt-2">🥺👉👈</span>
                </h1>

                <div className="flex flex-wrap justify-center gap-6 items-center w-full relative h-24">
                  {/* Bouton OUI */}
                  <button
                      onClick={handleYesClick}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 text-2xl border-b-4 border-green-700 active:border-0 active:translate-y-1 shadow-green-200/50"
                  >
                    OUI ! 💖
                  </button>

                  {/* Bouton NON */}
                  <button
                      onMouseEnter={moveButton}
                      onClick={moveButton}
                      style={{
                        position: noBtnPosition.top !== null ? 'fixed' : 'static',
                        top: noBtnPosition.top ?? 'auto',
                        left: noBtnPosition.left ?? 'auto',
                        transition: 'top 0.2s ease, left 0.2s ease'
                      }}
                      className="bg-gray-200 text-gray-500 font-bold py-4 px-10 rounded-full shadow-inner text-xl z-50 cursor-pointer whitespace-nowrap hover:bg-gray-300 transition-colors"
                  >
                    Non... 💔
                  </button>
                </div>
              </div>
          )}
        </div>

        {/* Styles & Animations CSS */}
        <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
      </div>
  );
}