import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  surname: string;
  login: string;
  photo: string;
  name: string;
  _id: string;
}

const initialState: { profile: Profile } = {
  profile: { surname: '', login: '', photo: '', name: '', _id: '' }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = initialState.profile;
    }
  }
});

export const { setProfile, clearProfile } = todoSlice.actions;
export default todoSlice.reducer;
