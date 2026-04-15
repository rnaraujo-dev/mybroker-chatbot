import { useState } from "react"
import { flow } from "../data/flow"
import "./ChatWidget.css"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState("start")
  const [messages, setMessages] = useState([
    { sender: "bot", text: flow.start.message },
  ])
  const [inputValue, setInputValue] = useState("")
  const [answers, setAnswers] = useState({})
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  })

  const step = flow[currentStep]

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }])
  }

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }])
  }

  const handleOptionClick = (option) => {
    addUserMessage(option.label)

    setAnswers((prev) => ({
      ...prev,
      [currentStep]: option.label,
    }))

    if (
      [
        "Social Media Marketing",
        "Website / IDX",
        "Ads / Lead Generation",
        "CRM / Automation",
        "Pricing",
      ].includes(option.label)
    ) {
      setLeadForm((prev) => ({ ...prev, service: option.label }))
    }

    const nextStep = option.next
    setCurrentStep(nextStep)

    setTimeout(() => {
      addBotMessage(flow[nextStep].message)
    }, 300)
  }

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)

    setAnswers((prev) => ({
      ...prev,
      [currentStep]: inputValue,
    }))

    const nextStep = step.next
    setInputValue("")
    setCurrentStep(nextStep)

    setTimeout(() => {
      addBotMessage(flow[nextStep].message)
    }, 300)
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:8000/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          answers,
        }),
      })

      const data = await response.json()

      addUserMessage(
        `Name: ${leadForm.name}, Email: ${leadForm.email}, Phone: ${leadForm.phone}`
      )
      addBotMessage(
        "Thank You! — your information has been sent. A My Broker Search team member will follow up with you shortly!"
        )

      console.log("Lead submit response:", data)
      console.log("Captured answers:", answers)
    } catch (error) {
      console.error(error)
      addBotMessage("Something went wrong sending your info. Please try again.")
    }
  }

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          Chat
        </button>
      )}

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <div>
              <strong>My Broker Search</strong>
              <div className="chat-subtitle">Lead Assistant</div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}

            {step?.options && (
              <div className="options-wrap">
                {step.options.map((option) => (
                  <button
                    key={option.label}
                    className="option-btn"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {step?.input && (
              <div className="input-wrap">
                <input
                  type="text"
                  value={inputValue}
                  placeholder="Type your answer..."
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputSubmit()
                  }}
                />
                <button onClick={handleInputSubmit}>Send</button>
              </div>
            )}

            {step?.form && (
              <form className="lead-form" onSubmit={handleLeadSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={leadForm.name}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={leadForm.email}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={leadForm.phone}
                  onChange={(e) =>
                    setLeadForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}