// Style + Modifier presets for 3 Click Infographics.
// Reverse-engineered prompt fragments are concatenated at request time as:
//   `${topic}. ${stylePrompt}, ${modifierPrompt}.`
// Aspect ratio maps to OpenAI image `size`, not the text prompt.

export type StylePreset = { id: string; family: string; variant: "A" | "B" | "C"; title: string; prompt: string; palette: string[]; thumb: string };

const THUMB_BASE = "https://dwlxvjllunpogmsxwlrl.supabase.co/storage/v1/object/public/generated-images/thumbnails/da9296f0-d61e-4724-97ab-84e4da66d29b/";
export type ModifierPreset = { id: string; title: string; prompt: string; palette: string[]; thumb: string };
export type AspectPreset = { id: string; label: string; size: "1024x1024" | "1024x1536" | "1536x1024" };

export const STYLES: StylePreset[] = [
  { id: "stat-a", family: "Statistical / Data-Driven", variant: "A", title: "Statistical / Data-Driven: Style A", prompt: "Clean data visualization infographic, flat design, bold sans-serif typography, muted color palette with one accent color, white background, minimal chart decorations, modern corporate aesthetic", palette: ["#F5F5F7", "#E0E0E5", "#3B82F6"], thumb: THUMB_BASE + "2_style_0_1777068294556.png" },
  { id: "stat-b", family: "Statistical / Data-Driven", variant: "B", title: "Statistical / Data-Driven: Style B", prompt: "Dark-mode statistical infographic, neon accent highlights on charcoal background, geometric data visualizations, tech-forward aesthetic, glowing bar charts and donut graphs", palette: ["#1A1A24", "#2D2D3F", "#00FFB7"], thumb: THUMB_BASE + "2_style_1_1777068295326.png" },
  { id: "stat-c", family: "Statistical / Data-Driven", variant: "C", title: "Statistical / Data-Driven: Style C", prompt: "Hand-drawn sketch style data infographic, pencil texture charts, kraft paper background, organic imperfect lines, warm earth tones, approachable and friendly", palette: ["#D4B895", "#A68A6B", "#5C4033"], thumb: THUMB_BASE + "2_style_2_1777068298539.png" },

  { id: "time-a", family: "Timeline / Historical", variant: "A", title: "Timeline / Historical: Style A", prompt: "Horizontal timeline infographic, art deco geometric style, gold and navy color scheme, ornamental dividers, elegant serif typography, vintage luxury feel", palette: ["#0A1F3D", "#1B3A6B", "#D4AF37"], thumb: THUMB_BASE + "2_style_3_1777068297057.png" },
  { id: "time-b", family: "Timeline / Historical", variant: "B", title: "Timeline / Historical: Style B", prompt: "Vertical scrolling timeline, isometric 3D milestone markers, soft gradient backgrounds, pastel color palette, floating shadow elements, modern SaaS aesthetic", palette: ["#FFE4E1", "#E0F4FF", "#F0E6FF"], thumb: THUMB_BASE + "2_style_4_1777068294447.png" },
  { id: "time-c", family: "Timeline / Historical", variant: "C", title: "Timeline / Historical: Style C", prompt: "Retro timeline infographic, 1970s poster style, groovy rounded typography, muted orange/brown/teal palette, halftone dot textures, vintage print aesthetic", palette: ["#D97706", "#92400E", "#0F766E"], thumb: THUMB_BASE + "2_style_5_1777068296473.png" },

  { id: "proc-a", family: "Process / How-To", variant: "A", title: "Process / How-To: Style A", prompt: "Step-by-step process infographic, flat vector illustration style, numbered circular icons, connecting dotted lines, bright primary colors on white, clear and instructional", palette: ["#FFFFFF", "#3B82F6", "#EF4444"], thumb: THUMB_BASE + "2_style_6_1777068294849.png" },
  { id: "proc-b", family: "Process / How-To", variant: "B", title: "Process / How-To: Style B", prompt: "Blueprint-style process infographic, technical drawing aesthetic, white lines on deep blue background, engineering grid overlay, monospaced typography, architectural feel", palette: ["#0F2746", "#1E40AF", "#FFFFFF"], thumb: THUMB_BASE + "2_style_7_1777068296047.png" },
  { id: "proc-c", family: "Process / How-To", variant: "C", title: "Process / How-To: Style C", prompt: "Kawaii process infographic, cute character mascots guiding each step, rounded bubbly shapes, candy pastel colors, playful hand-lettered headers, Japanese illustration style", palette: ["#FFB6E1", "#B6F0FF", "#FFE9A6"], thumb: THUMB_BASE + "2_style_8_1777068297315.png" },

  { id: "comp-a", family: "Comparison", variant: "A", title: "Comparison: Style A", prompt: "Split-screen comparison infographic, bold diagonal divider, contrasting warm vs cool color schemes, large versus icon in center, modern editorial typography, high contrast", palette: ["#EF4444", "#FBBF24", "#3B82F6"], thumb: THUMB_BASE + "2_style_9_1777068296118.png" },
  { id: "comp-b", family: "Comparison", variant: "B", title: "Comparison: Style B", prompt: "Minimal comparison infographic, two-column grid layout, thin line separators, monochromatic palette with red and green accent indicators, Swiss design inspired, clean whitespace", palette: ["#F5F5F5", "#10B981", "#EF4444"], thumb: THUMB_BASE + "2_style_10_1777068297623.png" },
  { id: "comp-c", family: "Comparison", variant: "C", title: "Comparison: Style C", prompt: "Comic book style comparison infographic, halftone textures, POW/BAM style callouts, bold black outlines, primary color palette, action-packed layout with speech bubbles", palette: ["#FBBF24", "#EF4444", "#3B82F6"], thumb: THUMB_BASE + "2_style_11_1777068297353.png" },

  { id: "list-a", family: "List / Numbered", variant: "A", title: "List / Numbered: Style A", prompt: "Numbered list infographic, oversized watercolor numerals, botanical illustration accents, cream linen paper texture, elegant serif body text, editorial magazine style", palette: ["#F5F0E1", "#A3B18A", "#588157"], thumb: THUMB_BASE + "2_style_12_1777068296452.png" },
  { id: "list-b", family: "List / Numbered", variant: "B", title: "List / Numbered: Style B", prompt: "Flat icon list infographic, Material Design inspired, colorful circular icon badges, clean grid alignment, Google-style primary colors, generous padding, modern and readable", palette: ["#4285F4", "#34A853", "#FBBC04"], thumb: THUMB_BASE + "2_style_13_1777068294253.png" },
  { id: "list-c", family: "List / Numbered", variant: "C", title: "List / Numbered: Style C", prompt: "Chalkboard list infographic, white and colored chalk lettering, dusty black slate texture, hand-drawn doodle icons, classroom aesthetic, casual and educational", palette: ["#1F2937", "#F9FAFB", "#FBBF24"], thumb: THUMB_BASE + "2_style_14_1777068298722.png" },

  { id: "geo-a", family: "Geographic / Map-Based", variant: "A", title: "Geographic / Map-Based: Style A", prompt: "Illustrated map infographic, watercolor terrain, tiny landmark illustrations at key locations, vintage cartography style, aged parchment tones, compass rose decoration, explorer aesthetic", palette: ["#F4E4BC", "#A87B4B", "#5C4033"], thumb: THUMB_BASE + "2_style_15_1777068295877.png" },
  { id: "geo-b", family: "Geographic / Map-Based", variant: "B", title: "Geographic / Map-Based: Style B", prompt: "Minimal flat map infographic, solid-color country fills, proportional circle data markers, muted Scandinavian palette, thin borders, clean sans-serif labels", palette: ["#E8F0F2", "#88B0BC", "#3D6373"], thumb: THUMB_BASE + "2_style_16_1777068294100.png" },
  { id: "geo-c", family: "Geographic / Map-Based", variant: "C", title: "Geographic / Map-Based: Style C", prompt: "Neon data map infographic, dark satellite-view base map, glowing heat-map overlays, cyberpunk color palette (magenta, cyan, electric blue), futuristic HUD typography", palette: ["#0F0F23", "#FF006E", "#00F5FF"], thumb: THUMB_BASE + "2_style_17_1777068296001.png" },

  { id: "hier-a", family: "Hierarchical / Organizational", variant: "A", title: "Hierarchical / Organizational: Style A", prompt: "Corporate org chart infographic, frosted glass card elements, subtle gradient backgrounds, thin connecting lines, professional blue-gray palette, modern enterprise aesthetic", palette: ["#E5E9F0", "#94A3B8", "#475569"], thumb: THUMB_BASE + "2_style_18_1777068295485.png" },
  { id: "hier-b", family: "Hierarchical / Organizational", variant: "B", title: "Hierarchical / Organizational: Style B", prompt: "Pyramid hierarchy infographic, ancient Egyptian art style, gold and lapis lazuli color scheme, hieroglyphic-inspired decorative elements, stone texture, mythic authority feel", palette: ["#1E3A8A", "#FCD34D", "#92400E"], thumb: THUMB_BASE + "2_style_19_1777068295302.png" },
  { id: "hier-c", family: "Hierarchical / Organizational", variant: "C", title: "Hierarchical / Organizational: Style C", prompt: "Mind-map hierarchy infographic, organic tree/branch structure, nature-inspired greens and browns, leaf-shaped nodes, hand-illustrated botanical linework, growth metaphor", palette: ["#365314", "#65A30D", "#92400E"], thumb: THUMB_BASE + "2_style_20_1777068295528.png" },

  { id: "flow-a", family: "Flowchart / Decision Tree", variant: "A", title: "Flowchart / Decision Tree: Style A", prompt: "Flowchart infographic, rounded rectangle nodes, color-coded yes/no paths (green/red), clean connecting arrows, light gray grid background, UX wireframe aesthetic", palette: ["#E5E7EB", "#10B981", "#EF4444"], thumb: THUMB_BASE + "2_style_21_1777068293858.png" },
  { id: "flow-b", family: "Flowchart / Decision Tree", variant: "B", title: "Flowchart / Decision Tree: Style B", prompt: "Retro video game flowchart, pixel art style, 8-bit typography, chiptune-era color palette, pixelated arrow connectors, game menu UI aesthetic, nostalgic and fun", palette: ["#000000", "#FCD34D", "#3B82F6"], thumb: THUMB_BASE + "2_style_22_1777068295813.png" },
  { id: "flow-c", family: "Flowchart / Decision Tree", variant: "C", title: "Flowchart / Decision Tree: Style C", prompt: "Elegant flowchart infographic, thin gold lines on deep emerald background, diamond decision nodes, art nouveau decorative curves, luxury brand aesthetic", palette: ["#064E3B", "#FCD34D", "#0A2E1F"], thumb: THUMB_BASE + "2_style_23_1777068295509.png" },

  { id: "anat-a", family: "Anatomical / Exploded View", variant: "A", title: "Anatomical / Exploded View: Style A", prompt: "Technical exploded-view diagram, isometric 3D rendering, labeled callout lines with dots, neutral gray background, precise engineering illustration style, patent drawing aesthetic", palette: ["#F3F4F6", "#9CA3AF", "#1F2937"], thumb: THUMB_BASE + "2_style_24_1777068293945.png" },
  { id: "anat-b", family: "Anatomical / Exploded View", variant: "B", title: "Anatomical / Exploded View: Style B", prompt: "Vintage anatomical illustration infographic, engraving crosshatch style, sepia and muted red tones, aged paper texture, Victorian-era scientific diagram, hand-labeled cursive annotations", palette: ["#F4E4BC", "#A0522D", "#8B0000"], thumb: THUMB_BASE + "2_style_25_1777068296602.png" },
  { id: "anat-c", family: "Anatomical / Exploded View", variant: "C", title: "Anatomical / Exploded View: Style C", prompt: "Colorful flat exploded-view infographic, separated floating component layers, long shadow design, vibrant material color palette, clean callout labels, modern product marketing style", palette: ["#FF6B35", "#F7C548", "#3D5A80"], thumb: THUMB_BASE + "2_style_26_1777068295459.png" },

  { id: "resume-a", family: "Resume / Bio", variant: "A", title: "Resume / Bio: Style A", prompt: "Modern resume infographic, asymmetric two-column layout, skill progress bars, timeline career path, monochrome with single accent color, bold geometric header, personal brand aesthetic", palette: ["#FFFFFF", "#1F2937", "#3B82F6"], thumb: THUMB_BASE + "2_style_27_1777068295991.png" },
  { id: "resume-b", family: "Resume / Bio", variant: "B", title: "Resume / Bio: Style B", prompt: "Creative portfolio infographic, collage-style mixed media layout, torn paper edges, overlapping photo frames, handwritten annotations, eclectic art director aesthetic", palette: ["#F4A261", "#E76F51", "#264653"], thumb: THUMB_BASE + "2_style_28_1777068296425.png" },
  { id: "resume-c", family: "Resume / Bio", variant: "C", title: "Resume / Bio: Style C", prompt: "Minimal Swiss-design resume infographic, strict grid system, Helvetica typography, black/white/red only, generous whitespace, Bauhaus-inspired geometric accents", palette: ["#FFFFFF", "#1F2937", "#DC2626"], thumb: THUMB_BASE + "2_style_29_1777068294061.png" },

  { id: "anim-a", family: "Interactive / Animated", variant: "A", title: "Interactive / Animated: Style A", prompt: "Animated infographic storyboard, flat motion graphics style, smooth bezier transitions, bold geometric shapes, vibrant Kurzgesagt-inspired palette, frame-by-frame keyframe markers", palette: ["#FFD700", "#FF006E", "#3A86FF"], thumb: THUMB_BASE + "2_style_30_1777068294566.png" },
  { id: "anim-b", family: "Interactive / Animated", variant: "B", title: "Interactive / Animated: Style B", prompt: "Scroll-triggered infographic wireframe, sticky header sections, parallax layered depth, frosted glass UI cards, dark mode gradient background, modern web experience aesthetic", palette: ["#1E1B4B", "#312E81", "#7C3AED"], thumb: THUMB_BASE + "2_style_31_1777068296361.png" },
  { id: "anim-c", family: "Interactive / Animated", variant: "C", title: "Interactive / Animated: Style C", prompt: "Social media carousel infographic, square 1:1 slide format, swipe-indicator arrows, bold headline-first layout, Instagram-native aesthetic, consistent branded color bar at top", palette: ["#E1306C", "#F77737", "#FCAF45"], thumb: THUMB_BASE + "2_style_32_1777068297045.png" },

  { id: "photo-a", family: "Photographic / Image-Heavy", variant: "A", title: "Photographic / Image-Heavy: Style A", prompt: "Photo-based editorial infographic, full-bleed background imagery, white text overlays with drop shadows, magazine-spread layout, cinematic color grading, National Geographic aesthetic", palette: ["#1A1A1A", "#8B7355", "#D4B895"], thumb: THUMB_BASE + "2_style_33_1777068295048.png" },
  { id: "photo-b", family: "Photographic / Image-Heavy", variant: "B", title: "Photographic / Image-Heavy: Style B", prompt: "Duotone photo infographic, two-color photo filter treatment, bold statistics overlaid, high-contrast graphic text, modern poster design, Spotify Wrapped aesthetic", palette: ["#1E40AF", "#EC4899", "#FFFFFF"], thumb: THUMB_BASE + "2_style_34_1777068297458.png" },
  { id: "photo-c", family: "Photographic / Image-Heavy", variant: "C", title: "Photographic / Image-Heavy: Style C", prompt: "Photo collage infographic, polaroid-frame image clusters, handwritten caption labels, washi tape decorations, scrapbook aesthetic, warm nostalgic filter", palette: ["#FFFFFF", "#FBBF24", "#92400E"], thumb: THUMB_BASE + "2_style_35_1777068296031.png" },

  { id: "icon-a", family: "Icon-Driven / Pictogram", variant: "A", title: "Icon-Driven / Pictogram: Style A", prompt: "Pictogram infographic, ISOTYPE-inspired icon grid, two-color limited palette, uniform stroke-weight icons, Otto Neurath style, data-as-people figures, modernist simplicity", palette: ["#1F2937", "#DC2626", "#FFFFFF"], thumb: THUMB_BASE + "2_style_36_1777068298158.png" },
  { id: "icon-b", family: "Icon-Driven / Pictogram", variant: "B", title: "Icon-Driven / Pictogram: Style B", prompt: "Line icon infographic, thin consistent stroke icons, circular badge containers, pastel fill accents, generous spacing, Noun Project aesthetic, startup-friendly", palette: ["#A7C7E7", "#F8C8DC", "#FFE4B5"], thumb: THUMB_BASE + "2_style_37_1777068296487.png" },
  { id: "icon-c", family: "Icon-Driven / Pictogram", variant: "C", title: "Icon-Driven / Pictogram: Style C", prompt: "Thick outline icon infographic, bold rounded icons, vibrant fill colors, chunky playful style, large scale pictograms, children's educational aesthetic, accessible and clear", palette: ["#FF006E", "#FFBE0B", "#3A86FF"], thumb: THUMB_BASE + "2_style_38_1777068297846.png" },

  { id: "word-a", family: "Word Cloud / Typographic", variant: "A", title: "Word Cloud / Typographic: Style A", prompt: "Typographic word cloud infographic, mixed font families and weights, fitted word packing, monochrome gradient from light to dark, editorial poster aesthetic, words as texture", palette: ["#000000", "#525252", "#A3A3A3"], thumb: THUMB_BASE + "2_style_39_1777068298057.png" },
  { id: "word-b", family: "Word Cloud / Typographic", variant: "B", title: "Word Cloud / Typographic: Style B", prompt: "Kinetic typography infographic layout, words at dynamic angles, motion blur effects, bold condensed type, high-energy sports broadcast aesthetic, black background with neon type", palette: ["#0A0A0A", "#00FFB7", "#FF006E"], thumb: THUMB_BASE + "2_style_40_1777068298596.png" },
  { id: "word-c", family: "Word Cloud / Typographic", variant: "C", title: "Word Cloud / Typographic: Style C", prompt: "Letterpress typographic infographic, debossed text effect, heavy wood-type display fonts, ink texture overlays, vintage print shop palette (red, black, cream), Americana aesthetic", palette: ["#F5F0E1", "#1F2937", "#B91C1C"], thumb: THUMB_BASE + "2_style_41_1777068295712.png" },

  { id: "vs-a", family: "Versus / Battle", variant: "A", title: "Versus / Battle: Style A", prompt: "Epic versus infographic, lightning bolt center divider, dramatic radial burst background, metallic gradient text, fighting game character select screen aesthetic, high energy", palette: ["#FFD700", "#C0C0C0", "#1F2937"], thumb: THUMB_BASE + "2_style_42_1777068298637.png" },
  { id: "vs-b", family: "Versus / Battle", variant: "B", title: "Versus / Battle: Style B", prompt: "Clean versus infographic, vertical center split, cool blue vs warm orange halves, mirrored stat layouts, sports broadcast overlay style, data-driven matchup aesthetic", palette: ["#3B82F6", "#F97316", "#1F2937"], thumb: THUMB_BASE + "2_style_43_1777068297193.png" },
  { id: "vs-c", family: "Versus / Battle", variant: "C", title: "Versus / Battle: Style C", prompt: "Illustrated battle infographic, comic book action scene style, dynamic character poses, speed lines, bold VERSUS text, manga-inspired composition, dramatic angles", palette: ["#FBBF24", "#EF4444", "#3B82F6"], thumb: THUMB_BASE + "2_style_44_1777068298356.png" },
];

