import sys
import re

file_path = "public/demos/denture/about.html"
try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except UnicodeDecodeError:
    with open(file_path, "r", encoding="utf-16") as f:
        content = f.read()

# Replace images
content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuBNiUkdjm0aoDc_jfHFG4g1QL8dMqfwJjASLJEhlRKnSOQCW003Ed9_B2OXCteYP0CWrrfPP4lX2VyPjrIu5oAo04FQXvg6xFgTtictkOpPOvsqGldBm-C99eT3TKXK0cmU0qrj8agBuECw5r972uc4rZmjFzA2UEJg3dnvFnLF3Tu3yM1vkO2A8fKaj2MflCPc7tPnhBOyq67qd_5OtVb1ncTGLueJTB2n3MVsondNDY_G7-A77_8XVCVMDqPDIjHk1tdC8Tj2at_0", "https://images.unsplash.com/photo-1590611936760-eeb9bc500b67?q=80&w=2070&auto=format&fit=crop")
content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuA8WDyaJOuMDyDLYs2iis6XBlLAqXAteDVIGl_-X96KuNfOhmAm5voFxLlwUdo9jYU778g1dTIMnn5WCtBqjY3-7VTJD8sDnujcPQxep9M9wYaF97NP6XCXdBdr9c9VTHZTkeG22_UTgHavLXtsR4Z9XwUGJC8WY2yFOf_XGYPuwL8Kzsu-vCxDx-55bYC6du3fuORj4HwWJIcFxqdIVWYqATNhP2GB5HGmXVOHlTnddzeQJcfaDxK_pE_9POPpGyZZ5UDRiA17qepA", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop")
content = content.replace("https://lh3.googleusercontent.com/aida-public/AB6AXuDz76SRcFT5Jo7tFSSvAm7eZjvLqjqEIPHGVLVepJklaVy5qO11o0mLpy8FtvtgpyiiWOoAc4qZClD5l6uVqbhbagC-rP_7wSjpthWLr5fmAH5ZBuOrTjIHpNaWL9mCLeyBIEYX1ToAxyeYUqZU_9fjqV8Di6GkISEiBbdyjMuKbTt61q6qIP_Fgu6ZIOse0rvYl8hDWMub1nAYUO4VSGtt-BoItj5K_9UZdWqv37y0QBRz87KbF47DXaibi3hQi2LbEz53X4tsB4GQ", "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?q=80&w=2070&auto=format&fit=crop")

# Replace text
content = re.sub(r'From One\s*Toolbox\s*\n\s*to a Fleet', r'From a Small Clinic\n                        to a Modern Practice', content)
content = re.sub(r'It started in a small garage in Saint John back in 2005\. Armed with just a single rusty\s*\n\s*toolbox and a\s*\n\s*beat-up van, Dr\. Denture set out to provide honest, reliable denture services to his neighbors\.', r'It started in a small dental clinic in Saint John back in 2005. Armed with a passion for dentistry and a commitment to patient care, Dr. Denture set out to provide honest, reliable denture services to his neighbors.', content)
content = re.sub(r'Today, Dr Denture has grown into a full fleet of dedicated professionals\. We.*\s*\n\s*unadjustmentged thousands\s*\n\s*of implants, installed hundreds of heaters, and saved countless basements from flooding\s*\n\s*across New Brunswick\.', r"Today, Dr Denture has grown into a modern practice with a team of dedicated dental professionals. We've crafted thousands of custom dentures, performed hundreds of successful implants, and restored countless smiles across New Brunswick.", content)
content = re.sub(r'Our team and fleet ready for\s*\n\s*dispatch in Saint John\.', r'Our dedicated dental team ready to serve you in Saint John.', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
