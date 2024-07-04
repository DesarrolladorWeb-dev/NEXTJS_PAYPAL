"use client"
import React from 'react'
import {PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
function HomePage() {
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
    <div className='h-screen bg-slate-950 flex justify-center items-center'>
    
          <PayPalScriptProvider options={{
            clientId : "AdhIUOdTllqa8gD4XJg_pThAclmsKkxWllhUbYwnkjn3BfgZF5iHwYMuBDGhbTkVtp_LF3QkeqGqLZ1W"

          }} >
              <PayPalButtons style={{
                color : "blue",
                layout  : "horizontal",
              }} 
              // detalle para saber porque cosa voy a cobrara
              createOrder={async() => {
                const res = await fetch('/api/checkout', {
                  method : "POST"
                })
                const order = await res.json()
                console.log(order)
                // Aqui le decimos que va a retornar de data el id
                return order.id
              }}
              // Escuchara la respuesta que tenga desde paypal
              onApprove={(data, actions)=>{
                // orderId: el orden de compra (es el mismo order.id de arriba)
                // payerId: quien a pagado
                // paymentID: 
                console.log(data)

                // action es un conjunto de objetos con funciones
                // Ahora lo registramos - capturar el pago y termine de procesarlo
                actions.order.capture()  //con esto tendremos la orden hecha
                
                // Si queremos ver donde esta la orden hecha - iremos a sanboxpaypal - pagina de paypa para usuarios falsos
                // veremos los gastos de la cuenta

                // DEL ID QUE TENEMOS AQUI RECIRA EL PAGO - que es una cuenta sanboxpaypal 

              }}
              // CANCELACION DE ORDEN
              onCancel={(data) => {
                // en data estara el id de la orden de compra
                console.log("Cancelado : ",data)
              }}

              />
          </PayPalScriptProvider>
    </div>

);
}


              // createOrder={() => {}}
              // // cuando no quiere pagar 
              // onCancel={() => {}}
              // // cuando el usaurio ya pago 
              // onApprove={() => {}}
export default HomePage