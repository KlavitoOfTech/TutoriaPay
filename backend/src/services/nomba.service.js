import axios from "axios";
import api from '../config/api.nomba.config.js'
import config from "../config/env.config.js"

let cachedAccessToken = null
let cachedRefreshToken = null

const getAccessToken = async () => {
    try {
        const response = await axios.post('https://api.nomba.com/v1/auth/token/issue', {
            'grant_type': 'client_credentials',
            'client_id': config.NOMBA_LIVE_CLIENT_ID,
            'client_secret': config.NOMBA_LIVE_SECRET_KEY,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'accountId': config.NOMBA_MAIN_ACCOUNT_ID,
            },
        });
        if (response.data.code !== '00') throw new Error('authentication failed');
        return response.data.data
    } catch (error) {
        console.error('Nomba Authentication Failed:', error.response?.data || error.message);
    }
}

const refreshAccessToken = async (accessToken, refreshToken) => {
    try {
        const response = await axios.post('https://api.nomba.com/v1/auth/token/refresh', {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'accountId': config.NOMBA_MAIN_ACCOUNT_ID,
            },
        });
        if (response.data.code !== '00') throw new Error('authentication failed');
        return response.data.data // return nomba authentication details
    } catch (error) {
        console.error('Nomba Authentication Failed:', error.response?.data || error.message);
    }
}

const runBackgroundTokenManager = async () => {
    try{
        const accessRes = await getAccessToken()
        cachedAccessToken = accessRes.access_token
        cachedRefreshToken = accessRes.refresh_token
        setInterval(async () => {
            const refreshRes = await refreshAccessToken(cachedAccessToken, cachedRefreshToken)
            cachedAccessToken = refreshRes.access_token
            cachedRefreshToken = refreshRes.refresh_token
            //console.log('newToken')
        }, 1500000) 
    }
    catch (error) {
        console.error (error.message)
    }
}

const fetchAccessToken = async () => {
    if (!cachedAccessToken || !cachedRefreshToken) {
        await getAccessToken()
    }
    return cachedAccessToken;
}

// Create Nomba virtual account
const createVirtualAccount = async (account_ref, studentName) => {
    try {
        const subAccountId = config.NOMBA_SUB_ACCOUNT_ID
        const res = await api.post(`/v1/accounts/virtual/${subAccountId}`, {
            accountRef: account_ref,
            accountName: studentName,
        })
        const vaRes = res.data;
        if (vaRes.code !== '00') throw new Error('Virtual account creation failed');
        console.log(vaRes.data)
        return vaRes.data
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}

const fetchVirtualAccount = async (identifier) => {
    const res = await api.get(`/v1/accounts/virtual/${identifier}`) // Identifier is account_ref or account number
    console.log(res.data)
    return res.data;
}

const fetchSubAccountTransaction = async (subAccountId) => {
    const res = await api.get(`/v1/transactions/accounts/${subAccountId}/single`) // Identifier is account_ref or account number
    console.log(res.data)
    return res.data;
}

const fetchTransactionHistory = async (accountNumber, dateFrom, dateTo) => {
    const res = await api.get(`/v1/transactions/virtual`, {
        params: {
            virtual_account: accountNumber
            // dateFrom: dateFrom,
            // dateTo: dateTo
        }
    })
    console.log(res.data)
    return res.data;
}
export { runBackgroundTokenManager, fetchAccessToken, createVirtualAccount, fetchVirtualAccount, fetchTransactionHistory, fetchSubAccountTransaction } 