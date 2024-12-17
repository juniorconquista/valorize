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
          Document Analysis
        </Title>
        <Text color="$secondary" textAlign="center">
          Paste your text document below and click 'Process' to analyze the
          values within.
        </Text>
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={20}
        />
        <Button appearance="brand" full onClick={handleProcess}>
          Process
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

// const TextEditorWithValues = ({ text }: { text: string }) => {
//   const values = valueExtractor.extractValuesWithPositions(text);

//   const [highlightedValue, setHighlightedValue] = useState<string | null>(null);

//   const handleClick = (value: string) => {
//     setHighlightedValue(value);
//     // Aqui você pode chamar uma função para dar o foco no valor dentro do texto
//     highlightValueInText(value);
//   };

//   const highlightValueInText = (value: string) => {
//     const index = values.find((v) => v.value === value);
//     if (index) {
//       const { start, end } = index;
//       const editor = document.getElementById("editor");

//       if (editor) {
//         // Criar um intervalo de seleção
//         const range = document.createRange();
//         const selection = window.getSelection();

//         // Encontrar o nó de texto em que o valor está localizado
//         let charCount = 0;
//         let foundNode: Text | null = null;

//         // Itera sobre todos os nós de texto dentro do editor
//         const walk = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
//         while (walk.nextNode()) {
//           const node = walk.currentNode;
//           const text = node.textContent || "";
//           const nodeStart = charCount;
//           const nodeEnd = charCount + text.length;

//           // Verifique se o valor está dentro do nó de texto
//           if (start >= nodeStart && end <= nodeEnd) {
//             foundNode = node;
//             break;
//           }
//           charCount += text.length;
//         }

//         if (foundNode) {
//           // Criar um intervalo dentro do nó encontrado
//           range.setStart(foundNode, start - charCount);
//           range.setEnd(foundNode, end - charCount);

//           // Selecionar o intervalo
//           if (selection) {
//             selection.removeAllRanges();
//             selection.addRange(range);
//           }

//           // Scrolar até o valor
//           foundNode.parentElement?.scrollIntoView({
//             behavior: "smooth",
//             block: "center",
//           });
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       <div
//         id="editor"
//         style={{ whiteSpace: "pre-wrap", overflow: "auto", maxHeight: "200px" }}
//       >
//         {text.split("\n").map((line, idx) => {
//           const parts = [];
//           let lastIndex = 0;
//           values.forEach((val) => {
//             const startIdx = line.indexOf(val.value, lastIndex);
//             if (startIdx !== -1) {
//               parts.push(line.substring(lastIndex, startIdx));
//               parts.push(
//                 <span
//                   className={
//                     highlightedValue === val.value ? "highlighted" : ""
//                   }
//                 >
//                   {val.value}
//                 </span>
//               );
//               lastIndex = startIdx + val.value.length;
//             }
//           });
//           parts.push(line.substring(lastIndex));
//           return <p key={idx}>{parts}</p>;
//         })}
//       </div>

//       <div>
//         <ul>
//           {values.map((val, idx) => (
//             <li key={idx} onClick={() => handleClick(val.value)}>
//               {val.value}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
