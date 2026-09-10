"""Pydantic schemas for AI Tutor."""
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the sender ('user', 'assistant', 'system')")
    content: str = Field(..., description="Text content of the message")


class HintRequest(BaseModel):
    topic_slug: str = Field(..., description="Identifier of the topic lesson")
    challenge_id: str = Field(..., description="Identifier of the specific challenge")
    current_variables: Dict[str, float] = Field(default_factory=dict, description="Active canvas variables")
    failed_attempts: int = Field(default=0, ge=0, description="Consecutive failed attempts")
    previous_hints_count: int = Field(default=0, ge=0, description="Number of hints already received")
    user_query: Optional[str] = Field(default=None, description="Optional specific doubt or question")


class HintResponse(BaseModel):
    hint_level: int = Field(..., description="1 = gentle nudge, 2 = conceptual hint, 3 = breakdown")
    hint_text: str = Field(..., description="The textual guidance")
    audio_summary: str = Field(..., description="Short spoken summary for Web Speech API")
    suggested_action: Optional[str] = Field(default=None, description="Action suggestion for slider/parameter")
    is_mock: bool = Field(default=True, description="Indicates if response was served from mock engine")


class ChatRequest(BaseModel):
    topic_slug: str = Field(..., description="Identifier of the topic lesson")
    current_variables: Dict[str, float] = Field(default_factory=dict, description="Active canvas state")
    history: List[ChatMessage] = Field(default_factory=list, description="Recent conversation history")
    message: str = Field(..., description="The user's question or statement")


class ChatResponse(BaseModel):
    reply: str = Field(..., description="AI Tutor explanation with KaTeX support")
    audio_summary: str = Field(..., description="Concise audio narration text")
    suggested_followups: List[str] = Field(default_factory=list, description="Follow-up prompt suggestions")
    is_mock: bool = Field(default=True, description="Indicates if response was served from mock engine")
