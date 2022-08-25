import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IToolsDetailProps {
  textBtnNew?: string;

  showBtnNew?: boolean;
  showBtnBack?: boolean;
  showBtnDelete?: boolean;
  showBtnSave?: boolean;
  showBtnSaveandBack?: boolean;

  onClickInNew?: () => void;
  onClickInBack?: () => void;
  onClickInDelete?: () => void;
  onClickInSave?: () => void;
  onClickInSaveandBack?: () => void;
}

export const ToolsDetail: React.FC<IToolsDetailProps> = ({
  textBtnNew = "Novo",

  showBtnBack = true,
  showBtnDelete = true,
  showBtnNew = true,
  showBtnSave = true,
  showBtnSaveandBack = false,

  onClickInBack,
  onClickInDelete,
  onClickInNew,
  onClickInSave,
  onClickInSaveandBack,
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
      {showBtnSave && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onClickInSave}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}

      {showBtnSaveandBack && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInSaveandBack}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>
      )}

      {showBtnDelete && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInDelete}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}

      {showBtnNew && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInNew}
          startIcon={<Icon>add</Icon>}
        >
          {textBtnNew}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {showBtnBack && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
