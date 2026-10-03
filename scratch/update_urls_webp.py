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
    
    # Replace auto=format with fm=webp
    content_modified = content.replace("auto=format", "fm=webp")
    
    # Find all unsplash urls
    urls = re.findall(r'https://images\.unsplash\.com/[^\'"\s\)>]+', content_modified)
    for url in urls:
        if "fm=webp" not in url:
            new_url = url + ("&fm=webp" if "?" in url else "?fm=webp")
            content_modified = content_modified.replace(url, new_url)
            
    if content != content_modified:
        print(f"Updating {file_path}")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content_modified)
