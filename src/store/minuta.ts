import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProcessedContent {
  id: number;
  value: string;
  numericValue: number;
  start: number;
  end: number;
  hidden: boolean;
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
