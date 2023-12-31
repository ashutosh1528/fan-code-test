import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FliterState = {
  selectedFilters: number[];
};

const initialState: FliterState = {
  selectedFilters: [-1],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedFilter: (state, action: PayloadAction<{ id: number; isAlreadySelected: boolean }>) => {
      const { id, isAlreadySelected } = action.payload;
      if (id === -1) {
        state.selectedFilters = [-1];
      } else {
        const currentSelections = [...state.selectedFilters];
        const isCurrentOnlyAll = currentSelections.length === 1 && currentSelections[0] === -1;
        if (isAlreadySelected) {
          const newFilters = currentSelections.filter((filterId) => filterId !== id);
          if (newFilters.length === 0) state.selectedFilters = [-1];
          else state.selectedFilters = newFilters;
        } else if (isCurrentOnlyAll) {
          state.selectedFilters = [id];
        } else {
          state.selectedFilters = [...currentSelections, id];
        }
      }
    },
  },
});

export const { setSelectedFilter } = filterSlice.actions;
export default filterSlice.reducer;
