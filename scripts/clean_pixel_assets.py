from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


ICON_SOURCES = {
    "brain": "public/images/pixel/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp",
    "shield": "public/images/pixel/8bit-shield-icon-MfxsPeu6XRAKST8C3hCmf9.webp",
    "network": "public/images/pixel/8bit-network-icon-8aUM6KhHFxaYJMNCWLXw5c.webp",
    "architecture": "public/images/pixel/8bit-architecture-layers.webp",
    "genome": "public/images/pixel/8bit-genome-dna.webp",
    "jitna": "public/images/pixel/8bit-jitna-protocol.webp",
    "algorithms": "public/images/pixel/8bit-algorithm-gears.webp",
    "rocket": "public/images/pixel/8bit-rocket-icon-oSMB9StjMFt3Nvu8bxaJcw.webp",
    "evidence": "public/images/pixel/8bit-evidence-book.webp",
    "cpu": "public/images/pixel/pixel-v2-cpu.webp",
    "database": "public/images/pixel/pixel-v2-database.webp",
    "heart": "public/images/pixel/pixel-v2-heart.webp",
    "target": "public/images/pixel/pixel-v2-target.webp",
    "layers": "public/images/pixel/pixel-v2-layers.webp",
    "chart": "public/images/pixel/pixel-v2-chart.webp",
    "document": "public/images/pixel/pixel-v2-document.webp",
    "formula": "public/images/pixel/pixel-v2-formula.webp",
    "map": "public/images/pixel/pixel-v2-map.webp",
    "flag": "public/images/pixel/pixel-v2-flag.webp",
}

OUTPUT_DIR = Path("public/images/pixel/cleaned")
CANVAS_SIZE = 128
CONTENT_SIZE = 92
BACKGROUND_TOLERANCE = 34


def quantize(rgb: tuple[int, int, int], step: int = 8) -> tuple[int, int, int]:
    return tuple((channel // step) * step for channel in rgb)


def color_distance(left: tuple[int, int, int], right: tuple[int, int, int]) -> int:
    return max(abs(left[i] - right[i]) for i in range(3))


def collect_background_palette(image: Image.Image) -> list[tuple[int, int, int]]:
    width, height = image.size
    palette: list[tuple[int, int, int]] = []
    seen: set[tuple[int, int, int]] = set()

    def add(pixel: tuple[int, int, int, int]) -> None:
        if pixel[3] == 0:
            return
        color = quantize(pixel[:3])
        if color in seen:
            return
        seen.add(color)
        palette.append(color)

    for x in range(width):
        add(image.getpixel((x, 0)))
        add(image.getpixel((x, height - 1)))

    for y in range(height):
        add(image.getpixel((0, y)))
        add(image.getpixel((width - 1, y)))

    return palette


def remove_edge_background(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    palette = collect_background_palette(image)

    if not palette:
        return image

    queue: deque[tuple[int, int]] = deque()
    visited: set[tuple[int, int]] = set()

    def should_clear(x: int, y: int) -> bool:
        red, green, blue, alpha = pixels[x, y]
        if alpha == 0:
            return False
        color = (red, green, blue)
        return min(color_distance(color, candidate) for candidate in palette) <= BACKGROUND_TOLERANCE

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        if not should_clear(x, y):
            continue

        red, green, blue, _ = pixels[x, y]
        pixels[x, y] = (red, green, blue, 0)

        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                queue.append((nx, ny))

    return image


def normalize_icon(image: Image.Image) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        return image

    cropped = image.crop(bbox)
    width, height = cropped.size
    scale = min(CONTENT_SIZE / width, CONTENT_SIZE / height)
    scaled_size = (
        max(1, round(width * scale)),
        max(1, round(height * scale)),
    )
    resized = cropped.resize(scaled_size, Image.Resampling.NEAREST)

    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    offset = ((CANVAS_SIZE - scaled_size[0]) // 2, (CANVAS_SIZE - scaled_size[1]) // 2)
    canvas.paste(resized, offset, resized)
    return canvas


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for icon_name, source in ICON_SOURCES.items():
        source_path = Path(source)
        image = Image.open(source_path).convert("RGBA")
        cleaned = normalize_icon(remove_edge_background(image))
        output_path = OUTPUT_DIR / f"{icon_name}.png"
        cleaned.save(output_path, format="PNG", optimize=True)
        print(f"cleaned {icon_name}: {source_path} -> {output_path}")


if __name__ == "__main__":
    main()