/**
 * Regenerates customer-intelligence.json for the Oleoresins market.
 * Run: node generate_customer_intelligence.js
 *
 * Legacy Excel conversion is deprecated; use generate_customer_intelligence.js instead.
 */
const { spawnSync } = require('child_process');
const path = require('path');

const script = path.join(__dirname, 'generate_customer_intelligence.js');
const result = spawnSync(process.execPath, [script], { stdio: 'inherit' });
process.exit(result.status ?? 1);
