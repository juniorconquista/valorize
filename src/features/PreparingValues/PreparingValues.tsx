import React, { useState } from "react";
import { Box, Chip, Text } from "@rarui-react/components";
import { useMinutaStore } from "@store/minuta";
import "./preparingValues.css";
import { highlightValueInText } from "./preparingValues.definitions";

const PreparingValues: React.FC = () => {
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const { processedContent, content } = useMinutaStore();

  const handleClick = (value: string) => {
    setHighlightedValue(value);
    // Aqui você pode chamar uma função para dar o foco no valor dentro do texto
    highlightValueInText(processedContent, value);
  };

  return (
    <Box
      height="100%"
      display="flex"
      padding="$xl"
      backgroundColor="$background"
      flexDirection="column"
    >
      <Box id="editor" maxHeight="400px" overflowX="auto" paddingX="$s">
        {content.split("\n").map((line, idx) => {
          const parts = [];
          let lastIndex = 0;
          processedContent.forEach((val) => {
            const startIdx = line.indexOf(val.value, lastIndex);
            if (startIdx !== -1) {
              parts.push(line.substring(lastIndex, startIdx));
              parts.push(
                <span
                  className={
                    highlightedValue === val.value ? "highlighted" : ""
                  }
                >
                  {val.value}
                </span>
              );
              lastIndex = startIdx + val.value.length;
            }
          });
          parts.push(line.substring(lastIndex));
          return (
            <Text
              color="$secondary"
              key={idx}
              textAlign="justify"
              lineHeight="$s"
            >
              {parts}
            </Text>
          );
        })}
      </Box>
      <Box
        as="ul"
        paddingX="$s"
        marginTop="$s"
        display="flex"
        gap="$3xs"
        flexWrap="wrap"
      >
        {processedContent.map((processed, idx) => (
          <Chip
            closeable
            pill
            key={idx}
            onClick={() => handleClick(processed.value)}
          >
            {processed.value}
          </Chip>
        ))}
      </Box>
    </Box>
  );
};

export default PreparingValues;
