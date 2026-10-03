import glob

html_files = glob.glob("public/demos/denture/*.html")

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
    
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "boiler" in line.lower():
            print(f"{file_path}:{i+1}: {line.strip()}")
            if i+1 < len(lines):
                print(f"{file_path}:{i+2}: {lines[i+1].strip()}")
