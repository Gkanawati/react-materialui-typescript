import { LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
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
          onClickInSave={() => formRef.current?.submitForm()}
          onClickInSaveandBack={() => formRef.current?.submitForm()}
          onClickInBack={() => navigate("/pessoas")}
          onClickInNew={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome Completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade" name="cidadeId" />
      </Form>
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
