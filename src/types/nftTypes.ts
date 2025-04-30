export interface Creator {
  name: string;
  creatorProfilePic: string;
  status: 'online' | 'offline';
}

export interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  tier: string;
  theme: string;
  isFavourite: boolean;
  createdAt: string;
  creator: {
    name: string;
    creatorProfilePic: string;
    status: 'online' | 'offline';
  };
}
