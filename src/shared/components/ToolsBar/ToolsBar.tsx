import {
  Box,
  Button,
  Icon,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";

interface IToolsBarProps {
  inputText?: string;
  showInputSearch?: boolean;
  onChangeInputText?: (newText: string) => void;
  TextBtnNew?: string;
  showBtnNew?: boolean;
  onClickNewBtn?: () => void;
}

export const ToolsBar: React.FC<IToolsBarProps> = ({
  inputText = "",
  showInputSearch = false,
  onChangeInputText,
  TextBtnNew = "Novo",
  onClickNewBtn,
  showBtnNew = true,
}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      component={Paper}
      height={theme.spacing(5)}
    >
      {showInputSearch && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={inputText}
          onChange={(e) => onChangeInputText?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showBtnNew && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={onClickNewBtn}
            endIcon={<Icon>add</Icon>}
          >
            {TextBtnNew}
          </Button>
        )}
      </Box>
    </Box>
  );
};
