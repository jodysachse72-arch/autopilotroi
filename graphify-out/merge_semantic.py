import json
from pathlib import Path

all_nodes = []
all_edges = []
all_hyperedges = []
seen_ids = set()

for i in range(1, 4):
    p = Path(f'graphify-out/.graphify_chunk_0{i}.json')
    if not p.exists():
        print(f'WARNING: chunk_{i:02d} missing')
        continue
    data = json.loads(p.read_text())
    nc = len(data.get('nodes', []))
    ec = len(data.get('edges', []))
    print(f'chunk {i:02d}: {nc} nodes, {ec} edges')
    for n in data.get('nodes', []):
        if n['id'] not in seen_ids:
            all_nodes.append(n)
            seen_ids.add(n['id'])
    all_edges.extend(data.get('edges', []))
    all_hyperedges.extend(data.get('hyperedges', []))

merged = {
    'nodes': all_nodes,
    'edges': all_edges,
    'hyperedges': all_hyperedges,
    'input_tokens': 0,
    'output_tokens': 0
}
Path('graphify-out/.graphify_semantic.json').write_text(json.dumps(merged, indent=2))
n = len(all_nodes)
e = len(all_edges)
h = len(all_hyperedges)
print(f'Semantic merged: {n} nodes, {e} edges, {h} hyperedges')
