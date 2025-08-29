import React from "react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// Mood slice
interface MoodState {
  currentMood: string | null;
  history: { mood: string; date: string }[];
}

const initialState: MoodState = {
  currentMood: null,
  history: [],
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<string>) => {
      state.currentMood = action.payload;
      state.history.unshift({ mood: action.payload, date: new Date().toLocaleString() });
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

const { setMood, clearHistory } = moodSlice.actions;

// Store
const store = configureStore({ reducer: { mood: moodSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// UI Components
const moods = ["😊 Happy", "😢 Sad", "😡 Angry", "😌 Relaxed", "🤔 Thoughtful"];

function MoodButtons() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex gap-2 flex-wrap">
      {moods.map(mood => (
        <button
          key={mood}
          onClick={() => dispatch(setMood(mood))}
          className="rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

function CurrentMood() {
  const mood = useSelector((state: RootState) => state.mood.currentMood);
  return (
    <div className="mt-4 text-lg">
      {mood ? (
        <>Current mood: <span className="font-semibold">{mood}</span></>
      ) : (
        <span className="text-gray-500">No mood selected yet</span>
      )}
    </div>
  );
}

function MoodHistory() {
  const history = useSelector((state: RootState) => state.mood.history);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Mood History</h2>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs rounded-lg px-3 py-1 border border-red-300 text-red-600 hover:bg-red-50"
        >
          Clear
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {history.length === 0 && <li className="text-gray-400 text-sm">No history yet</li>}
        {history.map((entry, i) => (
          <li key={i} className="text-sm text-gray-700">
            {entry.mood} <span className="text-gray-400">({entry.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main App
export default function MoodTrackerApp() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Mood Tracker</h1>
          <MoodButtons />
          <CurrentMood />
          <MoodHistory />
        </div>
      </div>
    </Provider>
  );
}
