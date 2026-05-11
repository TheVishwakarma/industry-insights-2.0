# industry-insights Summary Tool
AI-powered tool to extract, filter, and generate structured summaries of UK social housing tenders and contract awards from daily bulletins (HTML/PDF inputs).

## 🚀 Overview

The Daily Summary Tool streamlines the manual process of reviewing housing sector bulletins by converting unstructured HTML or PDF inputs into structured, high-quality summaries. It is specifically tailored for UK social housing procurement workflows.

## ⚙️ Key Features

* **Multi-format Input Support**
  Accepts both HTML source code and PDF bulletins for processing.

* **Advanced Parsing Engine**
  Extracts tenders and contract awards using rule-based logic and DOM parsing.

* **Sector-Specific Filtering**
  Applies housing-focused filters to remove irrelevant entries (e.g., materials, non-housing sectors, soft FM exclusions).

* **Excel Matching (Tenders Mode)**
  Matches extracted tenders against structured datasets for validation and enrichment.

* **AI-Generated Summaries**
  Produces concise, structured, and publication-ready summaries using AI.

* **Custom Output Formats**

  * Visual summary view
  * WordPress-ready formatted code

* **Interactive Review Interface**
  Allows manual edits, validation, and adjustments before final output generation.

## 🧠 Use Case

Built for analysts and teams working with UK housing procurement data, this tool significantly reduces the time required to:

* Identify relevant tenders
* Structure procurement insights
* Generate consistent daily reports

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, Vanilla JavaScript
* **Libraries:** PDF.js, SheetJS
* **AI Integration:** Anthropic API (Claude)

## 🌐 Deployment

This project is deployed using GitHub Pages for quick and easy access as a browser-based tool.

## 🔒 Note on API Usage

API keys are currently entered via the UI for testing purposes. For production use, a backend service is recommended to securely manage API credentials.

## 📈 Future Enhancements

* Backend integration for secure API handling
* Automated daily bulletin ingestion
* Direct CMS (e.g., WordPress) publishing
* Enhanced AI prompt optimisation
* Bulk processing and scheduling

---

## 🤝 Contribution

Contributions, suggestions, and improvements are welcome. Feel free to fork the repository and submit a pull request.
