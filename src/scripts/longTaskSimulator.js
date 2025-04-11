self.addEventListener('message', (event) => {
    const { duration } = event.data;

    console.info('Worker started long-running task simulation for duration:', duration);

    const start = Date.now();
    while (Date.now() - start < duration) {
        // Simulate blocking the thread
    }

    console.info('Worker completed long-running task simulation');

    self.postMessage('Task completed after ' + duration + 'ms');
});