import { useEffect, useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cidadeId");
  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");

  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );

  const { debounce } = useDebounce();

  useEffect(
    () =>
      registerField({
        name: fieldName,
        getValue: () => selectedId,
        setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
      }),
    [registerField, fieldName, selectedId]
  );

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          if (result.message === "Network Error") {
            // alert("Erro de Conexão");
          }
        } else {
          console.log(result);
          setOptions(
            result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
          );
        }
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);

    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={
        isLoading || isExternalLoading ? (
          <CircularProgress size={22} sx={{ marginRight: 1 }} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
        clearError();
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
