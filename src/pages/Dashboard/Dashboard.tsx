import { ToolsBar } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBase
      title="Página Inicial"
      ToolsBar={<ToolsBar showInputSearch TextBtnNew="Nova" />}
    >
      Teste
    </LayoutBase>
  );
};
