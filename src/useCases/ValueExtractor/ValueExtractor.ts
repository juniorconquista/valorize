import { ProcessedContent } from "@store/minuta";

export class ValueExtractor {
  public extractValuesWithPositions(text: string): ProcessedContent[] {
    const results: ProcessedContent[] = [];
    const regex = /R\$\s?\d{1,3}(\.\d{3})*(,\d{2})?/g;
    const matches = [...text.matchAll(regex)];

    for (const match of matches) {
      const foundValue = match[0].trim();
      const start = match.index || 0;
      const end = start + foundValue.length;
      results.push({ value: foundValue, start, end });
    }

    return results;
  }

  /**
   * Extracts all monetary values and their surrounding context from the provided text.
   * @param text The input text where values will be searched.
   * @returns Array of objects containing the value and its context.
   */
  public extractValuesWithContext(
    text: string
  ): { value: string; context: string }[] {
    console.log(text);
    const results: { value: string; context: string }[] = [];

    // Regex to match values in the format R$ xxx.xxx,xx
    const regex = /R\$\s?\d{1,3}(\.\d{3})*(,\d{2})?/g;

    // Find all matches using matchAll
    const matches = [...text.matchAll(regex)];

    for (const match of matches) {
      const foundValue = match[0].trim(); // Value found (e.g., R$ 191.570,00)

      // Index of the match in the text
      const startIndex = match.index || 0;

      // Extract the surrounding context: paragraph where the value appears
      const paragraphStart = text.lastIndexOf("\n", startIndex) + 1; // Start of paragraph
      const paragraphEnd = text.indexOf("\n", startIndex); // End of paragraph
      const fullContext = text
        .substring(
          paragraphStart,
          paragraphEnd !== -1 ? paragraphEnd : text.length
        )
        .trim();

      // Add value and its context to the results
      results.push({ value: foundValue, context: fullContext });
    }

    return results;
  }
}
