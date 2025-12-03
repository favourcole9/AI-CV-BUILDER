export function aiGenerate(prompt) {
  return "Generated: " + prompt + " (improved, ATS-friendly)"
}

export function aiRewrite(text) {
  return "Rewritten: " + text + " (more professional tone)"
}

export function aiImprove(text) {
  return text + " — enhanced with stronger action verbs."
}

export function aiShorten(text) {
  return text.slice(0, 120) + "..."
}
