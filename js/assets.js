// Asset loader placeholder for images and audio
// Loads assets and exposes them on `window.LudoAssets`

(function(){
    const assets = { images: {}, audio: {} };

    function loadImage(key, src) {
        return new Promise(async (resolve) => {
            try {
                // Try to fetch the resource first to get a clearer error if missing
                const resp = await fetch(src);
                if (!resp.ok) {
                    console.warn('Image fetch failed', src, resp.status);
                    return resolve(null);
                }
                const blob = await resp.blob();
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = () => { assets.images[key] = img; resolve(img); };
                img.onerror = (e) => { console.warn('Image load failed', src, e); resolve(null); };
                img.src = url;
            } catch (e) {
                console.warn('Image load exception', src, e);
                resolve(null);
            }
        });
    }

    function loadAudio(key, src) {
        return new Promise((resolve, reject) => {
            try {
                const audio = new Audio();
                audio.oncanplaythrough = () => { assets.audio[key] = audio; resolve(audio); };
                audio.onerror = (e) => { console.warn('Audio load failed', src, e); resolve(null); };
                audio.src = src;
            } catch (e) {
                console.warn('Audio load exception', e);
                resolve(null);
            }
        });
    }

    async function loadAll(list) {
        const tasks = [];
        if (list.images) {
            for (const item of list.images) tasks.push(loadImage(item.key, item.src));
        }
        if (list.audio) {
            for (const item of list.audio) tasks.push(loadAudio(item.key, item.src));
        }
        await Promise.all(tasks);
        return assets;
    }

    // Convenience: auto-register common token images (if files exist on server)
    const defaultImages = [
        { key: 'token-red', src: 'assets/images/token-red.svg' },
        { key: 'token-teal', src: 'assets/images/token-teal.svg' },
        { key: 'token-yellow', src: 'assets/images/token-yellow.svg' },
        { key: 'token-mint', src: 'assets/images/token-mint.svg' },
        { key: 'dice-1', src: 'assets/images/dice-1.svg' },
        { key: 'dice-2', src: 'assets/images/dice-2.svg' },
        { key: 'dice-3', src: 'assets/images/dice-3.svg' },
        { key: 'dice-4', src: 'assets/images/dice-4.svg' },
        { key: 'dice-5', src: 'assets/images/dice-5.svg' },
        { key: 'dice-6', src: 'assets/images/dice-6.svg' },
        { key: 'icon-roll', src: 'assets/images/icon-roll.svg' },
        { key: 'icon-reset', src: 'assets/images/icon-reset.svg' },
        { key: 'board-pattern', src: 'assets/images/board-pattern.svg' },
        { key: 'board-indian', src: 'assets/images/board-indian.svg' }
    ];

    // Try to load defaults (best-effort)
    loadAll({ images: defaultImages }).then(() => {
        console.log('Default assets loaded', assets.images);
        // Report any defaults that failed to load
        const missing = defaultImages.filter(d => !assets.images[d.key]).map(d => d.key);
        if (missing.length) console.warn('Missing default images:', missing);
    }).catch((e) => { console.warn('Asset auto-load failed', e); });

    // Small helper to play a beep using Web Audio API (no external files needed)
    function playBeep(freq = 440, duration = 0.12, volume = 0.05) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = freq;
            g.gain.value = volume;
            o.connect(g);
            g.connect(ctx.destination);
            o.start();
            setTimeout(() => {
                o.stop();
                ctx.close();
            }, duration * 1000);
        } catch (e) {
            console.warn('Beep failed', e);
        }
    }

    window.LudoAssets = { loadAll, assets, playBeep };
})();