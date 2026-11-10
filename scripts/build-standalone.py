from pathlib import Path
import base64
import re

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
html = (dist / 'index.html').read_text()
style = (dist / 'style.css').read_text()
style = re.sub(r'url\((assets/fonts/[^)]+\.woff2)\)', lambda match: 'url(data:font/woff2;base64,' + base64.b64encode((dist / match[1]).read_bytes()).decode() + ')', style)
for license_path in sorted((dist / 'assets/fonts').glob('*-OFL.txt')):
    style += '\n/*\n' + license_path.read_text() + '\n*/\n'
html = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?[^"]*)?">', lambda _: '<style>' + style + '</style>', html)
for name in ['zero-waste.js', 'stargazing.js', 'app.js', 'assets/vendor/three.r134.min.js', 'assets/vendor/vanta.waves.0.5.24.min.js', 'waves.js', 'weather.js']:
    script = (dist / name).read_text()
    if name.startswith('assets/vendor/'):
        license_name = 'THREE-LICENSE.txt' if 'three.' in name else 'VANTA-LICENSE.txt'
        script = '/*\n' + (dist / 'assets/vendor' / license_name).read_text() + '\n*/\n' + script
    if name == 'zero-waste.js':
        assets = {language: ['data:image/png;base64,' + base64.b64encode(path.read_bytes()).decode() for path in sorted((dist / 'assets/zero-waste' / language).glob('*.png'))] for language in ['en', 'zh']}
        import json
        script = script.replace('const zeroWasteWalkthroughSrc = index => `assets/zero-waste/${lang}/${walkthroughFiles[index]}.png`;', 'const embeddedWalkthrough = ' + json.dumps(assets) + ';\nconst zeroWasteWalkthroughSrc = index => embeddedWalkthrough[lang][index];')
    if name == 'stargazing.js':
        import json
        assets = ['data:image/jpeg;base64,' + base64.b64encode(path.read_bytes()).decode() for path in sorted((dist / 'assets/stargazing').glob('*.jpg'))]
        script = script.replace('const stargazingSrc = index => `assets/stargazing/${stargazingFiles[index]}.jpg`;', 'const embeddedStargazing = ' + json.dumps(assets) + ';\nconst stargazingSrc = index => embeddedStargazing[index];')
    html = re.sub(r'<script src="' + re.escape(name) + r'(?:\?[^"]*)?" defer></script>', '', html)
    script = script.replace('</script', '<\\/script')
    html = html.replace('</body>', '<script>' + script + '</script>\n</body>')
html = '\n'.join(line.rstrip() for line in html.splitlines()) + '\n'
(root / 'eva-shoreline-demo.html').write_text(html)
print('Created standalone portfolio with embedded bilingual project walkthroughs.')
