window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("/service_worker.js")
            .then(function (registration) {
                console.log("ServiceWorker registed.");
            }).catch(function (error) {
                console.warn("ServiceWorker error.", error);
            });
    }
});
