import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);

  useEffect(() => {
    setIsLoadingPessoas(true);
    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        if (result.message === "Network Error") {
          alert("Erro de Conexão");
        }
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });

    setIsLoadingCidades(true);
    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        if (result.message === "Network Error") {
          alert("Erro de Conexão");
        }
      } else {
        setTotalCountCidades(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBase
      title="Página Inicial"
      ToolsBar={
        <ToolsDetail
          showBtnNew={false}
          showBtnBack={false}
          showBtnDelete={false}
          showBtnSave={false}
        />
      }
    >
      <Box width="100%" display="flex">
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card sx={{ minHeight: 240 }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Pessoas
                  </Typography>
                  <Box padding={6}>
                    {isLoadingPessoas ? (
                      <Typography variant="h4" align="center">
                        Carregando...
                      </Typography>
                    ) : (
                      <Typography variant="h2" align="center">
                        {totalCountPessoas}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card sx={{ minHeight: 240 }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>
                  <Box padding={6}>
                    {isLoadingCidades ? (
                      <Typography variant="h4" align="center">
                        Carregando...
                      </Typography>
                    ) : (
                      <Typography variant="h2" align="center">
                        {totalCountCidades}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBase>
  );
};
