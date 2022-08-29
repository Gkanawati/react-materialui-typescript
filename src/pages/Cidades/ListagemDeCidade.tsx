import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ToolsBar } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  return (
    <LayoutBase
      title="Listagem de cidades"
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
