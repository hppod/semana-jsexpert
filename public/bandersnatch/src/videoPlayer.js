class VideoMediaPlayer {
    constructor({ manifestJSON }) {
        this.manifestJSON = manifestJSON
        this.videoElement = null
        this.sourceBuffer = null
    }

    initializeCodec() {
        this.videoElement = document.getElementById("vid")

        const mediaSourceSupported = !!window.MediaSource
        if (!mediaSourceSupported) {
            alert('Seu browser não é compatível com este vídeo')
            return
        }

        const codecSupported = MediaSource.isTypeSupported(this.manifestJSON.codec)
        if (!codecSupported) {
            alert(`Seu browser não suporta o codec: ${this.manifestJSON.codec}`)
            return
        }
    }
}