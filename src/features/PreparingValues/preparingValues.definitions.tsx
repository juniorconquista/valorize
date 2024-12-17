import { ProcessedContent } from "@store/minuta";

export const highlightValueInText = (
  values: ProcessedContent[],
  value: string
) => {
  console.log(value);
  const index = values.find((v) => v.value === value);
  if (index) {
    const { start, end } = index;
    const editor = document.getElementById("editor");

    if (editor) {
      // Criar um intervalo de seleção
      const range = document.createRange();
      const selection = window.getSelection();

      // Encontrar o nó de texto em que o valor está localizado
      let charCount = 0;
      let foundNode: Text | null = null;

      // Itera sobre todos os nós de texto dentro do editor
      const walk = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
      while (walk.nextNode()) {
        const node = walk.currentNode;
        const text = node.textContent || "";
        const nodeStart = charCount;
        const nodeEnd = charCount + text.length;

        // Verifique se o valor está dentro do nó de texto
        if (start >= nodeStart && end <= nodeEnd) {
          foundNode = node as any;
          break;
        }
        charCount += text.length;
      }

      if (foundNode) {
        // Criar um intervalo dentro do nó encontrado
        range.setStart(foundNode, start - charCount);
        range.setEnd(foundNode, end - charCount);

        // Selecionar o intervalo
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }

        // Scrolar até o valor
        foundNode.parentElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }
};
