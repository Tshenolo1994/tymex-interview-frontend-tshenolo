import React from 'react';
import {
  Slider,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useFilter } from '../context/FilterContext';
import { MdCancel } from 'react-icons/md';

const SearchFilter: React.FC = () => {
  const { theme } = useTheme();
  const { filterState, setFilterState, resetFilters } = useFilter();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilterState((prev) => ({
      ...prev,
      priceRange: newValue as [number, number],
    }));
  };
  
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({
      ...prev,
      search: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof typeof filterState) => (event: SelectChangeEvent) => {
    setFilterState((prev) => ({
      ...prev,
      [field]: event.target.value as string,
    }));
  };

  const selectStyles = {
    color: theme.text,
    backgroundColor: theme.surface,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.border,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.gradient,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.gradient,
    },
  };

  return (
    <div
      className="p-4 rounded-lg shadow-md w-full"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div className="mb-6">
        <TextField
          label="Quick search"
          variant="outlined"
          fullWidth
          value={filterState.search}
          onChange={handleSearchChange}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: theme.text,
              '& fieldset': { borderColor: theme.border },
              '&:hover fieldset': { borderColor: theme.gradient },
              '&.Mui-focused fieldset': { borderColor: theme.gradient },
            },
            '& .MuiInputLabel-root': { color: theme.text },
          }}
        />
      </div>

      <div className="mb-6">
        <Typography variant="body1" style={{ color: theme.text }}>
          Price Range (ETH)
        </Typography>
        <Box className="flex flex-col gap-2">
          <Slider
            value={filterState.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} ETH`}
            min={0.01}
            max={200}
            step={0.01}
            sx={{
              height: 8,
              '& .MuiSlider-track': {
                background: theme.gradient,
                border: 'none',
              },
              '& .MuiSlider-rail': {
                backgroundColor: theme.border,
                opacity: 1,
              },
              '& .MuiSlider-thumb': {
                background: theme.gradient,
                border: '2px solid white',
                width: 20,
                height: 20,
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: `0px 0px 0px 8px ${theme.gradient}44`,
                },
              },
              '& .MuiSlider-valueLabel': {
                background: theme.gradient,
                color: '#fff',
                '&:before': {
                  content: '""',
                  width: 8,
                  height: 8,
                  backgroundColor: theme.gradient,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          />
          <Typography variant="body2" style={{ color: theme.secondaryText }}>
            {`${filterState.priceRange[0].toFixed(2)} ETH - ${filterState.priceRange[1].toFixed(2)} ETH`}
          </Typography>
        </Box>
      </div>

      <div className="mb-6">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: theme.text }}>Tier</InputLabel>
          <Select
            value={filterState.tier}
            onChange={handleSelectChange('tier')}
            label="Tier"
            sx={selectStyles}
          >
            <MenuItem value="All">All Tiers</MenuItem>
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="epic">Epic</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
            <MenuItem value="mythic">Mythic</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mb-6">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: theme.text }}>Theme</InputLabel>
          <Select
            value={filterState.theme}
            onChange={handleSelectChange('theme')}
            label="Theme"
            sx={selectStyles}
          >
            <MenuItem value="All">All Themes</MenuItem>
            <MenuItem value="PFP">PFP Avatars</MenuItem>
            <MenuItem value="Generative">Generative Art</MenuItem>
            <MenuItem value="Game">Game Assets</MenuItem>
            <MenuItem value="Anime">Anime</MenuItem>
            <MenuItem value="Pixel">Pixel Art</MenuItem>
            <MenuItem value="Horror">Horror/Gothic</MenuItem>
            <MenuItem value="Memes">Memes</MenuItem>
            <MenuItem value="3D">3D Models</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mb-6">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: theme.text }}>Time</InputLabel>
          <Select
            value={filterState.time}
            onChange={handleSelectChange('time')}
            label="Time"
            sx={selectStyles}
          >
            <MenuItem value="Newest">latest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mb-6">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: theme.text }}>Order</InputLabel>
          <Select
            value={filterState.order}
            onChange={handleSelectChange('order')}
            label="Order"
            sx={selectStyles}
          >
            <MenuItem value="Ascending">Low-high</MenuItem>
            <MenuItem value="Descending">high-low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mb-6">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: theme.text }}>Name</InputLabel>
          <Select
            value={filterState.name}
            onChange={handleSelectChange('name')}
            label="Name"
            sx={selectStyles}
          >
            <MenuItem value="A-Z">A-Z</MenuItem>
            <MenuItem value="Z-A">Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>

     
      <div className="flex md:flex-row sm:flex-col">
  <Button style={{color:theme.text}}
  startIcon={<MdCancel style={{ color: '#FBC625'}} />} 
    onClick={resetFilters}

  >
    Reset Filters
  </Button>
  <Button
    variant="contained"
    sx={{
      background: theme.gradient,
      color: theme.text,
    }}
  >
    Search
  </Button>
  </div>
    </div>
  );
};

export default SearchFilter;
