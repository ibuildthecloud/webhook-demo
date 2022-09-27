// Get webhook's name and token in local storage
export async function getWebhookLocalInfo() {
    console.log("getWebhookLocalInfo");
    const wh_token = localStorage.getItem("wh_token");
    const wh_name = localStorage.getItem("wh_name");
    if (wh_token && wh_name) {
        return { "token": wh_token, "name": wh_name }
    }
    return null
}

// Save webhook's name and token from local storage
export async function saveWebhookLocalInfo(token, name) {
    console.log("saveWebhookLocalInfo");
    console.log(token, name)
    if (token && name) {
        localStorage.setItem("wh_token", token)
        localStorage.setItem("wh_name", name)
    }
}

// Delete webhook's name and token from local storage
export async function deleteWebhookLocalInfo() {
    console.log("deleteWebhookLocalInfo");
    localStorage.removeItem("wh_token")
    localStorage.removeItem("wh_name")
}

// Create webhook
export async function createNewWebhook() {
    console.log("createNewWebhook")
    const res = await fetch('/wh');
    if (res.status != 201) {
        console.log("error creating new webhook:", res.status)
        return null
    }
    const webhookInfo = await res.json();
    return webhookInfo
}

// Check if webhook exists in database
export async function getWebhookRemoteInfo(token) {
    console.log("getWebhookRemoteInfo");
    const res = await fetch('/wh/info', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    if (res.status != 200) {
        console.log("error creating new webhook:", res.status)
        return null
    }
    const webhookInfo = await res.json();
    return webhookInfo
}