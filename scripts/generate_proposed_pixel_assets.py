from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


CANVAS_SIZE = 128
GRID_SIZE = 16
PIXEL_SIZE = CANVAS_SIZE // GRID_SIZE
OUTPUT_DIR = Path("public/images/pixel/proposed")

PALETTE = {
    "outline": "#2B2118",
    "shadow": "#5E4531",
    "paper": "#F5E6BE",
    "paper_dark": "#D7B97D",
    "amber": "#D4A853",
    "amber_light": "#E9C97F",
    "sage": "#7B9E87",
    "sage_light": "#A7C1A8",
    "terra": "#C4745B",
    "terra_light": "#E0A48C",
    "blue": "#89B4C8",
    "blue_light": "#B2D1DD",
    "white": "#FFF8EC",
}


def new_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    return image, ImageDraw.Draw(image)


def fill(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, color: str) -> None:
    draw.rectangle(
        (
            x * PIXEL_SIZE,
            y * PIXEL_SIZE,
            (x + w) * PIXEL_SIZE - 1,
            (y + h) * PIXEL_SIZE - 1,
        ),
        fill=color,
    )


def gear_matrix() -> Image.Image:
    image, draw = new_canvas()

    fill(draw, 4, 4, 8, 8, PALETTE["outline"])
    fill(draw, 5, 5, 6, 6, PALETTE["amber"])
    fill(draw, 6, 6, 4, 4, PALETTE["amber_light"])
    fill(draw, 7, 7, 2, 2, PALETTE["white"])

    for x, y in ((7, 2), (7, 12), (2, 7), (12, 7), (4, 4), (10, 4), (4, 10), (10, 10)):
        fill(draw, x, y, 2, 2, PALETTE["outline"])
    for x, y in ((8, 1), (8, 13), (1, 8), (13, 8)):
        fill(draw, x, y, 1, 1, PALETTE["amber"])

    fill(draw, 1, 3, 2, 2, PALETTE["blue"])
    fill(draw, 13, 3, 2, 2, PALETTE["sage"])
    fill(draw, 1, 11, 2, 2, PALETTE["terra"])
    fill(draw, 13, 11, 2, 2, PALETTE["blue"])
    fill(draw, 2, 4, 1, 7, PALETTE["blue_light"])
    fill(draw, 13, 4, 1, 7, PALETTE["sage_light"])
    fill(draw, 4, 13, 7, 1, PALETTE["terra_light"])
    fill(draw, 4, 2, 7, 1, PALETTE["amber_light"])
    return image


def scroll_constitution() -> Image.Image:
    image, draw = new_canvas()

    fill(draw, 4, 2, 8, 12, PALETTE["outline"])
    fill(draw, 5, 3, 6, 10, PALETTE["paper"])
    fill(draw, 4, 2, 2, 2, PALETTE["amber"])
    fill(draw, 10, 2, 2, 2, PALETTE["amber"])
    fill(draw, 4, 12, 2, 2, PALETTE["amber_dark"] if "amber_dark" in PALETTE else PALETTE["shadow"])
    fill(draw, 10, 12, 2, 2, PALETTE["shadow"])
    fill(draw, 3, 3, 2, 10, PALETTE["paper_dark"])
    fill(draw, 11, 3, 2, 10, PALETTE["paper_dark"])

    for row in (5, 7, 9):
        fill(draw, 6, row, 4, 1, PALETTE["terra"])
    fill(draw, 6, 11, 2, 1, PALETTE["sage"])
    fill(draw, 8, 11, 2, 1, PALETTE["blue"])
    fill(draw, 7, 4, 2, 1, PALETTE["amber_light"])
    return image


def vector_node() -> Image.Image:
    image, draw = new_canvas()

    fill(draw, 2, 3, 3, 3, PALETTE["blue"])
    fill(draw, 11, 2, 3, 3, PALETTE["amber"])
    fill(draw, 10, 11, 3, 3, PALETTE["terra"])
    fill(draw, 4, 10, 3, 3, PALETTE["sage"])
    fill(draw, 7, 6, 3, 3, PALETTE["outline"])
    fill(draw, 8, 7, 1, 1, PALETTE["white"])

    fill(draw, 4, 4, 4, 1, PALETTE["blue_light"])
    fill(draw, 8, 4, 1, 3, PALETTE["blue_light"])
    fill(draw, 9, 4, 3, 1, PALETTE["amber_light"])
    fill(draw, 10, 5, 1, 6, PALETTE["amber_light"])
    fill(draw, 9, 11, 2, 1, PALETTE["terra_light"])
    fill(draw, 6, 11, 3, 1, PALETTE["sage_light"])
    fill(draw, 6, 9, 1, 2, PALETTE["sage_light"])
    fill(draw, 5, 6, 3, 1, PALETTE["sage_light"])
    return image


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    assets = {
        "gear-matrix.png": gear_matrix(),
        "scroll-constitution.png": scroll_constitution(),
        "vector-node.png": vector_node(),
    }

    for name, image in assets.items():
        output_path = OUTPUT_DIR / name
        image.save(output_path, format="PNG", optimize=True)
        print(f"generated {output_path}")


if __name__ == "__main__":
    main()
