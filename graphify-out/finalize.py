import json, sys, io
from graphify.benchmark import run_benchmark, print_benchmark
from graphify.detect import save_manifest
from pathlib import Path
from datetime import datetime, timezone

# Force stdout to utf-8 for benchmark output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

detection = json.loads(Path('graphify-out/.graphify_detect.json').read_text())

result = run_benchmark('graphify-out/graph.json', corpus_words=detection['total_words'])
print_benchmark(result)

save_manifest(detection['files'])

extract = json.loads(Path('graphify-out/.graphify_extract.json').read_text())
input_tok = extract.get('input_tokens', 0)
output_tok = extract.get('output_tokens', 0)

cost_path = Path('graphify-out/cost.json')
if cost_path.exists():
    cost = json.loads(cost_path.read_text())
else:
    cost = {'runs': [], 'total_input_tokens': 0, 'total_output_tokens': 0}

cost['runs'].append({
    'date': datetime.now(timezone.utc).isoformat(),
    'input_tokens': input_tok,
    'output_tokens': output_tok,
    'files': detection.get('total_files', 0),
})
cost['total_input_tokens'] += input_tok
cost['total_output_tokens'] += output_tok
cost_path.write_text(json.dumps(cost, indent=2))

print(f'Run tokens: {input_tok:,} in / {output_tok:,} out')
