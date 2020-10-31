class Network {
    constructor({ host }) {
        this.host = host
    }

    parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag }) {
        return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host)
    }

    async fetchFile(url) {
        const response = await fetch(url)
        return response.arrayBuffer()
    }

    async getProperResolution(url) {
        const startMs = Date.now()
        const response = await fetch(url)
        await response.arrayBuffer()
        const endMs = Date.now()
        const durationInMs = (endMs - startMs)

        // ao invés de calcular o troughtput vamos calcular pelo tempo
        const resolutions = [
            // de 3 segundos a 20 segundos, pior resolução
            { start: 3001, end: 20000, resolution: 144 },
            // de 901 milisegundos a 3 segundos, média resolução
            { start: 901, end: 3000, resolution: 360 },
            // de 0 milisegundos a 900 miliosegundos, melhor resolução
            { start: 0, end: 900, resolution: 720 },
        ]

        const item = resolutions.find(item => {
            return item.start <= durationInMs && item.end >= durationInMs
        })

        const LOWEST_RESOLUTION = 144
        if (!item) return LOWEST_RESOLUTION

        return item.resolution
    }
}