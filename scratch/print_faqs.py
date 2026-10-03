import re

with open("public/demos/denture/about.html", "r", encoding="utf-8") as f:
    content = f.read()

questions = re.findall(r'<span class="font-bold text-secondary dark:text-white text-left">(.*?)</span>', content)
for q in questions:
    print(q)