export const MODIFIERS: ModifierPreset[] = [
  { id: "dark",       title: "Dark Mode",        prompt: "dark background, light text, glowing accents, high contrast elements",                          palette: ["#0F172A", "#1E293B", "#A78BFA"], thumb: THUMB_BASE + "3_modifier_0_1777068294457.png" },
  { id: "vintage",    title: "Vintage",          prompt: "aged paper texture, slightly yellowed, faded ink, retro print imperfections, nostalgic",        palette: ["#F5F0E1", "#D4B896", "#8B6F47"], thumb: THUMB_BASE + "3_modifier_1_1777068298715.png" },
  { id: "corporate",  title: "Corporate",        prompt: "professional, clean, brand-safe, conservative color palette, structured grid layout",           palette: ["#F1F5F9", "#94A3B8", "#1E40AF"], thumb: THUMB_BASE + "3_modifier_2_1777068295964.png" },
  { id: "playful",    title: "Playful",          prompt: "rounded shapes, bouncy layout, bright saturated colors, hand-drawn accents, fun and approachable", palette: ["#FBBF24", "#EC4899", "#3B82F6"], thumb: THUMB_BASE + "3_modifier_3_1777068294698.png" },
  { id: "luxe",       title: "Luxe",             prompt: "gold foil accents, deep jewel tones, elegant serif typography, generous whitespace, premium feel", palette: ["#1F2937", "#7C2D12", "#FCD34D"], thumb: THUMB_BASE + "3_modifier_4_1777068297067.png" },
  { id: "eco",        title: "Eco / Organic",    prompt: "natural earth tones, recycled paper texture, botanical illustrations, hand-stamped elements",   palette: ["#A3B18A", "#588157", "#A87B4B"], thumb: THUMB_BASE + "3_modifier_5_1777068297818.png" },
  { id: "tech",       title: "Tech / Futuristic",prompt: "circuit board patterns, holographic gradients, monospaced type, glitch effects, digital HUD elements", palette: ["#0F0F23", "#06B6D4", "#EC4899"], thumb: THUMB_BASE + "3_modifier_6_1777068298455.png" },
  { id: "accessible", title: "Accessible",       prompt: "high contrast ratios, large readable type, clear icon labels, WCAG-friendly color combinations", palette: ["#FFFFFF", "#1F2937", "#FCD34D"], thumb: THUMB_BASE + "3_modifier_7_1777068297880.png" },
];

