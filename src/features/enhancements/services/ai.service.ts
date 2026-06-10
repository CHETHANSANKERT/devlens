import type {
  IAiAssistantService,
  GenerateChatReplyRequest,
  GenerateChatReplyResponse,
} from "../types/ai-assistant.types";
import {
  MOCK_PROMPT_TO_RESPONSE,
} from "../constants/ai-assistant.constants";

/**
 * React-Query-ready service interface.
 *
 * NOTE: This service keeps existing behavior (mock + ~1.4s delay) so UI is unchanged.
 */
export class MockAiAssistantService implements IAiAssistantService {
  async generateChatReply(
    req: GenerateChatReplyRequest
  ): Promise<GenerateChatReplyResponse> {
    // Preserve the existing behavior timing.
    await new Promise((r) => setTimeout(r, 1400));

    const reply =
      MOCK_PROMPT_TO_RESPONSE[req.prompt] ||
      `I've analyzed "${req.prompt}" — here's what I found: this relates to 4 issues in your current sprint. The highest-impact action is addressing TRK-001 first, which unblocks 3 downstream dependencies.`;

    return { reply };
  }
}

let singleton: IAiAssistantService | null = null;

export function getAiAssistantService(): IAiAssistantService {
  if (!singleton) singleton = new MockAiAssistantService();
  return singleton;
}

