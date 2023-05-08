var classeAtual = "";
var buildAtual = "";
var pontosAtributoPorNivel = [48,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,15,15,15,15,15,16,16,16,16,16,17,17,17,17,17,18,18,18,18,18,19,19,19,19,19,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,30,30,30,30,31,31,31,31];
var pontosGastosPorAtributo = [0,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,16,16,16,16,16,20,20,20,20,20,24,24,24,24,24,28,28,28,28,28,32,32,32,32,32,36,36,36,36,36];
var maxAtributos = 99;
var minNivelBase = 1;
var maxNivelBase = 99;
var maxNivelClasse = 50;


function getClasse(varClasseAtual) {
  return classes.filter(obj => { return obj.classeID === varClasseAtual })[0];
}

function setClasse(varClasseAtual) {
  classeAtual = getClasse(varClasseAtual);
}

function setBuildAtual() {
  let tempBuildAtual = $("#buildPersonagem").val().replace(classeAtual.classeID + "--", "");
  buildAtual = classeAtual.classeBuilds.filter(obj => { return obj.id === tempBuildAtual })[0];
}

function getClasseTipo() {
  return classeAtual.classeTipo;
}

function isAdotado() {
  return $("#adotado").is(":checked");
}

function getBuilds(varClasseAtual) {
  let builds = getClasse(varClasseAtual);
  return builds.classeBuilds;
}

function getClasses() {
  $("#classePersonagem").html("<option disabled>## Classe 3 transcendida ##</option>");
  var tempBuilds = "";
  var isDisabled = "";
  classes.forEach(function(item, index) {
    tempBuilds = getBuilds(item.classeID);
    isDisabled = tempBuilds.length == 0 ? "disabled" : "";
    if(item.classeTipo == "ClasseT3") {
      $("#classePersonagem").append("<option value='" + (item.classeID) + "' " + isDisabled + ">" + (item.classeNome) + " (trans)</option>");
    }
  });
  $("#classePersonagem").append("<option disabled>## Classe 3 não-transcendida ##</option>");
  classes.forEach(function(item, index) {
    tempBuilds = getBuilds(item.classeID);
    isDisabled = tempBuilds.length == 0 ? "disabled" : "";
    if(item.classeTipo == "Classe3") {
      $("#classePersonagem").append("<option value='" + (item.classeID) + "' " + isDisabled + ">" + (item.classeNome) + " (não-trans)</option>");
    }
  });
  $("#classePersonagem").append("<option disabled>## Classe expandida 2 ##</option>");
  classes.forEach(function(item, index) {
    tempBuilds = getBuilds(item.classeID);
    isDisabled = tempBuilds.length == 0 ? "disabled" : "";
    if(item.classeTipo == "ClasseExp2") {
      $("#classePersonagem").append("<option value='" + (item.classeID) + "' " + isDisabled + ">" + (item.classeNome) + "</option>");
    }
  });
  $("#classePersonagem").append("<option disabled>## Doram ##</option>");
  classes.forEach(function(item, index) {
    tempBuilds = getBuilds(item.classeID);
    isDisabled = tempBuilds.length == 0 ? "disabled" : "";
    if(item.classeTipo == "Doram") {
      $("#classePersonagem").append("<option value='" + (item.classeID) + "' " + isDisabled + ">" + (item.classeNome) + "</option>");
    }
  });
}

function readClassAndBuild() {
  classePersonagem = $("#classePersonagem").val();
  buildPersonagem = $("#buildPersonagem").val();
}

function filterItemById() {
  // filtra os itens usando o ID
  return items.filter(obj => { return obj.itemId === "5360" })
}

function filterItemByBuild(slot) {
  // filtra os itens usando o tipo, classe e build
  if(buildRequisitos[buildPersonagem] !== undefined) {
    return items.filter(obj => {
      return (
        obj.itemTipo === slot
        &&
        (obj.itemClasses.includes(classePersonagem) || obj.itemClasses.includes("todas"))
        &&
        obj.itemBonus.some(r=> buildAtual.requisitos.includes(r))
      )
    });
  } else {
    return [];
  }
}

