import GroupAccordion from './classes/GroupAccordion.js'

// const accordion = new GroupAccordion(['.accordion__header'])
const accordionHorizontal = new GroupAccordion(['.accordion__header'], {
    orientation: 'horizontal'
})

document.getElementById('openAll').addEventListener('click', ()=> {
    accordion.openAll()
})

document.getElementById('closeAll').addEventListener('click', ()=> {
    accordion.closeAll()
})