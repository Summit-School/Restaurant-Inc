import axios from "axios"


export async function sendNotification(notification: { title: string, description: string }, receipeintIds?: string[]) {

    const body = {
        "app_id": "f1137cf2-0598-4989-bc86-4f6e34a44242",
        // "include_external_user_ids": [receiver.email],
        included_segments: receipeintIds ? receipeintIds : ["Subscribed Users"],

        "data": {
            notification
        },
        "contents": {
            "en": notification.description
        }

    };

    const options = {
        'url': `${"https://onesignal.com/api/v1"}/${'notifications'}`,
        'headers': {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${"MjYyNjQxNWEtNjIzNS00NTg2LWI1M2ItNDEwMjQ5NGQ5Yjkx"}`
        },
    };

    axios.post(options.url, body, { headers: options.headers })
}