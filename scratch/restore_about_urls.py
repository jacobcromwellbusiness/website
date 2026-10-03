import glob
import re

file_path = "public/demos/denture/about.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Restore original unsplash links but with fm=webp
content = content.replace("public/images/unsplash_denture_1.webp", "https://images.unsplash.com/photo-1590611936760-eeb9bc500b67?q=80&w=2070&fm=webp&fit=crop", 1) # first image
content = content.replace("public/images/unsplash_denture_1.webp", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&fm=webp&fit=crop", 1) # second image
content = content.replace("public/images/unsplash_denture_2.webp", "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&fm=webp&fit=crop") # third image

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
