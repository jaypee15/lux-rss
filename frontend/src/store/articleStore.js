import { create } from 'zustand';

const useArticleStore = create((set) => ({
  articleData: null,
  setArticleData: (data) => set(() => ({ articleData: data })),
  resetArticleData: () => set(() => ({ articleData: null })),
}));

export default useArticleStore;