function filterArma(slot, mao) {
  // filtra os itens usando o tipo, classe e build
  if(buildRequisitos[buildPersonagem] !== undefined) {
    return items.filter(obj => {
      return (
        obj.itemTipo === slot
        &&
        (obj.itemClasses.includes(classePersonagem) || obj.itemClasses.includes("todas"))
        &&
        obj.itemBonus.some(r=> buildAtual.requisitos.includes(r))
        &&
        (mao.some(r=> obj.itemSubtipo == r) || obj.itemTipo == buildAtual.maoEsquerda[0])
      )
    });
  } else {
    return [];
  }
}

function listarAtributosMaximos() {
  if( (getClasseTipo() == "Classe1" && !(isAdotado())) || (getClasseTipo() == "ClasseT1" && !(isAdotado())) || (getClasseTipo() == "Classe2" && !(isAdotado())) || (getClasseTipo() == "ClasseT2" && !(isAdotado())) || (getClasseTipo() == "ClasseExp1" && !(isAdotado())) ) { maxAtributos = 99; }
  if( (getClasseTipo() == "Classe3" && !(isAdotado())) || (getClasseTipo() == "ClasseT3" && !(isAdotado())) || (getClasseTipo() == "ClasseExp2" && !(isAdotado())) ) { maxAtributos = 130; }
  if(getClasseTipo() == "Doram") { maxAtributos = 125; }
  if( (getClasseTipo() == "Classe1" && isAdotado()) || (getClasseTipo() == "ClasseT1" && isAdotado()) || (getClasseTipo() == "Classe2" && isAdotado()) || (getClasseTipo() == "ClasseT2" && isAdotado()) ) { maxAtributos = 80; }
  if( (getClasseTipo() == "Classe3" && isAdotado()) || (getClasseTipo() == "ClasseT3" && isAdotado()) ) { maxAtributos = 117; }
  if(getClasseTipo() == "ClasseExp1" && isAdotado()) { maxAtributos = 99; }
  if(getClasseTipo() == "ClasseExp2" && isAdotado()) { maxAtributos = 108; }
  let tempFOR = $("#for").val();
  let tempAGI = $("#agi").val();
  let tempVIT = $("#vit").val();
  let tempINT = $("#int").val();
  let tempDES = $("#des").val();
  let tempSOR = $("#sor").val();
  $("#for, #agi, #vit, #int, #des, #sor").html("");
  for(var i = 1; i <= maxAtributos; i++) {
    $("#for, #agi, #vit, #int, #des, #sor").append("<option value='" + i + "'>" + i + "</option>");
  }
  if(tempFOR <= maxAtributos && tempFOR != null) { $("#for").val(tempFOR); }
  if(tempAGI <= maxAtributos && tempAGI != null) { $("#agi").val(tempAGI); }
  if(tempVIT <= maxAtributos && tempVIT != null) { $("#vit").val(tempVIT); }
  if(tempINT <= maxAtributos && tempINT != null) { $("#int").val(tempINT); }
  if(tempDES <= maxAtributos && tempDES != null) { $("#des").val(tempDES); }
  if(tempSOR <= maxAtributos && tempSOR != null) { $("#sor").val(tempSOR); }
  calcularPontosAtributo();
}

function calcularPontosAtributo() {
  pontosAtributoTotais = 0;
  for(var i = 0; i < parseInt($("#nivelPersonagem").val()); i++) {
    pontosAtributoTotais += pontosAtributoPorNivel[i];
  }
  $("#for, #agi, #vit, #int, #des, #sor").each(function(){
    var pontosDistribuidos = parseInt($(this).val());
    if(pontosDistribuidos > maxAtributos) { $(this).val(maxAtributos); pontosDistribuidos = maxAtributos; }
    for(var ii = 0; ii < pontosDistribuidos; ii++) {
      pontosAtributoTotais -= pontosGastosPorAtributo[ii];
    }
  });
  if(getClasseTipo() == "ClasseT1" || getClasseTipo() == "Classe2" || getClasseTipo() == "ClasseT3") { pontosAtributoTotais += 52; }
  $("#disponiveis").val(pontosAtributoTotais);
}

