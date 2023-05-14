var classeAtual = "";
var buildAtual = "";
var pontosAtributoPorNivel = [48,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,15,15,15,15,15,16,16,16,16,16,17,17,17,17,17,18,18,18,18,18,19,19,19,19,19,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,30,30,30,30,31,31,31,31];
var pontosGastosPorAtributo = [0,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,16,16,16,16,16,20,20,20,20,20,24,24,24,24,24,28,28,28,28,28,32,32,32,32,32,36,36,36,36,36];
var maxAtributos = 99;
var minNivelBase = 1;
var maxNivelBase = 99;
var maxNivelClasse = 50;
let ataquePorRefino = {
  "1": 2,
  "2": 3,
  "3": 5,
  "4": 7
}
let overPorRefino = {
  "1": 2,
  "2": 5,
  "3": 8,
  "4": 14
}
let todosItensSelecionados = {
  "itemTopo": {},
  "itemMeio": {},
  "itemBaixo": {},
  "itemArmadura": {},
  "itemMaoDireita": {},
  "itemMaoEsquerda": {},
  "itemCapa": {},
  "itemSapatos": {},
  "itemAcessorioD": {},
  "itemAcessorioE": {}
};


function getItemRefino(slot) {
  return (document.querySelector("#" + slot + " select.refino") ? (parseInt(document.querySelector("#" + slot + " select.refino").value)) : 0);
}

function getAtributoBase(atributo) {
  return parseInt(document.querySelector("#" + atributo).value);
}

function getNivelBase() {
  return parseInt(document.querySelector("#nivelPersonagem").value);
}

function getNivelClasse() {
  return parseInt(document.querySelector("#nivelClasse").value);
}

function isClasse(lista) {
  return lista.includes(classeAtual.classeID);
}

function isTipoArma(slot, lista) {
  return lista.includes((filterItemById($(".itemSlot#" + slot + " select.equipamento").val())).itemSubtipo);
}

function hasCombo(slotOriginal, itemOriginal, opcoesItens) {
  let temTodosItens = true;
  opcoesItens.forEach(function(itemCombo, index) {
    let elementosComCombo = $(`select.equipamento, .carta select, #municoes select`).filter(function(item, index) { return itemCombo.includes(($(this).val()).replace(/\D+/g, '')) }).length;
    if(elementosComCombo <= 0) temTodosItens = false;
  });
  let primeiroElementoItemOriginal = $(`select.equipamento, .carta select, #municoes select`).filter(function(item, index) { return $(this).val() == itemOriginal }).eq(0).closest(".itemSlot").attr("id");
  return (temTodosItens && slotOriginal == primeiroElementoItemOriginal);
}

function isOpponent(tipo, ids) {
  let quantidadeAlvos = $(`#${tipo}`).filter(function(item, index) { return ids.includes($(this).val()) }).length;
  return quantidadeAlvos > 0;
}

function isOpponentChefe() {
  return $("#chefe").prop("checked");
}


function getClasse(varClasseAtual) {
  return classes.find(obj => { return obj.classeID === varClasseAtual });
}

function setClasse(varClasseAtual) {
  classeAtual = getClasse(varClasseAtual);
  if(classeAtual.transclasse) {
    $("#adotado").prop("checked",false);
  }
}

