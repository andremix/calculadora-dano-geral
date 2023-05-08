var classes = [
  {
    classeID: "Classe_SC",
    classeNome: "Renegado",
    classeNvMinimo: 99,
    classeNvMaximo: 175,
    classeTerceira: true,
    classeTransclasse: true,
    classeAspdBase: 156,
    classePenEscudo: -5,
    classeArmas: [
      {
        idArma: "Arma_Adaga",
        penalidade: -3
      },
      {
        idArma: "Arma_Espada1",
        penalidade: -7
      },
      {
        idArma: "Arma_Machado1",
        penalidade: -159
      },
      {
        idArma: "Arma_Adaga",
        penalidade: -3
      }
    ],
    classeBuilds: [
      { "id": "Arco_Critico", "nome": "Crítico com arco" },
      { "id": "Disparo_Triplo", "nome": "Disparo Triplo" },
      { "id": "Rajada_de_Flechas", "nome": "Rajada de Flechas" },
      { "id": "Impacto_de_Tyr", "nome": "Impacto de Tyr" },
      { "id": "Apunhalar", "nome": "Apunhalar" }
    ]
  },
  "Classe_GX",
  "Classe_RK",
  "Classe_RG",
  "Classe_SU",
  "Classe_AB",
  "Classe_BI",
  "Classe_ME",
  "Classe_SE",
  "Classe_TR",
  "Classe_MU",
  "Classe_WL",
  "Classe_SO",
  "Classe_IN",
  "Classe_KA",
  "Classe_OB"
];
alert("albumina");


var buildsClasses = [];
buildsClasses["Classe_SC"] = [
  { "id": "Arco_Critico", "nome": "Crítico com arco" },
  { "id": "Disparo_Triplo", "nome": "Disparo Triplo" },
  { "id": "Rajada_de_Flechas", "nome": "Rajada de Flechas" },
  { "id": "Impacto_de_Tyr", "nome": "Impacto de Tyr" },
  { "id": "Apunhalar", "nome": "Apunhalar" }
];
buildsClasses["Classe_GX"] = [
  { "id": "Impacto_Meteoro", "nome": "Impacto Meteoro" },
  { "id": "Laminas_de_Loki", "nome": "Lâminas de Loki" },
  { "id": "Lamento_de_Loki", "nome": "Lamento de Loki" },
  { "id": "Katar_Critico", "nome": "Crítico com katar" },
  { "id": "Dual_Critico", "nome": "Crítico com duas armas" }
];

var buildRequisitos = [];
buildRequisitos["Classe_SC--Arco_Critico"] = [
  ["Arma_Arco"],
  ["REQ_Aspd","REQ_DFisico","REQ_DDist","REQ_TCrit","REQ_TCritD","REQ_DCrit","REQ_IgnDef"]
];
