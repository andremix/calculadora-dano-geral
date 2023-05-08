function loadClassAndBuild() {
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
        obj.itemBonus.some(r=> buildRequisitos[buildPersonagem][1].includes(r))
      )
    });
  } else {
    return [];
  }
}

function exibirBuilds() {
  $("#buildPersonagem").html("");
  buildsClasses[classePersonagem].forEach(function(item, index) {
    $("#buildPersonagem").append("<option value='" + classePersonagem + "--" + (item.id) + "'>" + (item.nome) + "</option>");
  });
  loadClassAndBuild();
}

function exibirItens() {
  var itensTopo = filterItemByBuild("itemTopo");
  $("#itemTopo").html("<option value=''>Nenhum</option>");
  itensTopo.forEach(function(item, index) {
    $("#itemTopo").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  var itensMeio = filterItemByBuild("itemMeio");
  $("#itemMeio").html("<option value=''>Nenhum</option>");
  itensMeio.forEach(function(item, index) {
    $("#itemMeio").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  var itensBaixo = filterItemByBuild("itemBaixo");
  $("#itemBaixo").html("<option value=''>Nenhum</option>");
  itensBaixo.forEach(function(item, index) {
    $("#itemBaixo").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  var itensArmadura = filterItemByBuild("itemArmadura");
  $("#itemArmadura").html("<option value=''>Nenhum</option>");
  itensArmadura.forEach(function(item, index) {
    $("#itemArmadura").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  var itensCapa = filterItemByBuild("itemCapa");
  $("#itemCapa").html("<option value=''>Nenhum</option>");
  itensCapa.forEach(function(item, index) {
    $("#itemCapa").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
  var itensSapatos = filterItemByBuild("itemSapatos");
  $("#itemSapatos").html("<option value=''>Nenhum</option>");
  itensSapatos.forEach(function(item, index) {
    $("#itemSapatos").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

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

  $("#itemAcessorio1").html("<option value=''>Nenhum</option>");
  itemAcessorioD.forEach(function(item, index) {
    $("#itemAcessorio1").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });

  $("#itemAcessorio2").html("<option value=''>Nenhum</option>");
  itemAcessorioE.forEach(function(item, index) {
    $("#itemAcessorio2").append("<option value='" + item.itemId + "'>" + item.itemNome + "</option>");
  });
}

function initCalc() {
  // inicia calculadora
  loadClassAndBuild();
  exibirBuilds();
  exibirItens();
}

$(document).ready(function() {
  // documento carregado
  initCalc();

  $("#classePersonagem").on("change", function() {
    loadClassAndBuild();
    exibirBuilds();
    $("#buildPersonagem").trigger("change");
  });

  $("#buildPersonagem").on("change", function() {
    loadClassAndBuild();
    exibirItens();
  });
});

































// FIM
