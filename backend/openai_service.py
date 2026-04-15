def generate_lead_summary(answers: dict) -> str:
    service = answers.get("start", "Unknown service")

    business_type = (
        answers.get("social_1")
        or answers.get("website_1")
        or answers.get("ads_1")
        or answers.get("crm_1")
        or "Unknown business type"
    )

    market = answers.get("social_2", "Unknown market")

    main_issue = (
        answers.get("social_3")
        or answers.get("website_2")
        or answers.get("ads_2")
        or answers.get("crm_2")
        or answers.get("pricing_1")
        or "Unknown need"
    )

    return (
        f"Lead interested in {service}. "
        f"Type: {business_type}. "
        f"Market: {market}. "
        f"Main need: {main_issue}."
    )