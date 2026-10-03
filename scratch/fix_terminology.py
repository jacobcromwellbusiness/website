import glob

replacements = {
    "public/demos/denture/about.html": [
        ("when a pipe burst in my basement. They were fast, polite, and didn't overcharge for the", 
         "when my dentures broke right before a family wedding. They were fast, polite, and didn't overcharge for the"),
        ("I've had. They installed my new bathroom fixtures perfectly and cleaned up everything",
         "I've had. They crafted my new custom dentures perfectly and made sure everything fit comfortably"),
        ("Dr Denture for all my rental properties. Honest pricing and good work every single",
         "Dr Denture for all my family's dental needs. Honest pricing and great care every single"),
        ("We had a nightmare sewer", "I had severe discomfort from poorly fitting dentures.")
    ],
    "public/demos/denture/index.html": [
        ("From breaky faucets to major sewer\n                    line repairs, our expert team handles it all with precision\n                    and care.",
         "From routine adjustments to complete custom dentures, our expert team handles it all with precision and care."),
        ("From breaky faucets to major sewer\n                    line repairs, our expert team handles it all with precision \n                    and care.",
         "From routine adjustments to complete custom dentures, our expert team handles it all with precision and care."),
        ("From breaky faucets to major sewer", "From routine adjustments to complete custom dentures"),
        ("line repairs, our expert team handles it all with precision", "our expert team handles it all with precision")
    ],
    "public/demos/denture/team.html": [
        ("Sarah is our go-to expert for home renovations and bathroom upgrades. Her attention to",
         "Sarah is our go-to expert for partial dentures and cosmetic upgrades. Her attention to"),
        ("ensures your fixtures are perfect.",
         "ensures your smile is perfect.")
    ],
    "public/demos/denture/terms.html": [
        ("hidden pipe damage, structural issues, or code violations",
         "hidden jawbone loss, gum disease, or severe decay"),
        ("custom fixture orders",
         "custom denture orders"),
        ("guarantee the pipe won't adjustment again due to a collapsed line further down",
         "guarantee the dentures won't need adjustment again due to natural changes in your jawline"),
        ("corroded dentures and fixtures that break during the normal",
         "worn dentures and acrylics that break during normal use")
    ]
}

for file_path, reps in replacements.items():
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, "r", encoding="utf-16") as f:
                content = f.read()
        except Exception:
            with open(file_path, "r", encoding="latin-1") as f:
                content = f.read()
                
    modified = content
    for old, new in reps:
        modified = modified.replace(old, new)
        
    if modified != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(modified)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")
