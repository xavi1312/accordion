function isDOM(el) {
    return el instanceof HTMLElement
}

function removeSame(array, el) {
    if (el === null || el == undefined) return array
    return array.filter(item => item.id !== el.id)
}

function makeId(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export { isDOM, makeId, removeSame }