// gpt-image-1 supports 1024x1024 (square), 1024x1536 (portrait), 1536x1024 (landscape).
// We map each user-friendly aspect to one of those three sizes.
export const ASPECTS: AspectPreset[] = [
  { id: "1:1",  label: "1:1 (Square)",        size: "1024x1024" },
  { id: "2:3",  label: "2:3 (Portrait)",      size: "1024x1536" },
  { id: "3:2",  label: "3:2 (Landscape)",     size: "1536x1024" },
  { id: "4:5",  label: "4:5 (Tall — IG)",     size: "1024x1536" },
  { id: "5:4",  label: "5:4 (Wide — print)",  size: "1536x1024" },
  { id: "9:16", label: "9:16 (Vertical)",     size: "1024x1536" },
  { id: "16:9", label: "16:9 (Widescreen)",   size: "1536x1024" },
];

// Group styles by family for the picker UI.
export function stylesByFamily(): Record<string, StylePreset[]> {
  const out: Record<string, StylePreset[]> = {};
  for (const s of STYLES) (out[s.family] ||= []).push(s);
  return out;
}

// Assemble the prompt string sent to OpenAI Images.
export function buildPrompt(args: { topic: string; research?: string; styleId: string; modifierId?: string }): string {
  const style = STYLES.find(s => s.id === args.styleId);
  const mod = args.modifierId ? MODIFIERS.find(m => m.id === args.modifierId) : null;
  if (!style) throw new Error(`Unknown style: ${args.styleId}`);

  const parts: string[] = [];
  parts.push(args.topic.trim());
  if (args.research?.trim()) parts.push(`Data: ${args.research.trim()}`);
  parts.push(style.prompt + (mod ? `, ${mod.prompt}` : ""));
  return parts.join(". ") + ".";
}
