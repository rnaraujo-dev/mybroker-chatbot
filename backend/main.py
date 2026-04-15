from typing import Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai_service import generate_lead_summary
from email_service import send_lead_email

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Backend is running 🚀"}


class Lead(BaseModel):
    name: str
    email: str
    phone: str
    service: str
    answers: Dict[str, str]


@app.post("/api/lead")
def capture_lead(lead: Lead):
    summary = generate_lead_summary(lead.answers)

    print("\n===== NEW LEAD RECEIVED =====")
    print("Name:", lead.name)
    print("Email:", lead.email)
    print("Phone:", lead.phone)
    print("Service:", lead.service)
    print("Answers:", lead.answers)
    print("Summary:", summary)
    print("================================\n")

    # 🔥 SEND EMAIL
    send_lead_email(lead, summary)

    return {
        "status": "success",
        "message": "Lead received",
        "summary": summary
    }