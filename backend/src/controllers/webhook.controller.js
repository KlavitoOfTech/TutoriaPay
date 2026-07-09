import config from '../config/env.config.js';
import crypto from 'crypto';
import { reconcilePayment } from '../services/webhook.service.js';

const verifyAndReceiveWebhook = async (req, res) => {
    try {
        const nombaSignature = req.headers['nomba-signature'];
        if (!nombaSignature) {
            return res.status(401).json({ message: 'Missing signature' });
        }

        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ message: 'Invalid webhook payload' });
        }

        const payloadString = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', config.NOMBA_WEBHOOK_SIGNATURE)
            .update(payloadString)
            .digest('base64');
        console.log('Hash:', expectedSignature)
        // if (expectedSignature !== nombaSignature) {
        //     return res.status(401).json({ message: 'Unauthorized payload' });
        // }
        const { event_type, payloadData } = req.body
        console.log('Result:', req.body)
        if (event_type == 'payment_success') {
            await reconcilePayment(payloadData)
        }
        res.status(200).json({ event_type });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ message: 'Could not resolve webhook', error: error.message });
    }
};
export { verifyAndReceiveWebhook }