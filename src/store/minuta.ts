import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProcessedContent {
  value: string;
  start: number;
  end: number;
}

interface MinutaState {
  content: string;
  processedContent: ProcessedContent[];
  setMinuta: (content: string, ProcessedContent: ProcessedContent[]) => void;
}

export const useMinutaStore = create<MinutaState>()(
  persist(
    (set) => ({
      content: "",
      processedContent: {} as ProcessedContent[],
      setMinuta: (content: string, processedContent: ProcessedContent[]) =>
        set(() => ({ content, processedContent })),
    }),
    {
      name: "minuta",
    }
  )
);
