export interface SummarizeRequest {
  title: string;
  content: string;
  contextLabel: string;
}

export async function requestAiSummary(payload: SummarizeRequest): Promise<string> {
  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    summary?: string;
    error?: string;
  };

  if (!response.ok || !data.summary) {
    throw new Error(
      data.error || 'Impossibile completare il riassunto AI in questo momento.'
    );
  }

  return data.summary;
}
