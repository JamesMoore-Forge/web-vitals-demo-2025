// worker.js
// Function to identify prime numbers
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to find prime numbers in range
function findPrimes(start, end) {
    const primes = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
    const { start, end } = event.data;
    const primes = findPrimes(start, end);
    self.postMessage(primes); // Send result back to the main thread
});