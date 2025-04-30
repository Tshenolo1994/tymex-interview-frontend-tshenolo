import assassin from '../assets/NFts images/assassin.png';
import dj from '../assets/NFts images/the-dj.png';
import neonGuy from '../assets/NFts images/neon-guy.png';
import basketballGirl from '../assets/NFts images/bassketball-girl.png';
import mafiaEngland from '../assets/NFts images/mafia-england.png';
import ghozali from '../assets/layout images/profle-pic.jpg';

export const NFT_IMAGES: Record<string, string> = {
  'assassin': assassin,
  'dj': dj,
  'neon-guy': neonGuy,
  'basketball-girl': basketballGirl,
  'mafia-england': mafiaEngland
};

export const CREATOR_IMAGE = ghozali;

export const getNftImage = (imageName: string): string => {
  return NFT_IMAGES[imageName] || NFT_IMAGES.assassin;
};