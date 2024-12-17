// public/app.js
document.getElementById('subscribe').addEventListener('click', async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('Service Worker registered:', registration);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BN9DTn5s1QTDijhjJTlf4pvKGy1Mp3_edTfBmTCDbzhKebgVPk6LaDoIoVZYvbURNHtjj-1y22DTd2Pm3k-7m1E' // Replace with your public key
                
            });
            // Send subscription to the server
            await fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Failed to subscribe:', error);
        }
    } else {
        console.warn('Service workers are not supported in this browser.');
    }
   
});

Notification.requestPermission().then(function(permission){
    if(permission === 'granted'){
        console.log('Notification permission granted');
    }else{
        console.log('Notification permission denied');
    }
});