import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress, Box, Paper, Grid, Typography } from "@mui/material";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VForm, VTextField, useVForm } from "../../shared/forms";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: "",
        email: "",
        cidadeId: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id == "nova") {
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (isSaveAndClose()) {
            navigate("/pessoas");
          } else {
            navigate(`/pessoas/detahe/${result}`);
          }
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate("/pessoas");
            }
          }
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente deletar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBase
      title={id !== "nova" ? `Detalhe de ${nome}` : "Adicionar pessoa"}
      ToolsBar={
        <ToolsDetail
          textBtnNew="Nova"
          showBtnSaveandBack
          showBtnNew={id !== "nova"}
          showBtnDelete={id !== "nova"}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSave={save}
          onClickInSaveandBack={saveAndClose}
          onClickInBack={() => navigate("/pessoas")}
          onClickInNew={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  label="Nome Completo"
                  name="nomeCompleto"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  label="Email"
                  name="email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  label="Cidade"
                  name="cidadeId"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBase>
  );
};

{
  /* Para colocar objeto dentro do objeto da resposta do form => recebe como endereco {rua: , numero: } */
}
{
  /* <VTextField name="endereco.rua" />
        <VTextField name="endereco.numero" /> */
}

{
  /* ou para usar como array => salvar varios enderecos  */
}
{
  /* {[1, 2, 3, 4].map((_, index) => {
          <Scope path={`endereco[${index}]`} key="">
            <VTextField name={"rua"} />
            <VTextField name={"numero"} />

            ou (sem o Scope)
            <VTextField name={`endereco[${index}].estado`} />
          </Scope>
        })} */
}
