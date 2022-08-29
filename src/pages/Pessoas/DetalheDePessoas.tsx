import { LinearProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
          setIsLoading(false);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("Save");
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
          onClickInSave={() => handleSave}
          onClickInSaveandBack={() => handleSave()}
          onClickInBack={() => navigate("/pessoas")}
          onClickInNew={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <Typography>{id}</Typography>
    </LayoutBase>
  );
};
