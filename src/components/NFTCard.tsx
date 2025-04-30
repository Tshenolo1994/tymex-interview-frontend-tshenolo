import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Avatar, Chip } from '@mui/material';
import { FiHeart } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';
import { NFT } from '../types/nftTypes';
import { useTheme } from '../context/ThemeContext';
import { getNftImage, CREATOR_IMAGE } from '../utils/nftImages';

interface NFTCardProps {
  nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(nft.isFavourite);

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        bgcolor: theme.cardBackground,
        color: theme.text,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 8px 24px ${theme.shadow}`,
        },
      }}
    >
      <Box position="relative">
        <Box position="absolute" top={12} left={12} zIndex={1}>
          <Chip
            label={nft.tier.charAt(0).toUpperCase() + nft.tier.slice(1)}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              backdropFilter: 'blur(5px)',
              fontWeight: 'bold',
              height: '24px',
              '& .MuiChip-label': {
                px: 1,
                py: 0,
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>

        <Box position="absolute" top={12} right={12} zIndex={1}>
          <Box
            onClick={handleToggleLike}
            sx={{
              color: isLiked ? theme.buttonAccent : theme.text,
              cursor: 'pointer',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <FiHeart size={20} fill={isLiked ? 'white' : 'none'} />
          </Box>
        </Box>

        <Box
          sx={{
            background: theme.cardGradient,
            borderRadius: 2,
            m: 1.5,
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
          }}
        >
          <CardMedia
            component="img"
            image={getNftImage(nft.image)}
            alt={nft.name}
            sx={{
              aspectRatio: '1/1',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ p: 2, pt: 0, bgcolor: theme.surface }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography
            fontSize="1rem"
            fontWeight="bold"
            color={theme.text}
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '60%',
            }}
          >
            {nft.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <FaEthereum style={{ color: theme.text, marginRight: '4px' }} />
            <Typography fontSize="0.9rem" fontWeight="bold" color={theme.text}>
              {nft.price} ETH
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <Box sx={{ position: 'relative', mr: 1 }}>
            <Avatar
              src={CREATOR_IMAGE}
              sx={{
                width: 28,
                height: 28,
                border: `2px solid ${theme.buttonAccent}`,
              }}
            />
            {nft.creator.status === 'online' && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.buttonAccent,
                  border: `1.5px solid ${theme.cardBackground}`,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            )}
          </Box>
          <Typography
            fontSize="0.8rem"
            color={theme.text}
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '70%',
            }}
          >
            {nft.creator.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NFTCard;