function setBuildAtual() {
  let tempBuildAtual = $("#buildPersonagem").val().replace(classeAtual.classeID + "--", "");
  buildAtual = classeAtual.classeBuilds.find(obj => { return obj.id === tempBuildAtual });
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

function filterItemById(id) {
  // filtra os itens usando o ID
  return items.find(obj => { return obj.itemId == id })
}

function filterCartaById(id) {
  // filtra os itens usando o ID
  return cartas.find(obj => { return obj.cartaID == id })
}

function filterAmmoById(id) {
  // filtra os itens usando o ID
  return municoes.find(obj => { return obj.municaoId == id })
}

function filterCartaByBuild(slot) {
  // filtra as cartas usando o tipo e build
  if(buildAtual.requisitos !== undefined) {
    return cartas.filter(obj => {
      return (
        (obj.cartaSlot === slot || obj.cartaSlot === "essencia")
        &&
        obj.itemBonus.some(r=> buildAtual.requisitos.includes(r))
      )
    });
  } else {
    return [];
  }
}

function filterEncantamentoByItem(listaEncantamentos) {
  // filtra as cartas usando o tipo e build
  if(buildAtual.requisitos !== undefined) {
    return cartas.filter(obj => {
      return (
        obj.cartaSlot === "encantamento"
        &&
        listaEncantamentos.includes(obj.cartaID)
      )
    });
  } else {
    return [];
  }
}

function filterItemByBuild(slot) {
  // filtra os itens usando o tipo, classe e build
  if(buildAtual.requisitos !== undefined) {
    return items.filter(obj => {
      return (
        obj.itemTipo === slot
        &&
        (obj.itemClasses.includes(classePersonagem) || obj.itemClasses.includes("todas") || (classeAtual.transclasse && obj.itemClasses.includes("transclasse")))
        &&
        obj.itemBonus.some(r=> buildAtual.requisitos.includes(r))
      )
    });
  } else {
    return [];
  }
}

function filterAmmoByWeaponType(tipo) {
  // filtra os itens usando o tipo, classe e build
  if(buildAtual.requisitos !== undefined) {
    let municoesSelecionadas = municoes.filter(obj => {
      return (
        obj.municaoTipo === tipo
        &&
        parseInt(obj.municaoNivel) <= getNivelBase()
        &&
        obj.municaoBonus.some(r=> buildAtual.requisitos.includes(r))
      )
    });
    return municoesSelecionadas;
  } else {
    return [];
  }
}

function filterArma(slot, mao) {
  // filtra os itens usando o tipo, classe e build
  if(buildAtual.requisitos !== undefined) {
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

function exibirCartas(posicao) {
  let slotCarta = posicao;
  $("#" + posicao + " div.carta select").val("");
  $("#" + posicao + " div.carta").slice(1).remove();
  $("#" + posicao + " div.carta").html("");
  if(posicao == "itemTopo" || posicao == "itemMeio") slotCarta = "itemCabeca";
  if(posicao == "itemMaoDireita") slotCarta = "itemArma";
  if(posicao == "itemAcessorioD" || posicao == "itemAcessorioE") slotCarta = "itemAcessorio";
  let slots = 0;
  if(posicao != "") {
    let itemSelecionado = $("#" + posicao + " select.equipamento").val();
    if(itemSelecionado) {
      let item = filterItemById(itemSelecionado);
      let slots = item.slots;
      let encantamentosItem = (item.encantamentos) ? item.encantamentos : [];
      let qtdEncantamentos = (encantamentosItem.length > 0) ? encantamentosItem.length : 0;

      let htmlcode = `<div class="row carta">`;
      if(slots > 0) {
        let listaCartas = filterCartaByBuild(slotCarta);
        for(let i = 1; i <= slots; i++) {
          if(i % 2 == 1 && i != 1) {
            htmlcode += `</div><div class="row carta">`;
          }
          let tamanhoDiv = ((slots + qtdEncantamentos) % 2 == 1 && i == slots + qtdEncantamentos) ? "col-12" : "col-6";
          htmlcode += `<div class="${tamanhoDiv} carta-${i}"><select><option value="">Carta</option>`;
          listaCartas.forEach(function(carta, index) {
            htmlcode += `<option value="${carta.cartaID}">${carta.cartaNome}</option>`;
          });
          htmlcode += `</select></div>`;
        }
      }
      if(qtdEncantamentos > 0) {
        for (const [index, listaEncantamentos] of encantamentosItem.entries()) {
          if((slots + index + 1) % 2 == 1 && (index + 1 + slots) != 1) {
            htmlcode += `</div><div class="row carta">`;
          }
          let encantamentos = filterEncantamentoByItem(listaEncantamentos);
          let tamanhoDiv = ((slots + qtdEncantamentos) % 2 == 1 && (slots + index + 1 == slots + qtdEncantamentos)) ? "col-12" : "col-6";
          htmlcode += `<div class="${tamanhoDiv} carta-${slots + index}"><select><option value="">Encantamento</option>`;
          encantamentos.forEach(function(carta, index) {
            htmlcode += `<option value="${carta.cartaID}">${carta.cartaNome}</option>`;
          });
          htmlcode += `</select></div>`;
        }
      }
      htmlcode += `</div>`;
      $("#" + posicao + " div.carta").replaceWith(htmlcode);
    }
  }
  $("#" + posicao + " div.carta select").on("change", onChangeInputs);
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

function getItemBonusName(bonusId) {
  return bonusId in itemBonuses ? itemBonuses[bonusId].nome : "Bônus não encontrado";
}
function isItemBonusPercentage(bonusId) {
  return bonusId in itemBonuses ? itemBonuses[bonusId].porcentagem : false;
}

function definirBonusItens() {

  // Lendo bônus dos itens equipados
  $("select.equipamento").each(function() {
    let itemId = $(this).val();
    let slot = $(this).closest(".itemSlot").attr("id");
    $(`#${slot} .cool-box--header img`).remove();

    if(itemId != "") {
      $(`#${slot} .cool-box--header`).append(`<img src="https://www.divine-pride.net/img/items/item/bRO/${(itemId).replace(/\D+/g, '')}">`);

      let item = filterItemById(itemId);
      if(slot == "itemMaoDireita") {
        let idMunicao = $("#municoes select").val();
        todosItensSelecionados[slot]["atqarma"] = item.itemArmaATQ + (ataquePorRefino[String(item.itemArmaNivel)] * getItemRefino("itemMaoDireita"));
        if(idMunicao) {
          let municaoSelecionada = filterAmmoById(idMunicao);
          let municao = municaoSelecionada.municaoAtaque || 0;
          todosItensSelecionados[slot]["atqmunicao"] = municao;
          $("select#municao").val(String(municaoSelecionada.municaoPropriedade));
          $.each(municaoSelecionada.municaoFuncao(), function(index, value) {
            todosItensSelecionados[slot][index] = (todosItensSelecionados[slot][index] ? todosItensSelecionados[slot][index] : 0) + value;
          });
        } else {
          $("select#municao").val("0");
        }
      }

      // Contabilizando bônus dos itens
      let bonusItem = item.itemFuncao(slot, itemId);
      $.each(bonusItem, function(index, value) {
        todosItensSelecionados[slot][index] = (todosItensSelecionados[slot][index] ? todosItensSelecionados[slot][index] : 0) + value;
      });

    }
  });

  // Lendo bônus das cartas equipadas
  $(".carta select").each(function() {
    let cartaId = $(this).val();
    let slot = $(this).closest(".itemSlot").attr("id");
    if(cartaId != "") {
      let carta = filterCartaById(cartaId);

      // Contabilizando bônus dos itens
      let bonusCarta = carta.itemFuncao(slot, cartaId);
      $.each(bonusCarta, function(index, value) {
        todosItensSelecionados[slot][index] = (todosItensSelecionados[slot][index] ? todosItensSelecionados[slot][index] : 0) + value;
      });
    }
  });

  // Exibindo itens na tela
  $.each(todosItensSelecionados, function(indexTodosItens, valueTodosItens) {
    let elemento = $("#" + indexTodosItens + " .itemBonus");
    elemento.html("");
    if(Object.keys(valueTodosItens).length > 0) {
      $.each(valueTodosItens, function(indexBonus, valueBonus) {
        if(valueBonus) {
          if(!(indexBonus.indexOf("--") >= 0 && indexBonus.replace(indexBonus.substr(0,indexBonus.indexOf("--")) + "--","") != buildAtual.id)) {
            elemento.append(
              `<div class="col-12"><span>${getItemBonusName(indexBonus)}:</span><span>${valueBonus}${isItemBonusPercentage(indexBonus) ? "%" : ""}</span></div>`
            )
          }
        }
      });
    }
  });

}

function getFormulaSkill(prop, base, classe) {
  let formula = buildAtual.formula(prop, base, classe);
  console.log("Formula: " + formula + "%");
  return formula
}

function calcular() {
  console.log("### Calculando ###");
  let bonusConsolidados = {};
  $.each(todosItensSelecionados, function(indexTodosItens, valueTodosItens) {
    $.each(valueTodosItens, function(index, valor) {
      bonusConsolidados[index] = parseInt((bonusConsolidados[index] ? bonusConsolidados[index] : 0) + valor);
    });
  });

  let formulaSkill = getFormulaSkill(bonusConsolidados, getNivelBase(), getNivelClasse());

  bonusConsolidados.atributoforca = (bonusConsolidados.atributoforca ? bonusConsolidados.atributoforca : 0) + getAtributoBase("for");
  bonusConsolidados.atributoagilidade = (bonusConsolidados.atributoagilidade ? bonusConsolidados.atributoagilidade : 0) + getAtributoBase("agi");
  bonusConsolidados.atributovitalidade = (bonusConsolidados.atributovitalidade ? bonusConsolidados.atributovitalidade : 0) + getAtributoBase("vit");
  bonusConsolidados.atributointeligencia = (bonusConsolidados.atributointeligencia ? bonusConsolidados.atributointeligencia : 0) + getAtributoBase("int");
  bonusConsolidados.atributodestreza = (bonusConsolidados.atributodestreza ? bonusConsolidados.atributodestreza : 0) + getAtributoBase("des");
  bonusConsolidados.atributosorte = (bonusConsolidados.atributosorte ? bonusConsolidados.atributosorte : 0) + getAtributoBase("sor");

  let itemArmaAtual = filterItemById($("#itemMaoDireita select.equipamento").val());
  let refinoArmaAtual = getItemRefino("itemMaoDireita");
  let statusAtq = 0;
  let statBonus = 0;
  let overRefino = 0;
  let highRefino = 0;
  let weaponAtq = 0;

  let itemArmaATQ =  0;
  let itemArmaNivel =  0;
  let variance = 0;
  let danoTamanho = 1;

  if(itemArmaAtual != undefined) {
    let tipoArma = tiposArmas.find(obj => { return obj.armaId === itemArmaAtual.itemSubtipo });

    itemArmaATQ = itemArmaAtual.itemArmaATQ;
    itemArmaNivel = itemArmaAtual.itemArmaNivel;

    variance = parseInt(0.05 * itemArmaNivel * itemArmaATQ);
    bonusRefino = refinoArmaAtual * ataquePorRefino[itemArmaNivel];
    overRefino = Math.max(refinoArmaAtual - (8 - itemArmaNivel), 0) * overPorRefino[itemArmaNivel];
    highRefino = (Math.max(refinoArmaAtual - 16, 0) * (parseInt(itemArmaNivel / 2) + 1)) + (16 * (parseInt(itemArmaNivel / 2) + 1) * Math.max(Math.min(refinoArmaAtual - 15, 1), 0));

    danoTamanho = tipoArma.armaPenalidades[$("#tamanhoMonstro").val()];

    if($("#itemMaoDireita select.equipamento").val() != "" && isTipoArma("itemMaoDireita", ["Arma_Arco","Arma_Instrumento","Arma_Chicote","Arma_Pistola","Arma_Rifle","Arma_Metralhadora","Arma_Espingarda","Arma_Granadas"])) {
      statusAtq = parseInt(getNivelBase() / 4) + bonusConsolidados.atributodestreza + parseInt(bonusConsolidados.atributoforca / 5) + parseInt(bonusConsolidados.atributosorte / 3);
      statBonus = parseInt((itemArmaATQ * bonusConsolidados.atributodestreza) / 200);
    } else {
      statusAtq = parseInt(getNivelBase() / 4) + bonusConsolidados.atributoforca + parseInt(bonusConsolidados.atributodestreza / 5) + parseInt(bonusConsolidados.atributosorte / 3);
      statBonus = parseInt((itemArmaATQ * bonusConsolidados.atributoforca) / 200);
    }

    weaponAtqMin = parseInt((itemArmaATQ - variance + statBonus + bonusRefino + highRefino) * danoTamanho);
    weaponAtqMax = parseInt((itemArmaATQ + variance + statBonus + bonusRefino + highRefino + overRefino) * danoTamanho);

    extraAtq = (bonusConsolidados.atq || 0) + (bonusConsolidados.atqmunicao || 0);
    console.log("extraAtq: " + extraAtq);
  }

  console.log("---------------------------");
}

function exibirMunicoes() {
  let idMaoDireita = $("#itemMaoDireita select.equipamento").val();
  if(idMaoDireita != "") {
    let itemMaoDireita = filterItemById(idMaoDireita);
    let tipoItemMaoDireita = itemMaoDireita.itemSubtipo;
    if(tipoItemMaoDireita == "Arma_Arco" && $("#municoes").length <= 0) {
      let row = $("#itemMaoDireita select.equipamento").closest(".row");
      let municoesAtuais = filterAmmoByWeaponType("flecha");
      let htmlcode = `<div class="col-6" id="municoes"><select><option value="">Munição</option>`;
      municoesAtuais.forEach(function(municao, index) {
        htmlcode += `<option value="${municao.municaoId}">${municao.municaoNome}</option>`;
      });
      htmlcode += `</select></div>`;
      row.append(htmlcode);
      $("#municoes").on("change", onChangeInputs)
    }
    if(tipoItemMaoDireita != "Arma_Arco") {
      $("#municoes").remove();
    }
  } else {
    $("select#municao").val("0");
    $("#municoes").remove();
  }
}

function zerarTodosItensSelecionados() {
  todosItensSelecionados = {
    "itemTopo": {},
    "itemMeio": {},
    "itemBaixo": {},
    "itemArmadura": {},
    "itemMaoDireita": {},
    "itemMaoEsquerda": {},
    "itemCapa": {},
    "itemSapatos": {},
    "itemAcessorioD": {},
    "itemAcessorioE": {}
  }
  $(".itemSlot .itemBonus").html("");
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

function onChangeInputs() {
  zerarTodosItensSelecionados();
  if($(this).is("select.equipamento")) {
    let posicao = $(this).closest(".itemSlot").attr("id");
    exibirCartas(posicao);
  }
  definirBonusItens();
  exibirMunicoes();
  calcular();
}

$(document).ready(function() {
  // documento carregado
  initCalc();

  $("#classePersonagem").on("change", function() {
    readClassAndBuild();
    setClasse(classePersonagem);
    zerarTodosItensSelecionados();
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
    zerarTodosItensSelecionados();
    exibirItens();
    exibirMunicoes();
  });

  $("#adotado").on("change", function() {
    if(classeAtual.transclasse && $(this).is(":checked")) {
      if($("#classePersonagem option[value=" + classeAtual.classeID + "_NT" + "]").val() != undefined) {
        $("#classePersonagem").val(classeAtual.classeID + "_NT");
      } else {
        $("#adotado").prop("checked",false);
      }
      $("#classePersonagem").trigger("change");
    }
    listarAtributosMaximos();
  });

  $("#nivelPersonagem").on("change", function() {
    calcularPontosAtributo();
  });

  $(".atributoBase").on("change", function() {
    calcularPontosAtributo();
  });

  $("select.refino, select.equipamento, .carta select, .atributoBase, #alvo :input, #municoes select, select#nivelPersonagem, select#nivelClasse").on("change", onChangeInputs);
});

































// FIM
