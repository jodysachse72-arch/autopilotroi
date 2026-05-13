import sys, json
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from pathlib import Path

extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text())
detection  = json.loads(Path('graphify-out/.graphify_detect.json').read_text())
analysis   = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding='utf-8'))

G = build_from_json(extraction)
communities = {int(k): v for k, v in analysis['communities'].items()}
cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

# Community labels based on member inspection
labels = {
    0: "Blog & Content Server",
    1: "CMS Content CRUD",
    2: "Post & Revision Management",
    3: "Email Drip & Notifications",
    4: "A/B Testing & Analytics",
    5: "Media & Post Admin",
    6: "Guided Tour & Session",
    7: "Icon System",
    8: "Brand Identity & Assets",
    9: "Pricing Tier Utilities",
    10: "Skeleton Loading UI",
    11: "Rate Limiting Middleware",
    12: "Dashboard Cards & Stats",
    13: "Navigation & Scroll",
    14: "Prospect Email Flows",
    15: "Generic API Routes",
    16: "Referral Link & Scorecard",
    17: "Marketing Quiz Engine",
    18: "Theme System",
    19: "Auth Middleware & Proxy",
    20: "Prospect Assignment Tracker",
    21: "Partner Badge & Chevron",
    22: "Announcement Banner",
    23: "FAQ Category & Timestamps",
    24: "Form Submit Handlers",
    25: "Currency & Grade Formatters",
    26: "Vault Storage",
    27: "FAQ Accordion",
    28: "Quiz Result Save",
    29: "Partner Onboarding Wizard",
}

# Fill remaining small communities with generic labels
max_cid = max(communities.keys())
for cid in range(max_cid + 1):
    if cid not in labels:
        labels[cid] = f'Module Group {cid}'

questions = suggest_questions(G, communities, labels)

report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, 'c:/Users/Jody/Documents/autopilotroi', suggested_questions=questions)
Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding='utf-8')
Path('graphify-out/.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}), encoding='utf-8')
print('Report updated with community labels')
