import { removeSame } from '../utils/utils.js'
import SingleAccordion from './SlingleAccordion.js'

class GroupAccordion {
    constructor (selectors, settings) {
        if (selectors === null) return

        this.selectors = selectors
        this.accordions = []
        this.openedAccordions = []
        this.settings = {
            closeOthers: false,
            orientation: 'vertical',
            onOpen: () => {},
            onClose: () => {},

            ...settings
        }
        this.$ = {
            handleOpen: this.handleOpen.bind(this),
            handleClose: this.handleClose.bind(this)
        }

        this.init()
    }

    init () {
        this.initAccordions()
    }
    initAccordions() {
        this.selectors.forEach(selector => {
            const triggers = document.querySelectorAll(selector)
            triggers.forEach(trigger => {
                this.accordions.push(
                    new SingleAccordion(trigger, {
                        onOpen: this.$.handleOpen,
                        onClose: this.$.handleClose,
                        orientation: this.settings.orientation
                    })
                )
            });
        });
    }
    handleOpen(accordion) {
        this.openedAccordions.push(accordion)
        this.settings.onOpen(accordion)

        if (this.settings.closeOthers) this.closeAll(accordion)
    }
    handleClose(accordion) {
        this.settings.onClose(accordion)
        this.openedAccordions = removeSame(this.openedAccordions, accordion)
    }

    closeAll(excluded) {
        removeSame(this.openedAccordions, excluded).forEach(accordion => {
            accordion.close()
        })
    }
    openAll() {
        this.openedAccordions = []
        this.accordions.forEach(accordion => {
            accordion.open()
            this.openedAccordions.push(accordion)
        })
    }

    get allAccordions() {
        return this.accordions
    }
}

export default GroupAccordion