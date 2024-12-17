import React, { useState } from "react";
import { Box, Button, IconButton, Status, Text } from "@rarui-react/components";
import { CloseIcon, RefreshIcon } from "@rarui/icons";
import { useMinutaStore } from "@store/minuta";
import { valueExtractor } from "@useCases/ValueExtractor";

import { highlightValueInText } from "./preparingValues.definitions";
import "./preparingValues.css";

const PreparingValues: React.FC = () => {
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);
  const [lastID, setLastID] = useState<number | null>(null);
  const { processedContent, content, setMinuta } = useMinutaStore();

  const handleClick = (value: string) => {
    setHighlightedValue(value);
    // Aqui você pode chamar uma função para dar o foco no valor dentro do texto
    highlightValueInText(processedContent, value);
  };

  const handleRemoveValue = (id: number) => {
    const updatedProcessedContent = processedContent.map((processed) =>
      processed.id === id ? { ...processed, hidden: true } : processed
    );

    setMinuta(content, updatedProcessedContent);
    setLastID(id);
    handleCalculate();
  };

  const handleRevertValue = () => {
    const updatedProcessedContent = processedContent.map((processed) =>
      processed.id === lastID ? { ...processed, hidden: false } : processed
    );

    setMinuta(content, updatedProcessedContent);
    setLastID(null);
    handleCalculate();
  };

  const handleCalculate = () => {
    const totalValue = valueExtractor.calculateTotalValue(processedContent);
    setTotal(totalValue);
  };

  return (
    <Box
      height="100%"
      display="flex"
      padding="$xl"
      backgroundColor="$primary"
      flexDirection="column"
      gap="$s"
    >
      <Box backgroundColor="$secondary" borderRadius="$xs">
        <div id="editor" className="list">
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
                lineHeight="$m"
              >
                {parts}
              </Text>
            );
          })}
        </div>
      </Box>
      <Box
        as="ul"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gridGap="$2xs"
        flexWrap="wrap"
      >
        {processedContent
          .filter((content) => !content.hidden)
          .map((processed, idx) => (
            <Box display="flex" gap="$4xs" >
              <Button
                full
                variant="tonal"
                appearance="neutral"
                size="small"
                onClick={() => handleClick(processed.value)}
              >
                {processed.value}
              </Button>
              <IconButton
                variant="tonal"
                appearance="danger"
                source={<CloseIcon />}
                onClick={() => handleRemoveValue(processed.id)}
                size="small"
              />
            </Box>
          ))}
      </Box>
      <Box display="flex" justifyContent="flex-end" gap="$3xs">
        <Button appearance="success" variant="tonal" onClick={handleCalculate}>
          Calcular
        </Button>
        <IconButton
          variant="tonal"
          appearance="brand"
          source={<RefreshIcon size="medium" />}
          onClick={() => handleRevertValue()}
          size="large"
        />
      </Box>
      {total && (
        <Box display="flex" alignItems="center" gap="$4xs">
          <Text color="$primary" fontWeight="$bold">
            O Valor total é:
          </Text>
          <Status variant="subdued" dot={false}>
            {total}
          </Status>
        </Box>
      )}
    </Box>
  );
};

export default PreparingValues;
