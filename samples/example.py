"""
Theme test: Python

Covers: decorators, f-strings, type hints, comprehensions,
generators, async/await, dataclasses, pattern matching, walrus.
"""

from __future__ import annotations

import asyncio
import re
from dataclasses import dataclass, field
from enum import Enum, auto
from pathlib import Path
from typing import AsyncGenerator, Generic, Protocol, TypeVar

# ── Constants ────────────────────────────────────────────────────────

MAX_CONNECTIONS = 100
BASE_URL = "https://api.example.com"
HEX_PATTERN = re.compile(r"^#([0-9a-fA-F]{3,8})$")

# ── Enums ────────────────────────────────────────────────────────────


class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()


# ── Protocols & Generics ─────────────────────────────────────────────

T = TypeVar("T")
E = TypeVar("E", bound=Exception)


class Serializable(Protocol):
    def to_dict(self) -> dict: ...


class Repository(Generic[T]):
    def __init__(self) -> None:
        self._items: dict[int, T] = {}

    def get(self, id: int) -> T | None:
        return self._items.get(id)

    def add(self, id: int, item: T) -> None:
        self._items[id] = item

    def __len__(self) -> int:
        return len(self._items)


# ── Dataclasses ──────────────────────────────────────────────────────


@dataclass(frozen=True)
class Point:
    x: float
    y: float
    label: str = ""

    @property
    def magnitude(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

    def __str__(self) -> str:
        return f"Point({self.x:.2f}, {self.y:.2f})"


@dataclass
class Config:
    host: str = "localhost"
    port: int = 8080
    debug: bool = False
    tags: list[str] = field(default_factory=list)


# ── Decorators ───────────────────────────────────────────────────────


def retry(max_attempts: int = 3, delay: float = 1.0):
    """Retry decorator with exponential backoff."""

    def decorator(func):
        async def wrapper(*args, **kwargs):
            last_error: Exception | None = None
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as exc:
                    last_error = exc
                    wait = delay * (2**attempt)
                    print(f"Attempt {attempt + 1} failed: {exc}, retrying in {wait}s")
                    await asyncio.sleep(wait)
            raise last_error  # type: ignore[misc]

        return wrapper

    return decorator


# ── Async generators ─────────────────────────────────────────────────


async def paginate(url: str, limit: int = 10) -> AsyncGenerator[dict, None]:
    """Fetch paginated results."""
    offset = 0
    while True:
        page_url = f"{url}?offset={offset}&limit={limit}"
        # Simulated fetch
        results: list[dict] = [{"id": i} for i in range(offset, offset + limit)]
        if not results:
            break
        for item in results:
            yield item
        offset += limit


# ── Pattern matching (3.10+) ─────────────────────────────────────────


def describe_point(point: Point) -> str:
    match point:
        case Point(x=0, y=0):
            return "origin"
        case Point(x=0, y=y):
            return f"on y-axis at {y}"
        case Point(x=x, y=0):
            return f"on x-axis at {x}"
        case Point(x=x, y=y) if x == y:
            return f"on diagonal at {x}"
        case _:
            return f"at ({point.x}, {point.y})"


# ── Comprehensions & walrus ──────────────────────────────────────────


def process_data(raw: list[str]) -> dict[str, list[int]]:
    # List comprehension with walrus operator
    valid = [int(n) for s in raw if (n := s.strip()) and n.isdigit()]

    # Dict comprehension
    grouped = {
        k: [x for x in valid if x % 3 == i] for i, k in enumerate(["zero", "one", "two"])
    }

    # Set comprehension
    unique_mods = {x % 5 for x in valid}

    # Generator expression
    total = sum(x**2 for x in valid if x > 0)

    print(f"Processed {len(valid)} values, sum of squares: {total}")
    print(f"Unique mod-5 values: {unique_mods}")

    return grouped


# ── Main ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    config = Config(host="0.0.0.0", port=9000, debug=True, tags=["dev", "test"])
    origin = Point(0, 0, "Origin")
    diagonal = Point(3.5, 3.5, "Diagonal")

    print(describe_point(origin))
    print(describe_point(diagonal))
    print(f"Magnitude: {diagonal.magnitude:.4f}")
