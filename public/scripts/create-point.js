function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //em cima do option é uma crase*
            }
        })
}



populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value


    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //em cima do option é uma crase*
            }
            citySelect.disabled = false

        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li

const itemsToColect = document.querySelectorAll(".items-grid li")
for (const item of itemsToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectItems = []


function handleSelectedItem(event) {
    const itemLi = event.target
        //adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // console.log('ITEM ID:', itemId) - pra ver se esta funcionando no backend


    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //se ja estiver selecionado
    if (alreadySelected >= 0) {

        //tirar da seleção
        const filteredItems = selectItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar na seleção
        selectItems.push(itemId)
    }

    // console.log('selectedItems:', selectItems)


    //atualizar o campo escondido  com os itens selecionados
    collectedItems.value = selectItems
}