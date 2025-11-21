import { create } from 'zustand';

const useStore = create((set, get) => ({
  tubes: [],
  history: [],
  historyIndex: -1,
  currentTubeConfig: {
    type: 'rectangular', // 'rectangular' or 'square'
    width: 2,
    height: 2,
    thickness: 0.2,
    length: 5,
  },
  selectedTubeId: null,
  wireframe: false,
  showJointPreview: true,

  // Actions
  setCurrentTubeConfig: (config) =>
    set((state) => ({
      currentTubeConfig: { ...state.currentTubeConfig, ...config },
    })),

  addTube: (position = [0, 0, 0], rotation = [0, 0, 0]) => {
    const { currentTubeConfig, tubes } = get();
    const newTube = {
      id: Date.now(),
      ...currentTubeConfig,
      position: [...position],
      rotation: [...rotation],
    };
    const newTubes = [...tubes, newTube];
    set({ tubes: newTubes });
    get().addToHistory(newTubes);
  },

  updateTube: (id, updates) => {
    const { tubes } = get();
    const newTubes = tubes.map((tube) =>
      tube.id === id ? { ...tube, ...updates } : tube
    );
    set({ tubes: newTubes });
    get().addToHistory(newTubes);
  },

  deleteTube: (id) => {
    const { tubes } = get();
    const newTubes = tubes.filter((tube) => tube.id !== id);
    set({ tubes: newTubes });
    get().addToHistory(newTubes);
  },

  setSelectedTube: (id) => set({ selectedTubeId: id }),

  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),

  addToHistory: (newTubes) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTubes);
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        tubes: [...history[newIndex]],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        tubes: [...history[newIndex]],
        historyIndex: newIndex,
      });
    }
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },
}));

export default useStore;

