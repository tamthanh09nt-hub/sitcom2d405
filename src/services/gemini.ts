
export interface Character {
  name: string;
  appearance: string;
  tone?: string;
}

export interface Scene {
  sceneNumber: number;
  audioScript: string;
  videoPrompt: string;
  negativePrompt: string;
}

export interface CharacterReference {
  name: string;
  referencePrompt: string;
}

export interface GenerationResult {
  episodeTitle: string;
  scenes: Scene[];
  characterReferences: CharacterReference[];
}

export async function generateScript(
  characters: Character[],
  situation: string,
  aspectRatio: "16:9" | "9:16",
  duration: number,
  topic: string = "Đời thường",
  customApiKey?: string
): Promise<GenerationResult> {
  const response = await window.fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ characters, situation, aspectRatio, duration, topic, apiKey: customApiKey })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Generation failed');
  }
  
  return await response.json();
}
