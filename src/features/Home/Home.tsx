import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Title, Text, Textarea, Button } from "@rarui-react/components";
import { valueExtractor } from "@useCases/ValueExtractor";
import { useMinutaStore } from "@store/minuta";
import { urlRouters } from "@/router/router.definitions";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const { setMinuta } = useMinutaStore();
  const navigate = useNavigate();

  const handleProcess = () => {
    const processedMinuta = valueExtractor.extractValuesWithPositions(text);
    setMinuta(text, processedMinuta);
    navigate(urlRouters.preparingValues);
  };

  return (
    <Box
      height="100%"
      overflowX="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="$xl"
      backgroundColor="$background"
    >
      <Box
        minWidth={{ xs: "100%", lg: "900px" }}
        backgroundColor="$brand-hover"
        padding="$xl"
        borderRadius="$xs"
        display="flex"
        flexDirection="column"
        gap="$s"
      >
        <Title color="$secondary" textAlign="center">
          Análise de Documentos
        </Title>
        <Text color="$secondary" textAlign="center">
          Cole seu documento de texto abaixo e clique em "Processar" para
          analisar os valores contidos nele.
        </Text>
        <Textarea
          value={text}
          onChange={(event) =>
            setText(valueExtractor.sanitizeText(event.target.value))
          }
          rows={20}
        />
        <Button appearance="brand" full onClick={handleProcess} disabled={!text.length}>
          Processar
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
