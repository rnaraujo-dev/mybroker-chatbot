import os
import json
from urllib.request import Request, urlopen


def send_lead_email(lead, summary):
    api_key = os.getenv("re_Z5rC5bgo_BL4BTtsfBAKnkCFkkEZosWaj")

    receiver_email = "rnaraujo20@yahoo.com"

    subject = "🔥 New Lead Received - My Broker Search"

    # SAME BODY STYLE YOU HAD
    body = f"""
🚨 HIGH INTENT LEAD - MY BROKER SEARCH

----------------------------------

👤 Name: {lead.name}
📧 Email: {lead.email}
📞 Phone: {lead.phone}
📌 Service: {lead.service}

----------------------------------

🧠 SUMMARY:
{summary}

----------------------------------

📋 DETAILS:
"""

    for key, value in lead.answers.items():
        body += f"{key}: {value}\n"

    payload = {
        "from": "My Broker Search <onboarding@resend.dev>",
        "to": [receiver_email],
        "subject": subject,
        "text": body,  # using plain text (same as before)
    }

    req = Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(req) as response:
            print("✅ Email sent successfully via Resend")

    except Exception as e:
        print("❌ Email failed:", str(e))