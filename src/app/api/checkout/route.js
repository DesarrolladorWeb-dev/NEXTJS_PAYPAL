import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

// PARA RECIBIR LA COMPRA DEL USUARIO
const clientID = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
// nos dara un objeto 
const environment = new paypal.core.SandboxEnvironment(clientID, clientSecret);
// Enviar las ordenes de compra a paypal
const client = new paypal.core.PayPalHttpClient(environment);

// Aqui esto ya es una peticion POST
export async function POST() {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        // la informacion que le damos a paypal para decirle para poder cobrar
        request.requestBody({
             //capturando una orden de compra siempre va CAPTURE
            "intent": "CAPTURE",
            // Detalle de la compra : es decir porque que voy a estar pagando
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        // El total de los productos de abajo
                        "value": "100.00",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                // El total de los productos de abajo
                                "value": "100.00",
                            }
                        }
                    },
                    "items": [
                        {
                            "name": "Libro de React",
                            "description": "Un Libro Sobre React",
                            "quantity": "1",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "50.00"
                            }
                        },
                        {
                            "name": "Libro de Next",
                            "description": "Un Libro Sobre Next",
                            "quantity": "1",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "50.00"
                            }
                        }
                    ]
                }
            ]
        });
// Ejecutamos la orden de Compra - y con esta respuesta le enviamos el id al cliente 
        const response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        console.log(`Capture: ${JSON.stringify(response.result)}`);

        return NextResponse.json({
        // Esto tiene el id de la orden de compra
        // Y el frontend espera el id y no un message
            id: response.result.id,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al procesar la orden de compra" }, { status: 500 });
    }
}