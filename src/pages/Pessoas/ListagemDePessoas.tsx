import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ToolsBar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          if (result.message === "Network Error") {
            alert("Erro de Conexão");
          }
        } else {
          console.log(result);
        }
      });
    });
  }, [busca]);

  return (
    <LayoutBase
      title="Listagem de pessoas"
      ToolsBar={
        <ToolsBar
          showInputSearch
          TextBtnNew="Nova"
          inputText={busca}
          onChangeInputText={(text) =>
            setSearchParams({ busca: text }, { replace: true })
          }
        />
      }
    >
      Teste
    </LayoutBase>
  );
};
