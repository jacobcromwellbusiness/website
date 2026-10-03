import glob
import re

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
    
    for i, line in enumerate(content.split('\n')):
        if any(word in line.lower() for word in ['pipe', 'burst', 'bathroom', 'rental', 'sewer', 'fixture']):
            print(f"{file_path}:{i+1}: {line.strip()}")
