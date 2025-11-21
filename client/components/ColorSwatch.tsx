interface ColorSwatchProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  Ivory: "#FFFFF0",
  Blush: "#FFB6C1",
  Navy: "#000080",
  White: "#FFFFFF",
  Blue: "#4A90E2",
  Pink: "#FFC0CB",
  Beige: "#F5F5DC",
  Black: "#000000",
  Olive: "#808000",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  "Rose Gold": "#B76E79",
  "Floral Multi": "linear-gradient(135deg, #FFB6C1 0%, #4A90E2 50%, #FFD700 100%)",
  "Navy Floral": "linear-gradient(135deg, #000080 0%, #FFB6C1 50%, #FFFFFF 100%)",
  "Pink Floral": "linear-gradient(135deg, #FFC0CB 0%, #FFB6C1 50%, #FF69B4 100%)",
};

export function ColorSwatch({ color, selected, onClick }: ColorSwatchProps) {
  const bgStyle = colorMap[color]?.includes("gradient")
    ? { background: colorMap[color] }
    : { backgroundColor: colorMap[color] || "#E5E7EB" };

  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
        selected ? "border-brand-pink ring-2 ring-brand-pink/30" : "border-gray-300"
      }`}
      style={bgStyle}
      aria-label={`Select ${color}`}
      title={color}
    >
      {selected && (
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full shadow-md" />
        </div>
      )}
    </button>
  );
}
