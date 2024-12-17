import { Box, Title, Text, Textarea, Button } from "@rarui-react/components";

const Home: React.FC = () => {
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="$xl"
    >
      <Box
        minWidth={{ xs: "100%", lg: "900px" }}
        backgroundColor="$warning-hover"
        padding="$xl"
        borderRadius="$xs"
        display="flex"
        flexDirection="column"
        gap="$s"
      >
        <Title>Document Analysis</Title>
        <Text>
          Paste your text document below and click 'Process' to analyze the
          values within.
        </Text>
        <Textarea rows={20} />
        <Button appearance="warning" full>
          Process
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
