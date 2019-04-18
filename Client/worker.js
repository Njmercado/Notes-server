self.addEventListener('push', e =>{

   const data = e.data.json()
   self.registration.showNotification(data.title, {
      body:'some text',
      icon:'post-it.png'
   })
})