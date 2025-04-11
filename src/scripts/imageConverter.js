self.addEventListener('message', async (event) => {
    const { imageDataUrl } = event.data;

    console.log('Worker received image data URL');

    // Create an offscreen canvas
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');

    // Create an image bitmap from the data URL
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    const img = await createImageBitmap(blob);

    console.log('Image decoded');

    // Set canvas size to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0);

    // Convert the canvas content to JPG
    const jpgBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
    console.log('JPG conversion complete, sending back to main thread');

    // Send the JPG data URL back to the main thread
    self.postMessage({ imageDataUrl: URL.createObjectURL(jpgBlob) });
});