function listarNivelBase() {
  if(getClasseTipo() == "Classe1" || getClasseTipo() == "ClasseT1" || getClasseTipo() == "Classe2" || getClasseTipo() == "ClasseT2" || getClasseTipo() == "ClasseExp1") { maxNivelBase = 99; }
  if(getClasseTipo() == "Classe3" || getClasseTipo() == "ClasseT3" || getClasseTipo() == "ClasseExp2" || getClasseTipo() == "Doram") { maxNivelBase = 175; }
  if(getClasseTipo() == "Classe3" || getClasseTipo() == "ClasseT3" || getClasseTipo() == "ClasseExp2") { minNivelBase = 99; } else { minNivelBase = 1; }
  let tempNivelBase = $("#nivelPersonagem").val();
  $("#nivelPersonagem").html("");
  for(var i = minNivelBase; i <= maxNivelBase; i++) {
    $("#nivelPersonagem").append("<option value='" + i + "'>" + i + "</option>");
  }
  if(tempNivelBase <= maxNivelBase && tempNivelBase >= minNivelBase && tempNivelBase != null) { $("#nivelPersonagem").val(tempNivelBase); }
}

function listarNivelClasse() {
  if(getClasseTipo() == "Classe1" || getClasseTipo() == "Classe2" || getClasseTipo() == "ClasseT1" || getClasseTipo() == "Doram") { maxNivelClasse = 50; }
  if(getClasseTipo() == "ClasseT2" || getClasseTipo() == "ClasseExp1") { maxNivelClasse = 70; }
  if(getClasseTipo() == "ClasseT3" || getClasseTipo() == "ClasseExp2") { maxNivelClasse = 60; }
  let tempNivelClasse = $("#nivelClasse").val();
  $("#nivelClasse").html("");
  for(var i = 1; i <= maxNivelClasse; i++) {
    $("#nivelClasse").append("<option value='" + i + "'>" + i + "</option>");
  }
  if(tempNivelClasse <= maxNivelClasse && tempNivelClasse != null) { $("#nivelClasse").val(tempNivelClasse); }
}

function exibirBuilds() {
  readClassAndBuild();
  $("#buildPersonagem").html("");
  getBuilds(classePersonagem).forEach(function(item, index) {
    $("#buildPersonagem").append("<option value='" + classePersonagem + "--" + (item.id) + "'>" + (item.nome) + "</option>");
  });
  readClassAndBuild();
}

