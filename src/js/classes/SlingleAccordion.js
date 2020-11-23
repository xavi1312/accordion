import { isDOM, makeId } from '../utils/utils.js'

const DATA_HEADER = '[data-x-accordion="body"]'
const DATA_TARGET = 'data-target'
const SHOW_CLASS = 'show'

class SigleAccordion {
    constructor (selector, settings) {
        if (selector === null && selector === '') return
        isDOM(selector) ? this.triggers = [selector] : this.triggers = document.querySelectorAll(selector)

        this.settings = {
            orientation: 'vertical',
            onOpen: () => {},
            onClose: () => {},

            ...settings
        }

        this.$ = {
            handleClick: this.handleClick.bind(this),
        }
        console.log(this.settings);
        this._id = makeId(5)

        this.init()
    }
    init() {
        const targetSelector = this.triggers[0].getAttribute(DATA_TARGET)
        this.target = document.querySelector(targetSelector)
        if (this.settings.orientation === 'horizontal') {
            this.open()
            this.target.firstElementChild.style.width = `${this.target.firstElementChild.scrollWidth}px`
            this.target.style.maxHeight = `${this.target.scrollHeight}px`
            this.close()
        }

        this.addEventClick()
    }

    addEventClick() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', this.$.handleClick)
        });
    }
    handleClick() {
        if (this.isOpen) return this.close()
        
        this.open()
    }
    getParent() {
        return this.target.parentElement.closest(DATA_HEADER)
    }
    open() {
        this.target.classList.add(SHOW_CLASS)
        const parent = this.getParent()
        if (this.settings.orentation === 'vertical') {
            if (parent !== null) parent.style.height = `${parent.scrollHeight + this.target.scrollHeight}px`
            this.target.style.height = `${this.target.scrollHeight}px`
        } 
        else {
            this.target.style.width = `100%`
        }
        this.isOpen = true

        this.settings.onOpen(this)
    }
    close() {
        this.target.classList.remove(SHOW_CLASS)
        if (this.settings.orientation === 'vertical') {
            this.target.style.height = null
        }
        else {
            this.target.style.width = null
        }
        this.isOpen = false

        this.settings.onClose(this)
    }

    get allTriggers() {
        return this.triggers
    }
    get id() {
        return this._id
    }
}

export default SigleAccordion