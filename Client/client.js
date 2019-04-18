const publicVapidKey = "BHcvEVyfQHL_BhSUYduy-06DschMO7nsbVBeQ4OY0rtyH3edxStaUgkRFEvWHhB9fUQhoBjBvEcz6LG2cX8iE5g"
console.log('error!°°°!!!!!!!!!!!')

if('serviceWorker' in navigator){
   
   send().cath(err => console.error(err))
}else{
   swal('Este navegador no soporta ServiceWorkers, por lo tanto no se podrán enviar notificaciones para mantenerle atento')
}

async function send(){

   const register = await navigator.serviceWorker.register('/worker.js', {
      scope:'/'
   })

   const subcription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
   })

   const data = {
      subscription: subcription,
      title:"some thing"
   }

   await fetch('/subscribe', 
   {
      method:'POST',
      body: JSON.stringify(data),
      headers:{
         "content-type":"application/json"
      }
   })

}

//This function is needed, because VAPID key only support a Uint8array to subscribe.
function urlBase64ToUint8Array(base64String){

   const padding = "=".repeat((4 - base64String.length % 4) % 4);
   const base64 = (base64String + padding)
     .replace(/\-/g, "+")
     .replace(/_/g, "/");
 
   const rawData = window.atob(base64);
   const outputArray = new Uint8Array(rawData.length);
 
   for (let i = 0; i < rawData.length; ++i) {
     outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray;
}