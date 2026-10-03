import os
import re
import urllib.request
import glob

html_files = glob.glob("public/demos/denture/*.html")

url_mapping = {}
counter = 1

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(file_path, "r", encoding="utf-16") as f:
            content = f.read()
    
    # Find all unsplash urls
    urls = re.findall(r'https://images\.unsplash\.com/[^\'"\s\)]+', content)
    
    content_modified = content
    for url in urls:
        if url not in url_mapping:
            download_url = url.replace("auto=format", "fm=webp")
            if "fm=webp" not in download_url:
                download_url += "&fm=webp" if "?" in download_url else "?fm=webp"
            
            # Ensure the query string doesn't have multiple ? marks
            if download_url.count("?") > 1:
                parts = download_url.split("?")
                download_url = parts[0] + "?" + "&".join(parts[1:])
                
            image_filename = f"public/images/unsplash_denture_{counter}.webp"
            url_mapping[url] = image_filename
            print(f"Downloading {download_url} to {image_filename}")
            
            try:
                req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as response, open(image_filename, 'wb') as out_file:
                    data = response.read()
                    out_file.write(data)
                counter += 1
            except Exception as e:
                print(f"Failed to download {download_url}: {e}")
            
        content_modified = content_modified.replace(url, url_mapping[url])
    
    if content != content_modified:
        print(f"Updating {file_path}")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content_modified)
