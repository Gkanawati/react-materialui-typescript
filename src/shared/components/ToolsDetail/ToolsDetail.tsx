/* eslint-disable indent */
import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
interface IToolsDetailProps {
  textBtnNew?: string;

  showBtnNew?: boolean;
  showBtnBack?: boolean;
  showBtnDelete?: boolean;
  showBtnSave?: boolean;
  showBtnSaveandBack?: boolean;

  showBtnNewLoading?: boolean;
  showBtnBackLoading?: boolean;
  showBtnDeleteLoading?: boolean;
  showBtnSaveLoading?: boolean;
  showBtnSaveandBackLoading?: boolean;

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

  showBtnBackLoading = false,
  showBtnDeleteLoading = false,
  showBtnNewLoading = false,
  showBtnSaveLoading = false,
  showBtnSaveandBackLoading = false,

  onClickInBack,
  onClickInDelete,
  onClickInNew,
  onClickInSave,
  onClickInSaveandBack,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
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
      {showBtnSave && !showBtnSaveLoading && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onClickInSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showBtnSaveLoading && <Skeleton width={110} height={60} />}

      {showBtnSaveandBack && !showBtnSaveandBackLoading && !mdDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInSaveandBack}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar e Voltar
          </Typography>
        </Button>
      )}
      {showBtnSaveandBackLoading && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showBtnDelete && !showBtnDeleteLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showBtnDeleteLoading && <Skeleton width={110} height={60} />}

      {showBtnNew && !showBtnNewLoading && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textBtnNew}
          </Typography>
        </Button>
      )}
      {showBtnNewLoading && !smDown && <Skeleton width={110} height={60} />}

      {showBtnBack &&
        (showBtnNew || showBtnDelete || showBtnSave || showBtnSaveandBack) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showBtnBack && !showBtnBackLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onClickInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showBtnBackLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
