import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../shared/layouts";
import { ToolsDetail } from "../../shared/components";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Save");
  };

  const handleDelete = () => {
    console.log("Save");
  };

  return (
    <LayoutBase
      title="Detalhe de pessoa"
      ToolsBar={
        <ToolsDetail
          textBtnNew="Nova"
          showBtnSaveandBack
          showBtnNew={id !== "nova"}
          showBtnDelete={id !== "nova"}
          onClickInDelete={() => handleDelete}
          onClickInSave={() => handleSave}
          onClickInSaveandBack={() => handleSave}
          onClickInBack={() => navigate("/pessoas")}
          onClickInNew={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <Typography>{id}</Typography>
    </LayoutBase>
  );
};
