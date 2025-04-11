function simulateLongTask() {
    console.log('Starting long-running task simulation');

    const worker = new Worker('src/scripts/longTaskSimulator.js');

    worker.addEventListener('message', (event) => {
        console.log('Long-running task completed');
        document.getElementById('taskResult').textContent = event.data;
        worker.terminate();
    });

    worker.postMessage({ duration: 10000 }); // Simulate a 10-second task
}

// on load simulate the long task
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    simulateLongTask();
    setTimeout(() => {
        const newContent = document.createElement('p');
        newContent.textContent = 'This content was added dynamically without causing layout shift.';
        document.getElementById('dynamicContent').appendChild(newContent);
    }, 2000);
});