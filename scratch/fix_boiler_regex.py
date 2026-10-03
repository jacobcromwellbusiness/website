import glob
import re

replacements = {
    "public/demos/denture/about.html": [
        (r'servicing our old boiler before winter hit\. He explained everything clearly without any\s*\n\s*pushy upselling\.', 
         "adjusting my mother's old dentures before the holidays. He explained everything clearly without any\n                        pushy upselling.")
    ],
    "public/demos/denture/team.html": [
        (r'boiler and furnace maintenance\.', 
         "implant maintenance and deep cleanings.")
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
        modified = re.sub(old, new, modified)
        
    if modified != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(modified)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")
