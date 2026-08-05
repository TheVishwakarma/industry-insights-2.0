const SYSTEM_INSTRUCTIONS =
  "You are an expert UK social housing industry writer producing SEO-optimised daily summaries for a professional procurement website. " +
  "Write factual, professional, news-style prose for housing contractors and procurement readers. " +
  "Follow the user's requested output format exactly and never invent missing contract facts.";

function extractOutputText(response) {
  if (!response || !Array.isArray(response.output)) return "";

  return response.output
    .flatMap((item) => (Array.isArray(item.content) ? item.content : []))
    .filter((part) => part && part.type === "output_text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = (process.env.OPENAI_API_KEY || "").trim();
  const model = (process.env.OPENAI_MODEL || "gpt-5.6").trim();

  if (!apiKey) {
    return res.status(500).json({
      error: "Server configuration error: OPENAI_API_KEY is missing.",
    });
  }

  const prompt =
    typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";

  if (!prompt) {
    return res.status(400).json({ error: "A non-empty prompt is required." });
  }

  if (prompt.length > 120000) {
    return res.status(413).json({ error: "The prompt is too large." });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        instructions: SYSTEM_INSTRUCTIONS,
        input: prompt,
        reasoning: { effort: "low" },
        text: { verbosity: "medium" },
        max_output_tokens: 6000,
        store: false,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    const requestId =
      upstream.headers.get("x-request-id") ||
      data?.request_id ||
      "unknown";

    if (!upstream.ok) {
      console.error("OpenAI API error", {
        status: upstream.status,
        requestId,
        type: data?.error?.type,
        code: data?.error?.code,
      });

      let message =
        data?.error?.message || `OpenAI returned HTTP ${upstream.status}.`;

      if (upstream.status === 401) {
        message =
          "The server's OpenAI API key is invalid, revoked, or incorrectly configured.";
      } else if (upstream.status === 403) {
        message =
          "The OpenAI project does not have permission to use this model or endpoint.";
      } else if (upstream.status === 404) {
        message =
          `The configured model "${model}" is unavailable to this OpenAI project.`;
      } else if (upstream.status === 429) {
        message =
          "OpenAI rate or usage limits were reached. Check project billing and limits, then retry.";
      }

      return res.status(upstream.status).json({
        error: message,
        requestId,
      });
    }

    const text = extractOutputText(data);

    if (!text) {
      console.error("OpenAI returned no output text", {
        requestId,
        responseId: data?.id,
        status: data?.status,
      });
      return res.status(502).json({
        error: "OpenAI returned an empty text response.",
        requestId,
      });
    }

    return res.status(200).json({
      text,
      model: data.model || model,
      responseId: data.id,
      requestId,
    });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return res.status(502).json({
      error:
        "Could not reach the OpenAI API. Check the deployment's network connection and logs.",
    });
  }
}
