import re

with open("public/demos/denture/about.html", "r", encoding="utf-8") as f:
    content = f.read()

# I will replace the questions and answers manually by regex or just replacing blocks.
# Let's replace the whole FAQ section directly, but keeping the HTML structure intact.

new_faqs = [
    ("How long does it take to get new dentures?", "Typically, the process takes a few weeks from the initial impression to the final fitting. We ensure every detail is perfect so your dentures fit comfortably and look natural."),
    ("Do you offer adjustments if my dentures feel loose?", "Yes! Your jawbone naturally changes over time, which can cause dentures to loosen. We offer prompt adjustment and relining services to restore a secure, comfortable fit."),
    ("Will my new dentures look like real teeth?", "Absolutely. Modern dentures are crafted from high-quality acrylics and resins designed to mimic the natural translucency of real teeth and gums. We customize the shade and shape to complement your smile."),
    ("Are you licensed and insured?", "Yes. All our denturists are fully licensed and registered professionals. Our clinic adheres to the highest standards of safety and care for your peace of mind.")
]

# We will find the faq-item blocks and replace their contents
items = re.findall(r'<div class="faq-item.*?</div>\s*</div>\s*</div>', content, re.DOTALL)

for i, item in enumerate(items):
    if i < len(new_faqs):
        q, a = new_faqs[i]
        
        # Replace the question
        new_item = re.sub(r'<span class="font-bold text-secondary dark:text-white text-left">.*?</span>', 
                          f'<span class="font-bold text-secondary dark:text-white text-left">{q}</span>', item)
        # Replace the answer
        new_item = re.sub(r'<p class="mt-4">.*?</p>', f'<p class="mt-4">{a}</p>', new_item, flags=re.DOTALL)
        
        content = content.replace(item, new_item)

with open("public/demos/denture/about.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated FAQs.")
