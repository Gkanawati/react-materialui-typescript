import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseProps {
  children: ReactNode;
  ToolsBar?: ReactNode;
  title: string;
}
export const LayoutBase: React.FC<ILayoutBaseProps> = ({
  children,
  title,
  ToolsBar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>

      {ToolsBar && <Box>{ToolsBar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
