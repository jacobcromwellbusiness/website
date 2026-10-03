import os
import re

directory = r"c:\Users\JacobCromwell\OneDrive - Atlantic Digital Safety\Documents\Client Files\Jacob Cromwell\Updated Site - Copy\public\demos\denture"

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            enc = 'utf-8'
        except UnicodeDecodeError:
            with open(filepath, 'r', encoding='windows-1252') as f:
                content = f.read()
            enc = 'windows-1252'

        # Update Tailwind Config colors
        content = content.replace('primary: "#F472B6"', 'primary: "#FDE047"') # Light Yellow
        content = content.replace('secondary: "#FEF08A"', 'secondary: "#BAE6FD"') # Light Blue
        
        # Update Gradient Text styles
        content = content.replace('#F472B6', '#FDE047')
        content = content.replace('#F9A8D4', '#FEF08A')
        
        # Update Box Shadow Glow rgb
        content = content.replace('rgba(244, 114, 182, 0.3)', 'rgba(253, 224, 71, 0.3)')
        
        # Update hovers
        content = content.replace('hover:bg-pink-600', 'hover:bg-yellow-500')

        with open(filepath, 'w', encoding=enc) as f:
            f.write(content)

print("Colors successfully replaced in denture demos.")
