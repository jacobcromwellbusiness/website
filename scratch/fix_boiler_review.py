import glob

html_files = glob.glob("public/demos/denture/*.html")

old_text = "David did a fantastic job servicing our old boiler before winter hit. He explained everything clearly without any pushy upselling."
new_text = "David did a fantastic job adjusting my mother's old dentures before the holidays. He explained everything clearly without any pushy upselling."

for file_path in html_files:
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
    
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