function exibirItens() {

  // Carrega item TOPO
  var itensTopo = filterItemByBuild("itemTopo");
  $("#itemTopo select.equipamento").html("<option value=''>Nenhum</option>");
  itensTopo.forEach(function(item, index) {
    $("#itemTopo select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item MEIO
  var itensMeio = filterItemByBuild("itemMeio");
  $("#itemMeio select.equipamento").html("<option value=''>Nenhum</option>");
  itensMeio.forEach(function(item, index) {
    $("#itemMeio select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item BAIXO
  var itensBaixo = filterItemByBuild("itemBaixo");
  $("#itemBaixo select.equipamento").html("<option value=''>Nenhum</option>");
  itensBaixo.forEach(function(item, index) {
    $("#itemBaixo select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item ARMADURA
  var itensArmadura = filterItemByBuild("itemArmadura");
  $("#itemArmadura select.equipamento").html("<option value=''>Nenhum</option>");
  itensArmadura.forEach(function(item, index) {
    $("#itemArmadura select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item CAPA
  var itensCapa = filterItemByBuild("itemCapa");
  $("#itemCapa select.equipamento").html("<option value=''>Nenhum</option>");
  itensCapa.forEach(function(item, index) {
    $("#itemCapa select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item SAPATOS
  var itensSapatos = filterItemByBuild("itemSapatos");
  $("#itemSapatos select.equipamento").html("<option value=''>Nenhum</option>");
  itensSapatos.forEach(function(item, index) {
    $("#itemSapatos select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item ACESSÓRIOS
  var itemAcessorio = filterItemByBuild("itemAcessorio");
  var itemAcessorioD = itemAcessorio.slice();
  itemAcessorioD = itemAcessorioD.concat(filterItemByBuild("itemAcessorioD"));
  itemAcessorioD.sort(function (a, b) {
    if (a.itemNome > b.itemNome) { return 1; }
    if (a.itemNome < b.itemNome) { return -1; }
    return 0;
  });
  var itemAcessorioE = itemAcessorio.slice();
  itemAcessorioE = itemAcessorioE.concat(filterItemByBuild("itemAcessorioE"));
  itemAcessorioE.sort(function (a, b) {
    if (a.itemNome > b.itemNome) { return 1; }
    if (a.itemNome < b.itemNome) { return -1; }
    return 0;
  });
  $("#itemAcessorioD select.equipamento").html("<option value=''>Nenhum</option>");
  itemAcessorioD.forEach(function(item, index) {
    $("#itemAcessorioD select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  $("#itemAcessorioE select.equipamento").html("<option value=''>Nenhum</option>");
  itemAcessorioE.forEach(function(item, index) {
    $("#itemAcessorioE select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item MÃO DIREITA
  var itemMaoDireita = filterArma("itemArma", buildAtual.maoDireita);
  $("#itemMaoDireita select.equipamento").html("<option value=''>Nenhum</option>");
  itemMaoDireita.forEach(function(item, index) {
    $("#itemMaoDireita select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  // Carrega item MÃO DIREITA
  $("#itemMaoEsquerda select.equipamento").html("<option value=''>Nenhum</option>");
  if(buildAtual.maoEsquerda.length >= 1) {
    $("#itemMaoEsquerda select").prop("disabled", false);
    var itemMaoEsquerda = filterArma("itemArma", buildAtual.maoEsquerda);
    if(buildAtual.maoEsquerda[0] == "itemEscudo") { itemMaoEsquerda = filterArma("itemEscudo", buildAtual.maoEsquerda); }
    itemMaoEsquerda.forEach(function(item, index) {
      $("#itemMaoEsquerda select.equipamento").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
    });
  } else {
    $("#itemMaoEsquerda select").val("");
    $("#itemMaoEsquerda select").prop("disabled", true);
  }

}

function definirBonusItens() {
  
}

function initCalc() {
  // inicia calculadora
  // readClassAndBuild();
  getClasses();
  exibirBuilds();
  setClasse(classePersonagem);
  setBuildAtual();
  listarNivelBase();
  listarNivelClasse();
  listarAtributosMaximos();
  exibirItens();
}

$(document).ready(function() {
  // documento carregado
  initCalc();

  $("#classePersonagem").on("change", function() {
    readClassAndBuild();
    setClasse(classePersonagem);
    setBuildAtual();
    listarNivelBase();
    listarNivelClasse();
    exibirBuilds();
    listarAtributosMaximos();
    $("#buildPersonagem").trigger("change");
  });

  $("#buildPersonagem").on("change", function() {
    readClassAndBuild();
    setBuildAtual();
    exibirItens();
  });

  $("#adotado").on("change", function() {
    if(classeAtual.transclasse && $(this).is(":checked")) {
      $("#classePersonagem").val(classeAtual.classeID + "_NT")
    }
    listarAtributosMaximos();
  });

  $("#nivelPersonagem").on("change", function() {
    calcularPontosAtributo();
  });

  $(".atributoBase").on("change", function() {
    calcularPontosAtributo();
  });

  $("select.refino, select.equipamento, .carta select").on("change", function() {
    definirBonusItens();
  });
});

































// FIM
