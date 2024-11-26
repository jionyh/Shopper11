export const ERROR_MESSAGES = {
  INVALID_DATA: {
    status: 400,
    error_code: "INVALID_DATA",
    error_description: "Os dados fornecidos no corpo da requisição são inválidos",
  },
  INVALID_DRIVER: {
    status: 400,
    error_code: "INVALID_DRIVER",
    error_description: "Motorista inválido",
  },
  NO_RIDES_FOUND: {
    status: 404,
    error_code: "NO_RIDES_FOUND",
    error_description: "Nenhum registro encontrado",
  },
  DRIVER_NOT_FOUND: {
    status: 404,
    error_code: "DRIVER_NOT_FOUND",
    error_description: "Motorista não encontrado",
  },
  INVALID_DISTANCE: {
    status: 406,
    error_code: "INVALID_DISTANCE",
    error_description: "Quilometragem inválida para o motorista",
  },
  ROUTE_NOT_FOUND: {
    status: 404,
    error_code: "ROUTE_NOT_FOUND",
    error_description: "Nenhuma rota encontrada para os pontos fornecidos",
  },
  GOOGLE_API_ERROR: {
    status: 500,
    error_code: "GOOGLE_API_ERROR",
    error_description: "Erro ao se comunicar com a API do Google Maps",
  },
  IMAGE_GENERATION_ERROR: {
    status: 406,
    error_code: "IMAGE_GENERATION_ERROR",
    error_description: "Erro ao gerar a imagem do mapa",
  },
};
