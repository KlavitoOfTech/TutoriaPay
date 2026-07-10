import config from '../config/env.config.js';
import crypto from 'crypto';
import { reconcilePayment } from '../services/webhook.service.js';

const verifyAndReceiveWebhook = async (req, res) => {
    try {
        const nombaSignature = req.headers['nomba-signature'];  // Grab signature header from incoming payload
        if (!nombaSignature) {
            return res.status(401).json({ message: 'Missing signature' });
        }

        // Handle incoming payload verification
        const payloadString = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', config.NOMBA_WEBHOOK_SIGNATURE)
            .update(payloadString)
            .digest('base64');
        console.log('expectedHash:', expectedSignature)
        console.log('receivedHash:', nombaSignature)
        // if (expectedSignature !== nombaSignature) {
        //     console.log('Bad signature')
        //     return res.status(401).json({ message: 'Unauthorized payload' });
        // }

        const { event_type, data } = req.body  // destructur request body

        //  Handle failed payment
        if (event_type == 'payment_failed') {
            return res.status(200).json({ event_type })        
        }

        // Handle payment success event
        if (event_type == 'payment_success') {
            await reconcilePayment(data)
        }

        // Handle payment reversal
        if (event_type == 'payment_reversal') {
            return res.status(200).json({ event_type })
        }

        console.log('Webhook processed successfully')
        res.status(200).json({ event_type });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ message: 'Could not resolve webhook', error: error.message });
    }
};
export { verifyAndReceiveWebhook }