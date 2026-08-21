from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"


def draw_mark(size: int) -> Image.Image:
    scale = size / 64
    image = Image.new("RGBA", (size, size), "#FFFFFF")
    draw = ImageDraw.Draw(image)

    def points(coords: list[tuple[float, float]]) -> list[tuple[int, int]]:
        return [(round(x * scale), round(y * scale)) for x, y in coords]

    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=max(2, round(7 * scale)), fill="#FFFFFF")
    draw.ellipse((round(9 * scale), round(15 * scale), round(37 * scale), round(36 * scale)), fill="#075A52")
    draw.ellipse((round(21 * scale), round(8 * scale), round(48 * scale), round(35 * scale)), fill="#075A52")
    draw.ellipse((round(35 * scale), round(12 * scale), round(56 * scale), round(35 * scale)), fill="#075A52")
    draw.rectangle((round(28 * scale), round(30 * scale), round(35 * scale), round(43 * scale)), fill="#8C243C")
    draw.polygon(points([(31.5, 40), (18, 52), (26, 52), (31.5, 47), (37, 52), (45, 52)]), fill="#8C243C")
    draw.rectangle((round(14 * scale), round(51 * scale), round(49 * scale), round(54 * scale)), fill="#8C243C")
    wave_width = max(1, round(2 * scale))
    draw.line(points([(8, 58), (19, 55), (30, 58), (42, 61), (55, 57)]), fill="#075A52", width=wave_width)
    return image


if __name__ == "__main__":
    BRAND.mkdir(parents=True, exist_ok=True)
    draw_mark(180).save(ROOT / "public" / "apple-touch-icon.png", optimize=True)
    draw_mark(64).save(ROOT / "public" / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
