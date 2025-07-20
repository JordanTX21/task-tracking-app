import { defineStore } from "pinia";
import { ref } from "vue";

export const alertStore = defineStore('alerts', () => {
    const showAlert = ref(false)
    const showPopUp = ref(false)
    const title = ref("")
    const message = ref("")
    const showCancel = ref(false)
    const popups = ref<Array<any>>([])

    const showModalAlert = (body = { title: '', message: '', showCancel: false }) => {
        title.value = body.title
        message.value = body.message
        showCancel.value = body.showCancel
        showAlert.value = true
    }

    const playBeep = () => {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = 'sine'; // puedes usar 'square', 'sawtooth', etc.
        oscillator.frequency.setValueAtTime(440, context.currentTime); // frecuencia en Hz (440Hz = nota A)

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + 0.3); // duración 300 ms
    }

    const showPopUpAlert = (body = { title: '', message: '', showCancel: false }) => {
        const exists = popups.value.some((item: any) => item.message === body.message)
        if (!exists) {
            popups.value.push(body)
            playBeep()
        }
    }

    const hidePopUps = () => {
        popups.value = []
    }

    const onCancelModal = () => {

    }

    const onAceptModal = () => {

    }

    const onCancelPopUp = () => {

    }

    const onAceptPopUp = () => {

    }

    return { showAlert, showPopUp, showCancel, title, message, popups, showModalAlert, showPopUpAlert, onCancelModal, onAceptModal, onCancelPopUp, onAceptPopUp, hidePopUps }
})