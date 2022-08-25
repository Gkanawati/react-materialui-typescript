import { ToolsBar, ToolsDetail } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBase title="Página Inicial" ToolsBar={<ToolsDetail />}>
      Teste
    </LayoutBase>
  );
};
