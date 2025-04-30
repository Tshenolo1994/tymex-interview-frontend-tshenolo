import React from 'react';
import { useTheme } from '../context/ThemeContext';
import backgroundImage from '../assets/layout images/header-background.jpg';
import yellowBanner from '../assets/layout images/yellow-banner.png';
import { getNftImage } from '../utils/nftImages';

const characterList = [
  { label: 'ASSASSIN', key: 'assassin' },
  { label: 'NEON GUY', key: 'neon-guy' },
  { label: 'MAFIA ENGLAND', key: 'mafia-england' },
  { label: 'BASKETBALL GIRL', key: 'basketball-girl' },
];
const Hero: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: theme.heroBackground,
          opacity: 0.7,
        }}
      />

      <div className="container relative z-20 h-full flex flex-col justify-center items-center px-4 md:px-16">
        <div className="text-center transform -translate-y-16 md:-translate-y-0">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl py-2 px-4 md:px-6 rounded-lg inline-block relative shadow-lg">
            NEW
          </div>
          <div className="relative">
            <div className="text-white font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 leading-tight">
              ARRIVAL
            </div>
            <div className="absolute bottom-0 right-0 md:right-4 transform translate-y-1/2 bg-pink-600 text-white text-xs sm:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full shadow-md transition-all hover:bg-pink-700 cursor-pointer">
              SHOP NOW
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 left-0 w-full z-30">
        <img src={yellowBanner} alt="Yellow Banner" className="w-full" />

        <div className="absolute inset-0 flex justify-start items-center space-x-8 lg:space-x-16 px-8 lg:px-12">
          {characterList.map(({ label, key }) => (
            <div key={key} className="flex flex-col items-center">
              <div className="bg-gray-900 p-1 border-2 border-gray-800 w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center mb-2">
                <div
                  style={{
                    backgroundColor: theme.gradient,
                    borderRadius: '50%',
                    padding: '8px',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      background: theme.gradient,
                      padding: '10px',
                      position: 'relative',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                      transform: 'translateY(-25px) translateX(25px)',
                    }}
                  >
                    <img
                      src={getNftImage(key)}
                      alt={label}
                      className="transform transition-all hover:scale-110"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-black font-bold text-xs lg:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 right-0 z-30">
        <img
          src={getNftImage('dj')}
          alt="The DJ Character"
          className="h-[30rem] lg:h-[48rem] transform scale-x-[-1]"
        />
        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-40 bg-purple-500 text-white font-bold text-xl lg:text-3xl p-1 lg:p-2 px-6 lg:px-12">
          THE DJ
        </div>
      </div>
    </div>
  );
};

export default Hero;
