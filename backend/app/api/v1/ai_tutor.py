from fastapi import APIRouter, HTTPException, status
from app.schemas.ai_tutor import HintRequest, HintResponse, ChatRequest, ChatResponse
from app.services.ai_service import AITutorService

router = APIRouter(prefix="/ai-tutor", tags=["AI Tutor"])


@router.post("/hint", response_model=HintResponse, summary="Get progressive on-demand hint")
async def get_hint(request: HintRequest):
    """
    Generate an event-driven progressive hint based on challenge state and consecutive failures.
    Consumes zero tokens in local mock mode.
    """
    try:
        response = await AITutorService.get_hint(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate hint: {str(e)}",
        )


@router.post("/chat", response_model=ChatResponse, summary="Interactive STEM AI tutor Q&A")
async def chat_with_tutor(request: ChatRequest):
    """
    On-demand Q&A with context of the current interactive canvas and math variables.
    """
    try:
        response = await AITutorService.get_chat_response(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process chat: {str(e)}",
        )
