import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress, Box, Paper, Grid, Typography } from "@mui/material";
import * as yup from "yup";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VForm, VTextField, useVForm, IVFormErrors } from "../../shared/forms";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          console.log(result);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id == "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cidades");
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cidades");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente deletar?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  return (
    <LayoutBase
      title={id !== "nova" ? `Detalhe de ${nome}` : "Adicionar cidade"}
      ToolsBar={
        <ToolsDetail
          textBtnNew="Nova"
          showBtnSaveandBack
          showBtnNew={id !== "nova"}
          showBtnDelete={id !== "nova"}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSave={save}
          onClickInSaveandBack={saveAndClose}
          onClickInBack={() => navigate("/cidades")}
          onClickInNew={() => navigate("/cidades/detalhe/nova")}
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
                  label="Nome"
                  name="nome"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
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
