from PIL import Image
import os
import glob

# Paths
brain_dir = r"C:\Users\JacobCromwell\.gemini\antigravity-ide\brain\d16a8f25-046b-49da-8fa4-07e937d57c9c"
target_dir = r"c:\Users\JacobCromwell\OneDrive - Atlantic Digital Safety\Documents\Client Files\mechanic\public\images"

# Get generated images
logo_files = glob.glob(os.path.join(brain_dir, "law_office_logo_*.jpg"))
hero_files = glob.glob(os.path.join(brain_dir, "law_hero_*.jpg"))

if logo_files:
    logo_path = logo_files[0]
    img = Image.open(logo_path)
    img.save(os.path.join(target_dir, "law_office_logo.webp"), "WEBP")
    print("Saved law_office_logo.webp")

if hero_files:
    hero_path = hero_files[0]
    img = Image.open(hero_path)
    img.save(os.path.join(target_dir, "law_hero.webp"), "WEBP")
    print("Saved law_hero.webp")
