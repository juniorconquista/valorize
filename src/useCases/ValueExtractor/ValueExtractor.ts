import { ProcessedContent } from "@store/minuta";

export class ValueExtractor {
  public sanitizeText = (text: string) => {
    return text
      .replace(/(\r\n|\n|\r)/g, " ") // Remove todas as quebras de linha
      .replace(/\s{2,}/g, " "); // Substitui múltiplos espaços por um único espaço
  };

  public extractValuesWithPositions(text: string): ProcessedContent[] {
    const results: ProcessedContent[] = [];
    const regex = /R\$\s?\d{1,3}(\.\d{3})*(,\d{2})?/g;
    const matches = [...text.matchAll(regex)];

    // Gerar um id único para cada item
    let idCounter = 0;

    for (const match of matches) {
      const foundValue = match[0].trim();
      const start = match.index || 0;
      const end = start + foundValue.length;

      // Remover o 'R$' e substituir a vírgula por ponto para tratar como número
      const numericValue = parseFloat(
        foundValue
          .replace("R$", "") // Remove "R$"
          .replace(/\./g, "") // Remove os pontos para separar as casas decimais
          .replace(",", ".") // Substitui a vírgula por ponto
      );

      const uniqueId = idCounter++;

      results.push({
        id: uniqueId,
        value: foundValue,
        start,
        end,
        numericValue,
        hidden: false,
      });
    }

    return results;
  }

  public calculateTotalValue = (contents: ProcessedContent[]): string => {
    const total = contents
      .filter((content) => !content.hidden)
      .reduce((sum, content) => {
        return sum + (content.numericValue || 0); // Soma apenas valores válidos
      }, 0);

    // Formatar o total como moeda no formato "R$ 191.570,00"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };
}
