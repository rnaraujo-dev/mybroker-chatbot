import smtplib
from email.mime.text import MIMEText


def send_lead_email(lead, summary):
    sender_email = "rnaraujo20@gmail.com"
    app_password = "jblp cgjo pxao axsk"

    receiver_email = "rnaraujo20@yahoo.com"

    subject = "🔥 New Lead Received - My Broker Search"

    # 🔥 CLEAN EMAIL BODY
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

    # Add answers dynamically
    for key, value in lead.answers.items():
        body += f"{key}: {value}\n"

    # Create message
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, app_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        print("✅ Email sent successfully")

    except Exception as e:
        print("❌ Email failed:", str(e))