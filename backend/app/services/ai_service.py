"""AI Tutor Service dispatcher with graceful degradation and mock fallback."""
import logging
from app.core.config import settings
from app.schemas.ai_tutor import HintRequest, HintResponse, ChatRequest, ChatResponse
from app.services.mock_service import MockAITutorService

logger = logging.getLogger(__name__)


class AITutorService:
    @classmethod
    async def get_hint(cls, request: HintRequest) -> HintResponse:
        # If mock mode enabled or no API key, gracefully use mock service
        if settings.USE_MOCK_AI or not settings.GEMINI_API_KEY:
            return MockAITutorService.generate_hint(request)

        try:
            # Placeholder for external LLM call (e.g. Google Gemini Flash or Groq)
            # Falls back cleanly to mock if API call fails or times out
            return MockAITutorService.generate_hint(request)
        except Exception as e:
            logger.warning(f"Failed to query external AI service: {e}. Falling back to mock.")
            return MockAITutorService.generate_hint(request)

    @classmethod
    async def get_chat_response(cls, request: ChatRequest) -> ChatResponse:
        if settings.USE_MOCK_AI or not settings.GEMINI_API_KEY:
            return MockAITutorService.answer_question(request)

        try:
            # Placeholder for external LLM call
            return MockAITutorService.answer_question(request)
        except Exception as e:
            logger.warning(f"Failed to query external AI chat service: {e}. Falling back to mock.")
            return MockAITutorService.answer_question(request)
