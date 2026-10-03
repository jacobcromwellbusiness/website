file_path = "public/demos/denture/about.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the broken hero image with a working one
content = content.replace("1590611936760-eeb9bc500b67", "1588776814546-1ffcf47267a5")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
